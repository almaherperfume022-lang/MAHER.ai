import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Clock,
  Zap,
  HelpCircle,
  SkipForward,
  Split,
  Trophy,
  Flame,
  Heart,
  ExternalLink,
  ChevronRight,
  MessageSquare,
  Volume2,
  AlertTriangle,
  Lightbulb,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  TriviaQuestion,
  HostPersonality,
  GameMode,
  LifelineState,
  HostMood,
  GroundingSource,
} from '../types';
import { HostAvatar } from './HostAvatar';
import { soundFX } from '../services/soundFx';
import { liveAudio } from '../services/liveAudio';
import { generateHostTTS, getHostCommentary } from '../services/api';

interface TriviaScreenProps {
  question: TriviaQuestion;
  questionIndex: number;
  totalQuestions: number;
  host: HostPersonality;
  gameMode: GameMode;
  timeLimit: number;
  score: number;
  streak: number;
  lives?: number;
  ttsEnabled: boolean;
  onAnswer: (selectedId: string, isCorrect: boolean, timeSpent: number, points: number) => void;
  onTimeout: () => void;
  onOpenLiveChat: () => void;
}

export const TriviaScreen: React.FC<TriviaScreenProps> = ({
  question,
  questionIndex,
  totalQuestions,
  host,
  gameMode,
  timeLimit,
  score,
  streak,
  lives = 3,
  ttsEnabled,
  onAnswer,
  onTimeout,
  onOpenLiveChat,
}) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(timeLimit || 20);
  const [hostCommentaryText, setHostCommentaryText] = useState<string>(
    question.hostIntroComment || host.greetingPhrases[Math.floor(Math.random() * host.greetingPhrases.length)]
  );
  const [hostMood, setHostMood] = useState<HostMood>('speaking');
  const [isHostSpeaking, setIsHostSpeaking] = useState(false);
  const [lastAudioBase64, setLastAudioBase64] = useState<string | null>(null);
  const [showSourcesModal, setShowSourcesModal] = useState(false);

  // Lifelines
  const [lifelines, setLifelines] = useState<LifelineState>({
    fiftyFiftyUsed: false,
    hintUsed: false,
    skipUsed: false,
    doublePointsActive: false,
    disabledOptions: [],
  });

  const timerRef = useRef<any>(null);
  const startTimeRef = useRef<number>(Date.now());

  // Initialize and speak question / host intro on new question
  useEffect(() => {
    setSelectedOptionId(null);
    setIsAnswerRevealed(false);
    setTimeRemaining(timeLimit || 20);
    startTimeRef.current = Date.now();
    setLifelines((prev) => ({ ...prev, disabledOptions: [], doublePointsActive: false }));

    const initialText = question.hostIntroComment
      ? `${question.hostIntroComment} ${question.question}`
      : question.question;

    setHostCommentaryText(initialText);
    setHostMood('speaking');

    if (ttsEnabled) {
      playHostVoice(initialText);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      liveAudio.stop();
    };
  }, [question.id]);

  // Timer Countdown Loop
  useEffect(() => {
    if (timeLimit === 0 || isAnswerRevealed) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleTimeOut();
          return 0;
        }

        // Sound FX ticks when time is running low
        if (prev <= 6) {
          soundFX.playTick(true);
        } else if (prev % 5 === 0) {
          soundFX.playTick(false);
        }

        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timeLimit, isAnswerRevealed]);

  const playHostVoice = async (text: string) => {
    try {
      setIsHostSpeaking(true);
      const res = await generateHostTTS(text, host.voice);
      if (res.success && res.audioBase64) {
        setLastAudioBase64(res.audioBase64);
        await liveAudio.playBase64Pcm(res.audioBase64);
      } else {
        await liveAudio.speakFallback(text, host.voice === 'Kore' ? 'female' : 'male');
      }
    } catch (e) {
      console.warn('Voice play error:', e);
    } finally {
      setIsHostSpeaking(false);
    }
  };

  const handleTimeOut = async () => {
    if (isAnswerRevealed) return;
    setIsAnswerRevealed(true);
    soundFX.playWrong();
    setHostMood('disappointed');

    // Host timeout reaction
    try {
      const commentaryRes = await getHostCommentary({
        host,
        action: 'timeout',
        question,
        score,
        streak: 0,
        generateVoice: ttsEnabled,
      });
      if (commentaryRes.success) {
        setHostCommentaryText(commentaryRes.commentary);
        if (ttsEnabled && commentaryRes.audioBase64) {
          setLastAudioBase64(commentaryRes.audioBase64);
          setIsHostSpeaking(true);
          await liveAudio.playBase64Pcm(commentaryRes.audioBase64);
          setIsHostSpeaking(false);
        }
      }
    } catch (e) {}

    onTimeout();
  };

  const handleSelectOption = async (optionId: string) => {
    if (isAnswerRevealed || lifelines.disabledOptions.includes(optionId)) return;

    soundFX.playSelect();
    setSelectedOptionId(optionId);
    setIsAnswerRevealed(true);

    if (timerRef.current) clearInterval(timerRef.current);

    const timeSpent = Math.max(1, Math.round((Date.now() - startTimeRef.current) / 1000));
    const isCorrect = optionId === question.correctAnswerId;

    // Calculate Points
    let basePoints = question.difficulty === 'hard' ? 300 : question.difficulty === 'medium' ? 200 : 100;
    // Speed bonus
    const speedBonus = timeLimit > 0 ? Math.max(0, Math.round((timeRemaining / timeLimit) * 100)) : 20;
    // Streak multiplier
    const multiplier = Math.min(3, 1 + streak * 0.25);
    let totalPoints = Math.round((basePoints + speedBonus) * multiplier);

    if (lifelines.doublePointsActive) {
      totalPoints *= 2;
    }

    if (!isCorrect) {
      totalPoints = 0;
    }

    if (isCorrect) {
      soundFX.playCorrect();
      setHostMood('excited');
      if (streak >= 2) {
        soundFX.playStreak();
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
      }
    } else {
      soundFX.playWrong();
      setHostMood('disappointed');
    }

    // Trigger AI Host Dynamic Banter in Character
    try {
      const selectedText = question.options.find((o) => o.id === optionId)?.text || optionId;
      const commentaryRes = await getHostCommentary({
        host,
        action: isCorrect ? (streak >= 2 ? 'streak' : 'correct') : 'incorrect',
        question,
        selectedAnswer: selectedText,
        score: score + totalPoints,
        streak: isCorrect ? streak + 1 : 0,
        generateVoice: ttsEnabled,
      });

      if (commentaryRes.success) {
        setHostCommentaryText(commentaryRes.commentary);
        if (ttsEnabled && commentaryRes.audioBase64) {
          setLastAudioBase64(commentaryRes.audioBase64);
          setIsHostSpeaking(true);
          await liveAudio.playBase64Pcm(commentaryRes.audioBase64);
          setIsHostSpeaking(false);
        }
      }
    } catch (e) {
      console.warn('Commentary error:', e);
    }

    onAnswer(optionId, isCorrect, timeSpent, totalPoints);
  };

  // Lifeline 1: 50/50
  const handleFiftyFifty = () => {
    if (lifelines.fiftyFiftyUsed || isAnswerRevealed) return;
    soundFX.playPowerup();

    const wrongOptions = question.options
      .filter((o) => o.id !== question.correctAnswerId)
      .map((o) => o.id);

    // Shuffle and pick 2 to disable
    const shuffled = wrongOptions.sort(() => 0.5 - Math.random());
    const toDisable = shuffled.slice(0, 2);

    setLifelines((prev) => ({
      ...prev,
      fiftyFiftyUsed: true,
      disabledOptions: toDisable,
    }));
  };

  // Lifeline 2: Ask AI Host for Hint
  const handleAskHostHint = async () => {
    if (lifelines.hintUsed || isAnswerRevealed) return;
    soundFX.playPowerup();
    setLifelines((prev) => ({ ...prev, hintUsed: true }));

    setHostMood('thinking');
    setHostCommentaryText(`${host.name} is formulating an in-character clue for you...`);

    try {
      const res = await getHostCommentary({
        host,
        action: 'hint',
        question,
        score,
        generateVoice: ttsEnabled,
      });

      if (res.success) {
        setHostCommentaryText(res.commentary);
        if (ttsEnabled && res.audioBase64) {
          setLastAudioBase64(res.audioBase64);
          setIsHostSpeaking(true);
          await liveAudio.playBase64Pcm(res.audioBase64);
          setIsHostSpeaking(false);
        }
      }
    } catch (e) {
      setHostCommentaryText("Here's a thought: narrow down by eliminating the most recent outlier!");
    }
  };

  // Lifeline 3: 2x Double Down Points
  const handleDoubleDown = () => {
    if (lifelines.doublePointsActive || isAnswerRevealed) return;
    soundFX.playPowerup();
    setLifelines((prev) => ({ ...prev, doublePointsActive: true }));
  };

  // Progress percentage for timer bar
  const timeProgress = timeLimit > 0 ? (timeRemaining / timeLimit) * 100 : 100;
  const isUrgentTimer = timeLimit > 0 && timeRemaining <= 5;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-5">
      {/* Top Status HUD */}
      <div className="flex items-center justify-between gap-3 bg-slate-900/90 rounded-2xl p-3.5 sm:p-4 border border-slate-800 backdrop-blur-md shadow-xl">
        {/* Question Counter & Category */}
        <div className="flex items-center gap-2.5">
          <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 border border-amber-400/40 text-amber-300 font-mono font-bold text-xs sm:text-sm">
            Q {questionIndex + 1} / {totalQuestions}
          </span>
          <span className="text-xs sm:text-sm font-semibold text-slate-300 hidden xs:inline truncate max-w-[140px] sm:max-w-xs">
            {question.category}
          </span>
        </div>

        {/* Center: Search Grounding Badge */}
        {question.groundingSources && question.groundingSources.length > 0 && (
          <button
            onClick={() => setShowSourcesModal(true)}
            className="flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 px-2.5 py-1 rounded-full transition"
            title="View Google Search Sources used to verify this question"
          >
            <Sparkles className="w-3 h-3" />
            <span className="hidden sm:inline">Search Grounded</span>
            <ExternalLink className="w-2.5 h-2.5" />
          </button>
        )}

        {/* Right HUD: Streak & Lives */}
        <div className="flex items-center gap-3">
          {streak > 1 && (
            <div className="flex items-center gap-1 text-xs font-bold text-orange-400 bg-orange-500/10 px-2 py-1 rounded-lg border border-orange-500/30 animate-pulse">
              <Flame className="w-3.5 h-3.5 fill-orange-400" />
              <span>{streak}x Streak</span>
            </div>
          )}

          {gameMode === 'survival' && (
            <div className="flex items-center gap-1">
              {[...Array(3)].map((_, i) => (
                <Heart
                  key={i}
                  className={`w-4 h-4 ${
                    i < lives ? 'text-rose-500 fill-rose-500' : 'text-slate-700'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Timer Bar (if timed) */}
      {timeLimit > 0 && (
        <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden border border-slate-800 p-0.5 shadow-inner">
          <div
            className={`h-full rounded-full transition-all duration-1000 ${
              isUrgentTimer
                ? 'bg-rose-500 animate-pulse'
                : timeRemaining <= 10
                ? 'bg-amber-400'
                : 'bg-emerald-400'
            }`}
            style={{ width: `${timeProgress}%` }}
          />
        </div>
      )}

      {/* AI Host Stage Avatar with Speech & Voice */}
      <HostAvatar
        host={host}
        speechText={hostCommentaryText}
        mood={hostMood}
        isSpeaking={isHostSpeaking}
        onReplayVoice={() => {
          if (lastAudioBase64) {
            liveAudio.playBase64Pcm(lastAudioBase64);
          } else {
            playHostVoice(hostCommentaryText);
          }
        }}
        onOpenVoiceChat={onOpenLiveChat}
      />

      {/* Main Question Card */}
      <div className="rounded-3xl bg-slate-900/95 border border-slate-800 p-6 sm:p-8 shadow-2xl backdrop-blur-xl space-y-6">
        {/* Question Text */}
        <h2 className="text-lg sm:text-2xl font-extrabold text-slate-100 leading-snug tracking-tight text-center sm:text-left">
          {question.question}
        </h2>

        {/* Options Grid (A, B, C, D) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
          {question.options.map((option, idx) => {
            const isSelected = selectedOptionId === option.id;
            const isCorrect = option.id === question.correctAnswerId;
            const isDisabled = lifelines.disabledOptions.includes(option.id);

            let btnStyle = 'bg-slate-950/70 border-slate-800 text-slate-200 hover:border-amber-400/60 hover:bg-slate-900';
            let badgeStyle = 'bg-slate-800 text-slate-300 border-slate-700';

            if (isDisabled) {
              btnStyle = 'bg-slate-950/20 border-slate-900 text-slate-600 opacity-40 cursor-not-allowed';
            } else if (isAnswerRevealed) {
              if (isCorrect) {
                btnStyle = 'bg-emerald-500/20 border-emerald-400 text-emerald-100 ring-2 ring-emerald-400 shadow-lg shadow-emerald-500/20';
                badgeStyle = 'bg-emerald-500 text-slate-950 border-emerald-400';
              } else if (isSelected && !isCorrect) {
                btnStyle = 'bg-rose-500/20 border-rose-400 text-rose-200 ring-2 ring-rose-400';
                badgeStyle = 'bg-rose-500 text-white border-rose-400';
              }
            } else if (isSelected) {
              btnStyle = 'bg-amber-500/20 border-amber-400 text-amber-200 ring-2 ring-amber-400';
              badgeStyle = 'bg-amber-400 text-slate-950 border-amber-400';
            }

            return (
              <button
                key={option.id}
                id={`option-btn-${option.id.toLowerCase()}`}
                disabled={isAnswerRevealed || isDisabled}
                onClick={() => handleSelectOption(option.id)}
                className={`p-4 rounded-2xl border text-left transition-all duration-150 flex items-center gap-3.5 cursor-pointer disabled:cursor-default group active:scale-98 ${btnStyle}`}
              >
                <div
                  className={`w-9 h-9 rounded-xl border flex items-center justify-center font-bold font-mono text-sm shrink-0 shadow-sm transition ${badgeStyle}`}
                >
                  {option.id}
                </div>
                <span className="font-semibold text-sm sm:text-base leading-relaxed flex-1">
                  {option.text}
                </span>
              </button>
            );
          })}
        </div>

        {/* Explanation & Fun Fact Card (Revealed after answer) */}
        {isAnswerRevealed && (
          <div className="mt-4 p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
              <Lightbulb className="w-4 h-4" />
              <span>Explanation & Trivia Lore</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {question.explanation}
            </p>
            {question.funFact && (
              <div className="pt-2 border-t border-slate-800/80 text-xs text-amber-300/90 italic">
                ✨ <strong className="not-italic text-amber-200">Fun Fact:</strong> {question.funFact}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Lifelines Bar (Active before answering) */}
      {!isAnswerRevealed && (
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-1">
          {/* 50:50 */}
          <button
            id="lifeline-50-50-btn"
            disabled={lifelines.fiftyFiftyUsed}
            onClick={handleFiftyFifty}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-bold transition active:scale-95 ${
              lifelines.fiftyFiftyUsed
                ? 'bg-slate-900 border-slate-800 text-slate-600 cursor-not-allowed opacity-50'
                : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-amber-300 hover:border-amber-400 shadow-md'
            }`}
            title="Eliminate 2 wrong choices"
          >
            <Split className="w-3.5 h-3.5" />
            <span>50 : 50</span>
          </button>

          {/* Ask AI Host Hint */}
          <button
            id="lifeline-ask-host-btn"
            disabled={lifelines.hintUsed}
            onClick={handleAskHostHint}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-bold transition active:scale-95 ${
              lifelines.hintUsed
                ? 'bg-slate-900 border-slate-800 text-slate-600 cursor-not-allowed opacity-50'
                : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-violet-300 hover:border-violet-400 shadow-md'
            }`}
            title="Ask your AI Host for an in-character riddle hint"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Ask Host Hint</span>
          </button>

          {/* 2x Double Down Points */}
          <button
            id="lifeline-double-down-btn"
            disabled={lifelines.doublePointsActive}
            onClick={handleDoubleDown}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-bold transition active:scale-95 ${
              lifelines.doublePointsActive
                ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-md'
                : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-emerald-300 hover:border-emerald-400 shadow-md'
            }`}
            title="Double points if you get this question right"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>{lifelines.doublePointsActive ? '2x Active!' : '2x Double Down'}</span>
          </button>

          {/* Talk Live with Host */}
          <button
            id="trivia-talk-host-direct-btn"
            onClick={onOpenLiveChat}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-violet-600/30 hover:bg-violet-600/50 border border-violet-500/40 text-violet-200 text-xs font-bold transition active:scale-95 shadow-md"
            title="Chat or speak directly to the AI host in real-time"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Live Host Chat</span>
          </button>
        </div>
      )}

      {/* Google Search Sources Modal */}
      {showSourcesModal && question.groundingSources && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <Sparkles className="w-4 h-4" />
                <span>Google Search Verified Sources</span>
              </div>
              <button
                onClick={() => setShowSourcesModal(false)}
                className="text-xs text-slate-400 hover:text-slate-200"
              >
                Close
              </button>
            </div>
            <p className="text-xs text-slate-300">
              This question was generated using Gemini with live Google Search grounding to ensure accurate, up-to-date facts:
            </p>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {question.groundingSources.map((source, i) => (
                <a
                  key={i}
                  href={source.uri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 flex items-center justify-between text-xs text-amber-300 hover:underline block"
                >
                  <span className="truncate max-w-[280px]">{source.title || source.uri}</span>
                  <ExternalLink className="w-3.5 h-3.5 shrink-0 ml-2" />
                </a>
              ))}
            </div>
            <button
              onClick={() => setShowSourcesModal(false)}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
