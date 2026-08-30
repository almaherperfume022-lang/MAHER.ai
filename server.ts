import express from 'express';
import http from 'http';
import path from 'path';
import dotenv from 'dotenv';
import { WebSocketServer, WebSocket } from 'ws';
import { GoogleGenAI, Modality, Type } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const server = http.createServer(app);
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Lazy Google Gen AI helper with telemetry header
let aiClient: GoogleGenAI | null = null;
function getAI(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn('GEMINI_API_KEY environment variable is not set. API calls will fail or use fallbacks.');
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey || '',
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// ----------------------------------------------------
// 1. API: Generate Search-Grounded Trivia Questions
// ----------------------------------------------------
app.post('/api/generate-trivia', async (req, res) => {
  try {
    const { category, customTopic, difficulty, count = 5, hostName, hostStyle } = req.body;
    const ai = getAI();

    const topicQuery = customTopic ? `Topic: ${customTopic}` : `Category: ${category}`;
    const diffLevel = difficulty || 'medium';

    const prompt = `Generate ${count} high-quality, engaging, and 100% factually accurate trivia questions about: ${topicQuery}.
Difficulty Level: ${diffLevel}.
Host Persona for tone: "${hostName || 'The Quizmaster'}" (${hostStyle || 'Energetic and witty'}).

Rules:
1. Every question must have exactly 4 multiple-choice options with unique IDs 'A', 'B', 'C', 'D'.
2. Exactly one option must be correct.
3. Include a concise, intriguing explanation and a "funFact" for each question.
4. Include a short 1-sentence hostIntroComment written in the voice/tone of "${hostName}".
5. Ensure questions are fresh, verified, and not repetitive.
6. Use Google Search grounding to verify up-to-date facts (especially for recent events, modern pop culture, science, or records).

Return the response in raw valid JSON format matching this JSON schema:
[
  {
    "id": "q1",
    "question": "The question text here?",
    "options": [
      { "id": "A", "text": "Option A" },
      { "id": "B", "text": "Option B" },
      { "id": "C", "text": "Option C" },
      { "id": "D", "text": "Option D" }
    ],
    "correctAnswerId": "A",
    "explanation": "Detailed explanation of why A is correct.",
    "funFact": "Extra fascinating trivia nugget.",
    "category": "${category || customTopic || 'General'}",
    "difficulty": "${diffLevel}",
    "hostIntroComment": "In-character host teaser for this question"
  }
]`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        temperature: 0.7,
      },
    });

    const responseText = response.text || '';
    
    // Extract grounding chunks / search sources
    const rawChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const groundingSources: { title: string; uri: string }[] = [];
    for (const chunk of rawChunks) {
      if (chunk.web?.uri) {
        groundingSources.push({
          title: chunk.web.title || new URL(chunk.web.uri).hostname,
          uri: chunk.web.uri,
        });
      }
    }

    // Parse JSON from response
    let questions = [];
    try {
      // Find JSON block if wrapped in markdown
      const jsonMatch = responseText.match(/```(?:json)?\s*([\s\S]*?)\s*```/) || [null, responseText];
      const cleanJson = (jsonMatch[1] || responseText).trim();
      questions = JSON.parse(cleanJson);
    } catch (parseError) {
      console.warn('Direct JSON parse failed, trying relaxed extraction:', parseError);
      const firstBracket = responseText.indexOf('[');
      const lastBracket = responseText.lastIndexOf(']');
      if (firstBracket !== -1 && lastBracket !== -1) {
        questions = JSON.parse(responseText.substring(firstBracket, lastBracket + 1));
      } else {
        throw new Error('Failed to parse generated questions into JSON.');
      }
    }

    // Attach grounding sources to questions
    const enrichedQuestions = questions.map((q: any, index: number) => ({
      ...q,
      id: q.id || `q_${Date.now()}_${index}`,
      groundingSources: groundingSources.slice(0, 4),
    }));

    return res.json({
      success: true,
      questions: enrichedQuestions,
      groundingSources,
    });
  } catch (error: any) {
    console.error('Error generating trivia:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to generate trivia questions with Gemini.',
    });
  }
});

// ----------------------------------------------------
// 2. API: Text to Speech (TTS) using gemini-3.1-flash-tts-preview
// ----------------------------------------------------
app.post('/api/tts', async (req, res) => {
  try {
    const { text, voice = 'Puck', emotionPrompt = '' } = req.body;
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Text is required for TTS generation.' });
    }

    const ai = getAI();
    const promptText = emotionPrompt ? `${emotionPrompt}: ${text}` : text;

    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-tts-preview',
      contents: [{ parts: [{ text: promptText }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: voice as any },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Audio) {
      return res.status(500).json({ error: 'No audio data returned by TTS model.' });
    }

    return res.json({
      success: true,
      audioBase64: base64Audio,
      sampleRate: 24000,
    });
  } catch (error: any) {
    console.error('TTS error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'TTS generation failed.',
    });
  }
});

// ----------------------------------------------------
// 3. API: Dynamic AI Host In-Game Commentary & Banter
// ----------------------------------------------------
app.post('/api/host-commentary', async (req, res) => {
  try {
    const {
      host,
      action, // 'correct' | 'incorrect' | 'streak' | 'hint' | 'game_over' | 'timeout'
      question,
      selectedAnswer,
      score,
      streak,
      timeRemaining,
      stats,
      generateVoice = true,
    } = req.body;

    const ai = getAI();

    let scenarioContext = '';
    if (action === 'correct') {
      scenarioContext = `The player answered question "${question?.question}" CORRECTLY with "${selectedAnswer}". Current score: ${score}, streak: ${streak}.`;
    } else if (action === 'incorrect') {
      scenarioContext = `The player answered question "${question?.question}" INCORRECTLY with "${selectedAnswer}". The correct answer was "${question?.options?.find((o: any) => o.id === question?.correctAnswerId)?.text}". Current score: ${score}.`;
    } else if (action === 'streak') {
      scenarioContext = `The player is on an explosive streak of ${streak} correct answers in a row! Score: ${score}.`;
    } else if (action === 'hint') {
      scenarioContext = `The player asked you for a subtle hint for the question: "${question?.question}". The correct answer is "${question?.options?.find((o: any) => o.id === question?.correctAnswerId)?.text}". Give a clever, in-character riddle or clue without blatantly giving away the direct letter.`;
    } else if (action === 'timeout') {
      scenarioContext = `The timer ran out on question "${question?.question}". The player hesitated too long!`;
    } else if (action === 'game_over') {
      scenarioContext = `The trivia match just concluded! Final Score: ${stats?.score}, Correct: ${stats?.correctCount}/${stats?.totalAnswered}, Max Streak: ${stats?.maxStreak}. Deliver your final comedic or triumphant report card and sign-off.`;
    }

    const systemPrompt = host?.systemPrompt || 'You are an entertaining, dynamic trivia host.';
    const prompt = `System: ${systemPrompt}

Current Scenario: ${scenarioContext}

Provide your immediate host commentary in character.
Keep it snappy, entertaining, and punchy (1-2 sentences maximum).`;

    const commentaryResponse = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: prompt,
      config: {
        temperature: 0.85,
      },
    });

    const commentaryText = commentaryResponse.text?.trim() || 'What a turn of events!';

    let audioBase64 = null;
    if (generateVoice && host?.voice) {
      try {
        const ttsResponse = await ai.models.generateContent({
          model: 'gemini-3.1-flash-tts-preview',
          contents: [{ parts: [{ text: commentaryText }] }],
          config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: { voiceName: host.voice as any },
              },
            },
          },
        });
        audioBase64 = ttsResponse.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data || null;
      } catch (ttsErr) {
        console.warn('Commentary TTS audio generation failed, continuing with text:', ttsErr);
      }
    }

    return res.json({
      success: true,
      commentary: commentaryText,
      audioBase64,
    });
  } catch (error: any) {
    console.error('Host commentary error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Host commentary generation failed.',
    });
  }
});

// ----------------------------------------------------
// 4. API: Host Direct Chat (Text & Voice Q&A / Banter)
// ----------------------------------------------------
app.post('/api/host-chat', async (req, res) => {
  try {
    const { messages, host, currentQuestion, gameContext } = req.body;
    const ai = getAI();

    const systemPrompt = `${host?.systemPrompt || 'You are an AI trivia host.'}
You are chatting live with the contestant during their trivia game.
Current Trivia Question on screen: ${currentQuestion ? `"${currentQuestion.question}"` : 'None currently'}
Game Context: ${gameContext || 'In active game session'}

Rules:
- Speak directly in the first person as your persona.
- Keep your answers witty, engaging, and brief (2-3 sentences max).
- If they ask for trivia help, give an entertaining, in-character riddle or hint.
- If they tease or question your authority, deliver a memorable comeback!`;

    const chatHistory = (messages || []).map((m: any) => ({
      role: m.sender === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }],
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: chatHistory,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.8,
      },
    });

    const replyText = response.text?.trim() || 'I am listening, contestant!';

    let audioBase64 = null;
    if (host?.voice) {
      try {
        const ttsResponse = await ai.models.generateContent({
          model: 'gemini-3.1-flash-tts-preview',
          contents: [{ parts: [{ text: replyText }] }],
          config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: { voiceName: host.voice as any },
              },
            },
          },
        });
        audioBase64 = ttsResponse.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data || null;
      } catch (ttsErr) {
        console.warn('Chat TTS audio generation failed:', ttsErr);
      }
    }

    return res.json({
      success: true,
      reply: replyText,
      audioBase64,
    });
  } catch (error: any) {
    console.error('Host chat error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Host chat failed.',
    });
  }
});

// ----------------------------------------------------
// 5. WebSocket Server: Real-Time Live API (gemini-3.1-flash-live-preview)
// ----------------------------------------------------
const wss = new WebSocketServer({ server, path: '/ws/live' });

wss.on('connection', async (clientWs, req) => {
  console.log('Client connected to Live API WebSocket');
  let liveSession: any = null;

  clientWs.on('message', async (data: Buffer | string) => {
    try {
      const msg = JSON.parse(data.toString());

      // Initialization message from client with host settings
      if (msg.type === 'init') {
        const { host, questionContext } = msg;
        const voiceName = host?.voice || 'Puck';
        const hostInstruction = `${host?.systemPrompt || 'You are an enthusiastic trivia host.'}
You are conversing with the player live via low-latency two-way audio.
Current Question Context: ${questionContext || 'Contestant is in the trivia stage lounge.'}
Respond with brief, snappy, conversational spoken voice (1-2 sentences).`;

        const ai = getAI();
        liveSession = await ai.live.connect({
          model: 'gemini-3.1-flash-live-preview',
          config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: { voiceName: voiceName as any },
              },
            },
            systemInstruction: hostInstruction,
          },
          callbacks: {
            onmessage: (liveMsg) => {
              // Extract audio chunks
              const audio = liveMsg.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
              if (audio && clientWs.readyState === WebSocket.OPEN) {
                clientWs.send(JSON.stringify({ type: 'audio', audio }));
              }
              if (liveMsg.serverContent?.interrupted && clientWs.readyState === WebSocket.OPEN) {
                clientWs.send(JSON.stringify({ type: 'interrupted' }));
              }
              if (liveMsg.serverContent?.turnComplete && clientWs.readyState === WebSocket.OPEN) {
                clientWs.send(JSON.stringify({ type: 'turnComplete' }));
              }
            },
            onerror: (err) => {
              console.error('Live API Session error:', err);
              if (clientWs.readyState === WebSocket.OPEN) {
                clientWs.send(JSON.stringify({ type: 'error', message: err.message || 'Live session error' }));
              }
            },
            onclose: () => {
              console.log('Live API session closed');
            },
          },
        });

        clientWs.send(JSON.stringify({ type: 'ready', message: 'Live AI Host Voice Session Active' }));
      }

      // Realtime Audio chunk from client (16kHz PCM base64)
      if (msg.type === 'audio' && liveSession && msg.audio) {
        liveSession.sendRealtimeInput({
          audio: {
            data: msg.audio,
            mimeType: 'audio/pcm;rate=16000',
          },
        });
      }

      // Realtime text input from client
      if (msg.type === 'text' && liveSession && msg.text) {
        liveSession.sendRealtimeInput({
          text: msg.text,
        });
      }
    } catch (err: any) {
      console.error('Error handling WS message:', err);
      if (clientWs.readyState === WebSocket.OPEN) {
        clientWs.send(JSON.stringify({ type: 'error', message: err.message }));
      }
    }
  });

  clientWs.on('close', () => {
    console.log('Client disconnected from Live API WebSocket');
    if (liveSession) {
      try {
        liveSession.close();
      } catch (e) {
        // ignore cleanup error
      }
    }
  });
});

// ----------------------------------------------------
// 6. Vite / Static Handler
// ----------------------------------------------------
async function start() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  server.listen(PORT, '0.0.0.0', () => {
    console.log(`Dynamic AI Host Trivia Game server running on port ${PORT}`);
  });
}

start();
