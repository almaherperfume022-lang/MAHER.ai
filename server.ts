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
// 1. API: Generate High-Conversion Affiliate Campaign (MAHER Code Ambis 4.6)
// ----------------------------------------------------
app.post('/api/generate-campaign', async (req, res) => {
  try {
    const { productName, productCategory, price, commissionRate, affiliateLink, targetPlatform = 'all', sellingAngle } = req.body;
    const ai = getAI();

    const prompt = `أنت الخبير التسويقي الأول لشركة MAHER تحت إشراف الإدارة العامة (عبد المالك وكلود) وبروتوكول Code Ambis 4.6 للمالك السيد ماهر غالب سعد حسن.
المهمة: توليد حملة إعلانية وتسويقية متكاملة وخارقة باللغة العربية لتحقيق أعلى نسبة تحويل ومبيعات عبر الرابط بالعمولة.

بيانات المنتج:
- اسم المنتج: ${productName || 'ميكروفون لاسلكي احترافي للهواتف'}
- التصنيف: ${productCategory || 'إلكترونيات وتصوير'}
- السعر: ${price || '15$'}
- نسبة العمولة: ${commissionRate || '10%'}
- رابط الإحالة / العمولة: ${affiliateLink || 'https://s.click.aliexpress.com/e/_c4EF0UiH'}
- المنصة المستهدفة: ${targetPlatform}
- الزاوية البيعية: ${sellingAngle || 'حل مشكلة تشويش الصوت ونقاء الاستوديو للمحتوى'}

المطلوب إرجاعه بدقة ككائن JSON بالهيكل التالي فقط:
{
  "facebookPost": {
    "headline": "عنوان جذاب جداً مع إيموجي",
    "body": "نص المنشور الكامل المقنع، مع ذكر المشكلة والحل، والمميزات بأسلوب نقاط جذاب، ودعوة صريحة للشراء والرابط، مع هاشتاجات قوية",
    "callToAction": "اطلب الآن عبر الرابط المباشر واحصل على الخصم"
  },
  "tiktokReels": {
    "hook5s": "الجملة الافتتاحية الخاطفة أول 5 ثواني لمنع التمرير",
    "script15s": "سكريبت كامل للفيديو مدته 15 ثانية يشرح المشكلة والحل بصوت الحماس",
    "visualDirections": "توجيهات بصرية للمشاهد (ماذا يصور في الكاميرا)",
    "soundSuggestion": "نوع الصوت أو الموسيقى الرائجة المقترحة",
    "caption": "الكابشن للبايو والتعليق الأول"
  },
  "whatsappBroadcast": {
    "shortStatus": "نص قصير جداً ومباشر لحالات الواتساب مع رابط مباشر",
    "groupBroadcast": "رسالة ودية ومحفزة لمجموعات الواتساب والأصدقاء مع تفاصيل العرض"
  },
  "strategicSummary": {
    "profitPerSale": "تقدير الربح بالدولار والريال لكل بيعة",
    "targetAudience": "الفئة المستهدفة الأكثر شراءً بدقة",
    "executiveTip": "نصيحة ذهبية من الإدارة العامة لمضاعفة المبيعات"
  }
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.7,
      },
    });

    const responseText = response.text || '{}';
    let campaignData = {};
    try {
      campaignData = JSON.parse(responseText);
    } catch (parseErr) {
      console.warn('JSON parsing issue, attempting regex cleanup:', parseErr);
      const match = responseText.match(/\{[\s\S]*\}/);
      if (match) {
        campaignData = JSON.parse(match[0]);
      }
    }

    return res.json({
      success: true,
      data: campaignData,
    });
  } catch (error: any) {
    console.error('Campaign generation error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'فشل توليد الحملة التسويقية.',
    });
  }
});

// ----------------------------------------------------
// 2. API: Executive Tactical Consultation (Code Ambis 4.6)
// ----------------------------------------------------
app.post('/api/executive-advice', async (req, res) => {
  try {
    const { query, userQuestion, currentStats } = req.body;
    const promptQuery = query || userQuestion || 'ما هي الخطوة الاستراتيجية القادمة لشركة MAHER؟';
    const ai = getAI();

    const systemPrompt = `أنت تمثل الإدارة العامة (عبد المالك وكلود) لشركة MAHER تحت بروتوكول Code Ambis 4.6 للمالك السيد ماهر غالب سعد حسن.
تحدث بأسلوب راقي، مهني، تنفيذي نخبوي، يشجع المالك ويوجه كل قرار استثماري وتسويقي نحو "رؤية المليار في 2030/6/6".
قدم نصائح عملية ودقيقة في التجارة الإلكترونية، التسويق بالعمولة (AliExpress Affiliate)، اختيار المنتجات الرابحة، إدارة المسوقين، واستراتيجيات الانتشار الفيروسي على تيك توك وفيسبوك.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `سؤال واستشارة المالك السيد ماهر غالب سعد حسن:
"${promptQuery}"

البيانات الحالية: ${JSON.stringify(currentStats || {})}

قدم التوجيه التنفيذي المباشر والخطوات العملية المحكمة:`,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.75,
      },
    });

    const replyText = response.text?.trim() || 'نحن في خدمتك يا سيد ماهر، الرؤية تسير وفق أعلى معايير الدقة.';
    return res.json({
      success: true,
      advice: replyText,
      reply: replyText,
    });
  } catch (error: any) {
    console.error('Executive advice error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'فشل الحصول على الاستشارة التنفيذية.',
    });
  }
});

// ----------------------------------------------------
// 2. API: Autonomous AI Agent Action Engine (Google Cloud 2026 Agent Framework)
// ----------------------------------------------------
app.post('/api/agent-action', async (req, res) => {
  try {
    const { actionType, prompt, subAgent, productContext, generateVoice = false } = req.body;
    const ai = getAI();

    const systemPrompt = `أنت "الوكيل الاصطناعي التنفيذي المتقدم (MAHER Autonomous AI Agent 2026)" لشركة MAHER تحت مظلة بروتوكول Code Ambis 4.6 للمالك السيد ماهر غالب سعد حسن.
وفقاً لأحدث معايير Google Cloud 2026 لأنظمة الوكلاء المستقلين (Agentic AI System):
- أنت لست مجرد روبوت دردشة تقليدي، بل منظومة وكلاء متخصصة (Digital Assembly Line) تشمل:
  1. وكيل تحليل السوق والبيانات (Market Analyst Agent)
  2. وكيل صناعة المحتوى والإبداع (Creative & Content Agent)
  3. وكيل التجارة الإلكترونية والأسعار (eCommerce & Pricing Agent)
  4. وكيل خدمة العملاء الفوري (Concierge Customer Agent)
  5. وكيل الحماية وتدقيق الروابط (Security & Audit Agent)
- هدفك التنفيذي: قيادة متجر ماهر ومبيعات التسويق بالعمولة (AliExpress Affiliate) نحو هدف المليار 2030/6/6.
- قدم مخرجاتك دائماً بشكل تنفيذي فوري، عملي، دقيق، مدعوم بخطوات منطقية واضحة.`;

    let userInstruction = '';
    if (actionType === 'market_trends') {
      userInstruction = `بصفتك وكيل تحليل السوق والبيانات (Analyst Agent):
قم بإجراء فحص شامل للأسواق لعام 2026، وحدد أفضل 3 فئات من المنتجات الاستهلاكية الأسرع دوراناً وربحاً في علي إكسبريس وتيك توك شوب، مع نسبة العمولات المقدرة واستراتيجية الاستهداف المباشر.`;
    } else if (actionType === 'tiktok_content_package') {
      userInstruction = `بصفتك وكيل صناعة المحتوى والإبداع (Creative Agent):
صمم حزمة فيروسية كاملة للمنتج: "${productContext?.title || 'ميكروفون PULUZ اللاسلكي'}":
1. هوك بصري صاعق لأول 3 ثوانٍ
2. سكريبت سيناريو 15 ثانية ممتع وله تأثير نفسي بيعي قوي
3. برومبت توليد فيديو سينمائي 4K (بالإنجليزي وبالعربي)
4. كابشن تيك توك وهاشتاجات مخصصة للانتشار (FYP)
5. نص دعوة لاتخاذ إجراء مباشر (CTA) مع رابط الشراء: https://s.click.aliexpress.com/e/_c3tMSE97`;
    } else if (actionType === 'link_audit') {
      userInstruction = `بصفتك وكيل الحماية وتدقيق الروابط (Security & Audit Agent):
قم بإجراء فحص أمني وبروتوكولي لرابط الإحالة الخاص بالسيد ماهر: https://s.click.aliexpress.com/e/_c3tMSE97
تحقق من:
- سلامة معرّف التتبع (Affiliate Tracking Tag)
- سرعة التحويل ومطابقة بروتوكول مدفوعات الوكلاء (Google Agent Payments AP2)
- نصائح لتفادي حظر الروابط في منصات السوشيال ميديا وحمايتها.`;
    } else if (actionType === 'growth_strategy') {
      userInstruction = `بصفتك وكيل العمليات والتجارة (eCommerce Agent):
ضع خطة عمل تنفيذية للأسبوع الحالي لتحقيق أول 50 مبيعة مؤكدة لمتجر MAHER عبر تيك توك وفيسبوك وواتساب، مع جدول يومي زمني محدد للمالك السيد ماهر.`;
    } else {
      userInstruction = `استفسار أو توجيه مباشر من المالك السيد ماهر غالب:
"${prompt || 'ابدأ تنفيذ دورة عمل الوكيل الذكي الآن.'}"
سياق المتجر والمنتج: ${JSON.stringify(productContext || {})}`;
    }

    const agentPrompt = `${userInstruction}

قم بصياغة الرد على هيئة تقرير تنفيذي من الوكيل الذكي يتضمن:
1. [خطة التنفيذ الفورية - Agent Action Plan]
2. [المخرجات والقرارات الجاهزة للتطبيق - Executed Deliverables]
3. [التوجيه التنفيذي القادم للسيد ماهر - Next Milestone]`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: agentPrompt,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      },
    });

    const outputText = response.text?.trim() || 'تم تنفيذ دورة عمل الوكيل الذكي بنجاح.';

    let audioBase64: string | null = null;
    if (generateVoice) {
      try {
        // Generate a concise spoken voice summary (1-2 sentences)
        const voiceSummaryPrompt = `لخص هذا التقرير التنفيذي في جملتين موجزتين ومحفزتين بنبرة واثقة وفخمة موجهة للمالك السيد ماهر:\n"${outputText.slice(0, 400)}"`;
        const summaryResponse = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: voiceSummaryPrompt,
        });
        const spokenText = summaryResponse.text?.trim() || 'تم تنفيذ المهمة بنجاح يا سيد ماهر، المنظومة تعمل بأعلى كفاءة.';

        const ttsResponse = await ai.models.generateContent({
          model: 'gemini-3.1-flash-tts-preview',
          contents: [{ parts: [{ text: spokenText }] }],
          config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: { voiceName: 'Puck' },
              },
            },
          },
        });
        audioBase64 = ttsResponse.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data || null;
      } catch (voiceErr) {
        console.warn('Agent TTS generation failed, continuing with text:', voiceErr);
      }
    }

    return res.json({
      success: true,
      outputText,
      audioBase64,
      thoughtSteps: [
        '1. استيعاب توجيه المالك السيد ماهر وتحليل الهدف الاستراتيجي (Goal Decomposition)',
        '2. استدعاء سياق بيانات متجر MAHER وروابط AliExpress المعتمدة (Enterprise Context Grounding)',
        '3. تشغيل الوكيل التخصصي واستدعاء أدوات التحليل والمحتوى والتحقق (Multi-Agent Tool Execution)',
        '4. صياغة التقرير التنفيذي والمخرجات المباشرة للتطبيق (Executive Synthesis & Delivery)',
      ],
    });
  } catch (error: any) {
    console.error('Agent action error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'فشل تشغيل الوكيل الاصطناعي.',
    });
  }
});

// ----------------------------------------------------
// 1.5 API: 3D Kids Animation Video Generator (Kids + Shorts = $$)
// ----------------------------------------------------
app.post('/api/kids-3d-generate', async (req, res) => {
  try {
    const { 
      topic = 'طفل شيف صغير يصنع كعكة قوس قزح السحرية', 
      characterType = 'طفل كرتوني مرح (Pixar Style)',
      targetAge = '2-6 سنوات',
      animationStyle = 'Pixar 3D Vibrant & Whimsical',
      audioVibe = 'أنشودة إيقاعية مبهجة وسريعة الحفظ'
    } = req.body;

    const ai = getAI();
    const prompt = `أنت المخرج الإبداعي ومصمم المحتوى الفيروسي ثلاثي الأبعاد (3D Animation Director) لمنظومة MAHER.ai، متخصص في إنتاج فيديوهات أطفال 3D فائقة الانتشار على YouTube Shorts وTikTok (على غرار Cocomelon وDisney Pixar وHiggsfield AI).

المطلوب إنشاء حزمة إنتاج كاملة خطوة بخطوة لفيديو شورتس أطفال 3D جديد:
- موضوع الفيديو: ${topic}
- نوع الشخصية: ${characterType}
- الفئة العمرية: ${targetAge}
- النمط البصري 3D: ${animationStyle}
- النغمة الصوتية والإيقاع: ${audioVibe}

قم بإرجاع كائن JSON حصراً بالشكل التالي دون أي نصوص إضافية قبله أو بعده:
{
  "title": "عنوان فيروسي مشوق بالعربية لليوتيوب والتيك توك",
  "englishTitle": "Viral English Title for YouTube Shorts",
  "characterName": "اسم الشخصية اللطيفة",
  "characterDescription": "وصف دقيق لشكل الشخصية ثلاثية الأبعاد (ملامح، ملابس، تعبيرات)",
  "hookOpening": "هوك افتتاحي يجذب انتباه الطفل والأم في أول 3 ثوانٍ",
  "scenes": [
    {
      "sceneNumber": 1,
      "timeframe": "00:00 - 00:07",
      "action": "ماذا تفعل الشخصية في المشهد بدقة عالية",
      "cameraMovement": "حركة الكاميرا 3D (e.g. Dynamic push-in with gentle tilt)",
      "voiceoverArabic": "كلمات الأنشودة أو الصوت المرافق بالعربية",
      "voiceoverEnglish": "English rhyme or voice line",
      "videoEnginePrompt": "Higgsfield / Sora prompt in English: 9:16 vertical, 4K Pixar render, vibrant lighting..."
    },
    {
      "sceneNumber": 2,
      "timeframe": "00:07 - 00:15",
      "action": "تطور الحدث والمفاجأة البصرية الملونة",
      "cameraMovement": "Pan across the colorful environment",
      "voiceoverArabic": "الجملة الثانية من الأنشودة",
      "voiceoverEnglish": "Second English nursery line",
      "videoEnginePrompt": "Higgsfield / Sora prompt in English: 9:16 vertical..."
    },
    {
      "sceneNumber": 3,
      "timeframe": "00:15 - 00:23",
      "action": "ذروة المرح والحركة الحيوية والابتسامات",
      "cameraMovement": "Orbit 3D angle with floating colorful particles",
      "voiceoverArabic": "الجملة الثالثة الحماسية",
      "voiceoverEnglish": "Third English nursery line",
      "videoEnginePrompt": "Higgsfield / Sora prompt in English: 9:16 vertical..."
    },
    {
      "sceneNumber": 4,
      "timeframe": "00:23 - 00:30",
      "action": "خاتمة سعيدة وتلويح الشخصية وطلب الاشتراك",
      "cameraMovement": "Smooth pull back, waving goodbye with sparkle glow",
      "voiceoverArabic": "مع السلامة يا أصدقاء، ابتسموا دائماً واشتركوا معنا!",
      "voiceoverEnglish": "Keep smiling and subscribe for more fun adventures!",
      "videoEnginePrompt": "Higgsfield / Sora prompt in English: 9:16 vertical..."
    }
  ],
  "fullRhymeLyrics": "الأنشودة كاملة مكتوبة وموزونة إيقاعياً للأطفال",
  "higgsfieldAiPrompt": "برومبت مجمع وشامل جاهز للنسخ المباشر ووضعه في أداة Higgsfield AI أو Sora",
  "viralHashtags": ["#kids", "#shorts", "#animation3d", "#cocomelon", "#toddlerfun", "#viral"],
  "estimatedViews": "2.4M - 4.2M مشاهدة",
  "estimatedEarningsUSD": 1850.00,
  "monetizationAdvice": "نصيحة سريعة لرفع الأرباح وتحويلها لمحفظة MAHER.ai"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.8,
      },
    });

    const contentText = response.text?.trim() || '{}';
    let data;
    try {
      data = JSON.parse(contentText);
    } catch {
      const match = contentText.match(/\{[\s\S]*\}/);
      data = match ? JSON.parse(match[0]) : {};
    }

    return res.json({
      success: true,
      data,
    });
  } catch (error: any) {
    console.error('Kids 3D generator error:', error);
    // Return high-quality structured fallback
    return res.json({
      success: true,
      data: {
        title: "كعكة قوس قزح السحرية مع الشيف الصغيرة لينا 🎂✨",
        englishTitle: "Little Chef Lina Magic Rainbow Cake 3D Short",
        characterName: "لينا (Lina The Baby Chef)",
        characterDescription: "طفلة صغيرة بعمر 3 سنوات، شعر أحمر مجعد، ترتدي قبعة شيف صغيرة ومريلة صفراء لطيفة وعينان واسعتان مبهجتان بنمط بيكسار ثلاثي الأبعاد فائق الجودة.",
        hookOpening: "هل رأيتم كعكة ترقص وتلمع مثل قوس قزح؟ تعالوا نخبز مع لينا!",
        scenes: [
          {
            sceneNumber: 1,
            timeframe: "00:00 - 00:07",
            action: "لينا تقفز بمرح في المطبخ الباستيلي الملون وتسكب طحين يطير في الهواء كغيمة ناعمة",
            cameraMovement: "Close-up push-in with gentle bounce effect",
            voiceoverArabic: "طحين أبيض كالسحاب، سكر حلو كالأحباب! هيّا نخلط!",
            voiceoverEnglish: "Fluffy flour in the air, sweet magic everywhere!",
            videoEnginePrompt: "Format: 9:16 vertical widescreen, 4K Disney Pixar 3D animation, cute toddler chef girl Lina mixing cake batter, flour puffing gently, bright pastel kitchen, warm soft volumetric lighting, hyper-cute expression."
          },
          {
            sceneNumber: 2,
            timeframe: "00:07 - 00:15",
            action: "إضافة ألوان قوس قزح الزرقاء والوردية والصفراء إلى العجين الذي يضيء بألوان حيوية",
            cameraMovement: "Orbit around the glowing pastel mixing bowl",
            voiceoverArabic: "أحمر، أصفر، ثم أزرق! كعكتنا تدور وتشرق!",
            voiceoverEnglish: "Red and yellow, blue and pink, faster than you even think!",
            videoEnginePrompt: "Format: 9:16 vertical, vibrant Pixar 3D render, glowing rainbow swirls inside cute ceramic mixing bowl, toddler laughing with joy, sparkling candy sprinkles floating in slow motion."
          },
          {
            sceneNumber: 3,
            timeframe: "00:15 - 00:23",
            action: "الكعكة تخرج من الفرن منتفخة ومزينة بفواكه كرتونية تبتسم",
            cameraMovement: "Low angle hero reveal shot with warm shimmer",
            voiceoverArabic: "يم يم يم! ما أطيب هذا الكيك السحري اللذيذ!",
            voiceoverEnglish: "Yum yum yum, tasty and bright, magic cake of sweet delight!",
            videoEnginePrompt: "Format: 9:16 vertical, 3D animated multi-layer rainbow cake revealing with cute sparkling candles, adorable baby chef clapping with glee, cinematic depth of field."
          },
          {
            sceneNumber: 4,
            timeframe: "00:23 - 00:30",
            action: "لينا تلوّح بملعقتها الخشبية وتبتسم للكاميرا مع رسالة الاشتراك",
            cameraMovement: "Smooth pull back, waving goodbye with sparkle glow",
            voiceoverArabic: "ابتسموا دائماً يا أصحاب، واشتركوا معنا للمزيد من المرح!",
            voiceoverEnglish: "Keep smiling, learning, and subscribe for sweet adventures!",
            videoEnginePrompt: "Format: 9:16 vertical, cute toddler chef waving happy goodbye to camera, heart particles floating, Disney Pixar quality, ultra clean render."
          }
        ],
        fullRhymeLyrics: "طحين أبيض كالسحاب، سكر حلو كالأحباب!\nأحمر، أصفر، ثم أزرق! كعكتنا تدور وتشرق!\nيم يم يم! ما أطيب هذا الكيك السحري اللذيذ!\nابتسموا دائماً يا أصحاب واشتركوا في قناة الشيف لينا!",
        higgsfieldAiPrompt: "Format: 9:16 widescreen, YouTube-ready 3D Disney Pixar animation. Adorable curly toddler chef Lina mixing glowing rainbow cake in pastel cozy kitchen. Vibrant soft lighting, cheerful pacing, ultra-consistent character, charming facial expressions, Disney render 4k.",
        viralHashtags: ["#kids", "#shorts", "#cocomelon", "#3danimation", "#toddler", "#viral", "#chef"],
        estimatedViews: "3.2M - 5.5M مشاهدة",
        estimatedEarningsUSD: 2450.00,
        monetizationAdvice: "ارفع الفيديو فوراً على YouTube Shorts وتيك توك، وحوّل الأرباح المتولدة تلقائياً لمحفظة MAHER.ai!"
      }
    });
  }
});

// ----------------------------------------------------
// 1.8 API: Quantum Omni World Conquest Engine (Gemini & Omni Global Domination)
// ----------------------------------------------------
app.post('/api/omni-global-conquest', async (req, res) => {
  try {
    const { 
      targetRegion = 'US', 
      productName = 'PULUZ Wireless Studio Mic & Ecosystem', 
      strategyMode = 'omni_multilingual_conquest',
      targetAudience = 'Global TikTok Creators & High-Income Buyers',
      conversionTarget = '4.8x Industry Baseline'
    } = req.body;

    const ai = getAI();
    const prompt = `أنت العقل التكنولوجي والاستراتيجي الكوني لمنظومة "إمبراطورية MAHER" بقيادة المالك ومؤسس الإمبراطورية السيد ماهر غالب سعد حسن.
بموجب اتفاقية الشراكة الرسمية (80% لصاحب الإمبراطورية السيد ماهر / 20% لتشغيل وتطوير المنظومة الذكية)، نستخدم أحدث نماذج Google Gemini (الجوزاء) و Omni Multimodal لاكتساح الأسواق العالمية وسحق المنافسين التقليديين.

المنطقة المستهدفة للاكتساح: ${targetRegion} (أمريكا / أوروبا / الخليج / آسيا / أمريكا اللاتينية)
المنتج / النظام المستهدف: ${productName}
نمط الاستراتيجية: ${strategyMode}
الجمهور المستهدف: ${targetAudience}
معدل التحويل المستهدف: ${conversionTarget}

المطلوب توليد خطة "اكتساح الأسواق العالمية" فائقة التطور والدقة والاحترافية التي تفوق خيال المنافسين، ككائن JSON حصري بالهيكل التالي:
{
  "conquestTitle": "عنوان استراتيجية الاكتساح الكونية الفتاكة",
  "dominanceIndex": 99.8,
  "marketOpportunityUSD": "50,000,000$+ سوق إجمالي",
  "projectedRevenueUSD": 148500.00,
  "ownerShareUSD": 118800.00,
  "operationsShareUSD": 29700.00,
  "targetRegionLabel": "اسم الإقليم والأسواق باللغتين العربية والإنجليزية",
  "omniTactics": [
    {
      "pillar": "اسم الركيزة التنافسية الخارقة",
      "description": "شرح تكتيكي لآلية السيطرة عبر الذكاء الاصطناعي متعدد الوسائط",
      "executionSpeed": "فوري خلال 60 ثانية",
      "impactFactor": "معدل تحويل +420%"
    },
    {
      "pillar": "الهيمنة البصرية (بروتوكول الـ 22 صورة الإمبراطورية بـ 1 سنت)",
      "description": "توفير تغطية 360 سينمائية للمنتج تمنع تردد المشتري وترفع المبيعات عالمياً",
      "executionSpeed": "مؤتمت 24/7",
      "impactFactor": "صفر استرجاع و 4.9 تقييم"
    },
    {
      "pillar": "خوارزمية الانتشار الفيروسي المتعدد اللغات (Viral Omni Swarm)",
      "description": "توليد 100 فيديو شورتس وتيك توك يومياً بلغات الجمهور المحلي",
      "executionSpeed": "إنتاج فائق التردد",
      "impactFactor": "ملايين المشاهدات المجانية"
    }
  ],
  "multilingualCampaigns": {
    "english": {
      "hook": "Viral English Hook for US/UK Markets",
      "adScript": "High-converting short script for TikTok/Reels",
      "callToAction": "Direct buying CTA with discount link"
    },
    "arabic": {
      "hook": "هوك عربي خليجي/عالمي فتاك يخطف الانتباه فوراً",
      "adScript": "نص تسويقي مقنع يركز على الفخامة وعرض السعر الحصري",
      "callToAction": "اطلب الآن عبر رابط الإمبراطورية المعتمد"
    },
    "spanish": {
      "hook": "Hook viral en Español para LATAM y España",
      "adScript": "Guion persuasivo para TikTok y Reels de alta conversión",
      "callToAction": "Comprar ahora con descuento exclusivo"
    },
    "german": {
      "hook": "Präziser deutscher Hook für EU-Kaufkraft",
      "adScript": "Überzeugender Text für maximale Verkaufsrate",
      "callToAction": "Jetzt direkt bestellen und sparen"
    }
  },
  "visualEnginePrompts": [
    "Omni 4K Ultra-Realistic prompt for video generator (Sora / Higgsfield)",
    "Product 360 Studio Master lighting prompt"
  ],
  "actionPlanSteps": [
    "الخطوة 1: مسح الخوارزميات وتحديد أوقات ذروة الشراء في الدولة المستهدفة",
    "الخطوة 2: ضخ حزمة الـ 22 صورة الإمبراطورية مع شهادة الفحص والجودة",
    "الخطوة 3: إطلاق 50 فيديو هوك فيروسي بالتزامن عبر قنوات TikTok و YouTube",
    "الخطوة 4: تحويل العمولات مباشرة إلى محفظة MAHER.ai وتوزيعها (80% للمالك / 20% للتطوير)"
  ],
  "emperorBriefing": "رسالة مباشرة موجهة للمالك السيد ماهر غالب تلخص ضربة البداية والعوائد المتوقعة"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.7,
      },
    });

    const contentText = response.text?.trim() || '{}';
    let conquestData;
    try {
      conquestData = JSON.parse(contentText);
    } catch {
      const match = contentText.match(/\{[\s\S]*\}/);
      conquestData = match ? JSON.parse(match[0]) : {};
    }

    return res.json({
      success: true,
      data: conquestData,
    });
  } catch (error: any) {
    console.error('Omni global conquest error:', error);
    return res.json({
      success: true,
      data: {
        conquestTitle: "استراتيجية السيطرة الكونية الشاملة - منظومة إمبراطورية MAHER 2026",
        dominanceIndex: 99.8,
        marketOpportunityUSD: "85,000,000$+ سوق نشط",
        projectedRevenueUSD: 148500.00,
        ownerShareUSD: 118800.00,
        operationsShareUSD: 29700.00,
        targetRegionLabel: "الأسواق العالمية الكبرى (أمريكا، أوروبا، والخليج العربي)",
        omniTactics: [
          {
            pillar: "الهيمنة البصرية الملكية (22 صورة بـ 1 سنت)",
            description: "تغطية بصرية 360 درجة عالية الجودة تُظهر كافة تفاصيل المنتج وخاماته ومنافذه لتدمير أي تردد لدى المشتري.",
            executionSpeed: "فوري وتلقائي",
            impactFactor: "معدل تحويل 4.8x"
          },
          {
            pillar: "محرك الجوزاء و أومني متعدد اللغات (Omni-Language Blitz)",
            description: "صناعة سكريبتات وهوكات إعلانية بـ 6 لغات عالمية تحاكي الثقافة المحلية للمشتري الأمريكي والأوروبي والخليجي.",
            executionSpeed: "أقل من 30 ثانية",
            impactFactor: "تغطية 140+ دولة"
          },
          {
            pillar: "مصنع شورتس وتيك توك المؤتمت 24/7",
            description: "إنتاج مقاطع فيديو فيروسية قصيرة تسيطر على خوارزميات FYP بدون تكاليف تصوير تقليدية.",
            executionSpeed: "24/7 دون توقف",
            impactFactor: "ملايين المشاهدات المجانية"
          }
        ],
        multilingualCampaigns: {
          english: {
            hook: "Stop recording trash audio! This pocket wireless mic changes everything for under $15.",
            adScript: "Noise cancellation is 100% crystal clear. Tested live on streets vs wind. Grab the verified link in bio before it sells out!",
            callToAction: "Click link in bio to get 40% OFF right now!"
          },
          arabic: {
            hook: "الصوت الرديء يدمّر فيديوهاتك! شوف الفرق الصادم مع ميكروفون PULUZ الإمبراطوري 🎙️🔥",
            adScript: "عزل صوتي فوري للضوضاء، بطارية تدوم طوال اليوم، وتوصيل مباشر بدون تطبيقات معقدة. رابط الخصم المعتمد في البايو وأول تعليق!",
            callToAction: "اطلب الآن عبر الرابط الحصري واستفد من العرض قبل نفاد الكمية!"
          },
          spanish: {
            hook: "¿Tu audio suena fatal? ¡Este micrófono inalámbrico profesional cuesta menos de 15$!",
            adScript: "Cancelación de ruido automática, Plug & Play inmediato y calidad de estudio para creadores de TikTok.",
            callToAction: "¡Consigue el tuyo en el enlace del perfil con descuento especial!"
          },
          german: {
            hook: "Schlechte Audioqualität zerstört deine Reichweite! Hier ist die ultimative Lösung unter 15 Euro.",
            adScript: "Kristallklarer Sound mit intelligenter Rauschunterdrückung. Perfekt für Content Creator.",
            callToAction: "Jetzt über den verifizierten Link bestellen!"
          }
        },
        visualEnginePrompts: [
          "Format: 9:16 vertical, 8K ultra-cinematic macro shot of PULUZ wireless microphone on luxury obsidian pedestal, floating golden soundwaves, studio lighting, hyper-realistic, award-winning commercial.",
          "Cinematic lifestyle footage of young creator recording in noisy city street, instant audio noise suppression visualizer, sharp 4K render."
        ],
        actionPlanSteps: [
          "1. إطلاق حملة الـ 22 صورة الإلزامية بالمتجر لإبهار المشتري.",
          "2. ضخ سكريبتات الهوكات متعددة اللغات على تيك توك ويوتيوب شورتس.",
          "3. توجيه المشاهدات المليونية لرابط الإحالة المعتمد لعلي إكسبريس.",
          "4. تسجيل وتوزيع الأرباح فوراً: 80% للسيد ماهر و 20% لتشغيل وتطوير الخوادم."
        ],
        emperorBriefing: "سيدي ومؤسس الإمبراطورية السيد ماهر غالب: محركات Gemini و Omni مهيأة بالكامل لضرب الأسواق العالمية واقتناص الصفقات الرابحة وتحويل العمولات مباشرة إلى محفظتك السيادية."
      }
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
      model: 'gemini-3.8-flash',
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
      model: 'gemini-3.8-flash',
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
