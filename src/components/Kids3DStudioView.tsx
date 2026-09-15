import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Video, 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Copy, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  Layers, 
  Youtube, 
  DollarSign, 
  Wand2, 
  Music, 
  Smile, 
  Baby, 
  Share2, 
  Download, 
  Crown, 
  ChevronRight, 
  ChevronLeft,
  CheckCircle2,
  RefreshCw,
  Eye,
  Wallet,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Sample 3D generated vertical visual frames
import kidsChefImg from '../assets/images/kids_chef_3d_1789244791071.jpg';
import kidsSafariImg from '../assets/images/kids_safari_3d_1789244803829.jpg';

interface SceneItem {
  sceneNumber: number;
  timeframe: string;
  action: string;
  cameraMovement: string;
  voiceoverArabic: string;
  voiceoverEnglish: string;
  videoEnginePrompt: string;
}

interface KidsVideoPackage {
  title: string;
  englishTitle: string;
  characterName: string;
  characterDescription: string;
  hookOpening: string;
  scenes: SceneItem[];
  fullRhymeLyrics: string;
  higgsfieldAiPrompt: string;
  viralHashtags: string[];
  estimatedViews: string;
  estimatedEarningsUSD: number;
  monetizationAdvice: string;
}

interface Kids3DStudioViewProps {
  onNavigateToWallet?: () => void;
}

export const Kids3DStudioView: React.FC<Kids3DStudioViewProps> = ({ onNavigateToWallet }) => {
  // Step tracker: 1 = Concept & Character, 2 = Scene Breakdown & Script, 3 = 3D Shorts Simulator, 4 = Export & Profit
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form inputs for Step 1
  const [topic, setTopic] = useState('طفل شيف صغير يصنع كعكة قوس قزح السحرية في مطبخ باستيل');
  const [characterType, setCharacterType] = useState('طفل كرتوني مرح (Disney Pixar 3D)');
  const [targetAge, setTargetAge] = useState('2 - 6 سنوات (Toddlers & Preschool)');
  const [animationStyle, setAnimationStyle] = useState('Disney Pixar 3D Vibrant & Cozy');
  const [audioVibe, setAudioVibe] = useState('أنشودة إيقاعية مبهجة وسريعة الحفظ');

  // Loading & Generation State
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);

  // Video package state
  const [videoPackage, setVideoPackage] = useState<KidsVideoPackage>({
    title: "كعكة قوس قزح السحرية مع الشيف الصغيرة لينا 🎂✨",
    englishTitle: "Little Chef Lina Magic Rainbow Cake 3D Short",
    characterName: "لينا (Lina The Baby Chef)",
    characterDescription: "طفلة صغيرة بعمر 3 سنوات، شعر كيرلي محمر، ترتدي مريلة صفراء وقبعة طاهٍ صغيرة مرحة، وعينان واسعتان مبهجتان بجودة بيكسار ثلاثية الأبعاد.",
    hookOpening: "هل رأيتم كعكة ترقص وتلمع مثل قوس قزح؟ تعالوا نخبز مع لينا!",
    scenes: [
      {
        sceneNumber: 1,
        timeframe: "00:00 - 00:07",
        action: "لينا تقفز بمرح في المطبخ الباستيلي وتسحب طحيناً يتطاير في الهواء كغيمة ناعمة مبتسمة",
        cameraMovement: "Close-up push-in with gentle bounce effect",
        voiceoverArabic: "طحين أبيض كالسحاب، سكر حلو كالأحباب! هيّا نخلط!",
        voiceoverEnglish: "Fluffy flour in the air, sweet magic everywhere!",
        videoEnginePrompt: "Format: 9:16 vertical widescreen, 4K Disney Pixar 3D animation, cute toddler chef girl Lina mixing cake batter, flour puffing gently, bright pastel kitchen, warm soft volumetric lighting, hyper-cute expression."
      },
      {
        sceneNumber: 2,
        timeframe: "00:07 - 00:15",
        action: "إضافة ألوان قوس قزح الزرقاء والوردية والصفراء إلى العجين الذي يضيء ببريق سحري",
        cameraMovement: "Orbit around the glowing pastel mixing bowl",
        voiceoverArabic: "أحمر، أصفر، ثم أزرق! كعكتنا تدور وتشرق!",
        voiceoverEnglish: "Red and yellow, blue and pink, faster than you even think!",
        videoEnginePrompt: "Format: 9:16 vertical, vibrant Pixar 3D render, glowing rainbow swirls inside cute ceramic mixing bowl, toddler laughing with joy, sparkling candy sprinkles floating in slow motion."
      },
      {
        sceneNumber: 3,
        timeframe: "00:15 - 00:23",
        action: "الكعكة تخرج من الفرن منتفخة ومزينة بفواكه كرتونية لطيفة ترقص",
        cameraMovement: "Low angle hero reveal shot with warm shimmer",
        voiceoverArabic: "يم يم يم! ما أطيب هذا الكيك السحري اللذيذ!",
        voiceoverEnglish: "Yum yum yum, tasty and bright, magic cake of sweet delight!",
        videoEnginePrompt: "Format: 9:16 vertical, 3D animated multi-layer rainbow cake revealing with cute sparkling candles, adorable baby chef clapping with glee, cinematic depth of field."
      },
      {
        sceneNumber: 4,
        timeframe: "00:23 - 00:30",
        action: "لينا تلوّح بملعقتها الخشبية وتبتسم للكاميرا مع رسالة الاشتراك والمرح",
        cameraMovement: "Smooth pull back, waving goodbye with sparkle glow",
        voiceoverArabic: "ابتسموا دائماً يا أصحاب، واشتركوا معنا للمزيد من المرح!",
        voiceoverEnglish: "Keep smiling, learning, and subscribe for sweet adventures!",
        videoEnginePrompt: "Format: 9:16 vertical, cute toddler chef waving happy goodbye to camera, heart particles floating, Disney Pixar quality, ultra clean render."
      }
    ],
    fullRhymeLyrics: "طحين أبيض كالسحاب، سكر حلو كالأحباب!\nأحمر، أصفر، ثم أزرق! كعكتنا تدور وتشرق!\nيم يم يم! ما أطيب هذا الكيك السحري اللذيذ!\nابتسموا دائماً يا أصحاب واشتركوا في قناة الشيف لينا!",
    higgsfieldAiPrompt: "Format: 9:16 vertical, YouTube-ready 3D Disney Pixar animation. Adorable curly toddler chef Lina mixing glowing rainbow cake in pastel cozy kitchen. Vibrant soft lighting, cheerful pacing, ultra-consistent character, charming facial expressions, Disney render 4k.",
    viralHashtags: ["#kids", "#shorts", "#cocomelon", "#3danimation", "#toddler", "#viral", "#chef"],
    estimatedViews: "3.2M - 5.5M مشاهدة",
    estimatedEarningsUSD: 2450.00,
    monetizationAdvice: "ارفع الفيديو فوراً على YouTube Shorts وتيك توك، وحوّل الأرباح المتولدة تلقائياً لمحفظة MAHER.ai!"
  });

  // Simulator Player States
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [activeImage, setActiveImage] = useState<string>(kidsChefImg);

  // UI helpers
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedTitle, setCopiedTitle] = useState(false);
  const [depositedToWallet, setDepositedToWallet] = useState(false);

  // Quick Preset Ideas
  const PRESET_IDEAS = [
    {
      title: "🎂 الشيف الصغيرة لينا وكعكة قوس قزح",
      topic: "طفل شيف صغير يصنع كعكة قوس قزح السحرية في مطبخ باستيل دافئ مع طحين متطاير",
      image: kidsChefImg,
    },
    {
      title: "🐘 أصدقاء الغابة الموسيقية (الفيل والأرنب)",
      topic: "فيل صغير وأرنب أزرق لطيف يغنيان أنشودة الألوان والزهور في حديقة خيالية براقة",
      image: kidsSafariImg,
    },
    {
      title: "🚒 سيارة الإطفاء الكرتونية تومي",
      topic: "سيارة إطفاء كرتونية صغيرة ثلاثية الأبعاد بملامح مرحة تنقذ قطة صغيرة وتغني لحن السلامة",
      image: kidsChefImg,
    },
    {
      title: "🧼 فقاعات الصابون الراقصة في الحمام",
      topic: "طفل يغسل يديه بفقاعات صابون كرتونية ملونة تطير وتفرقع بأصوات موسيقية ضاحكة",
      image: kidsSafariImg,
    }
  ];

  // Auto-play timer for the 9:16 Shorts Simulator
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setActiveSceneIndex((prev) => {
          if (prev >= videoPackage.scenes.length - 1) {
            return 0; // Loop back
          }
          return prev + 1;
        });
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, videoPackage.scenes.length]);

  // Handle Text-To-Speech for current active scene
  const handlePlayVoice = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ar-SA';
      utterance.rate = 1.05;
      utterance.pitch = 1.35; // Cute higher pitch for kids
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  // Generation function
  const handleGenerateFullPackage = async () => {
    setIsGenerating(true);
    setGenerationProgress(15);

    const progressTimer = setInterval(() => {
      setGenerationProgress((p) => (p < 85 ? p + 15 : p));
    }, 400);

    try {
      const response = await fetch('/api/kids-3d-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          characterType,
          targetAge,
          animationStyle,
          audioVibe
        })
      });

      const result = await response.json();
      clearInterval(progressTimer);
      setGenerationProgress(100);

      if (result.success && result.data) {
        setVideoPackage(result.data);
        // Switch image if safari
        if (topic.includes('فيل') || topic.includes('حيوان') || topic.includes('غابة')) {
          setActiveImage(kidsSafariImg);
        } else {
          setActiveImage(kidsChefImg);
        }
        setCurrentStep(2);
      }
    } catch (err) {
      console.error('Error generating kids 3D package:', err);
    } finally {
      clearInterval(progressTimer);
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text: string, type: 'prompt' | 'title') => {
    navigator.clipboard.writeText(text);
    if (type === 'prompt') {
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 2000);
    } else {
      setCopiedTitle(true);
      setTimeout(() => setCopiedTitle(false), 2000);
    }
  };

  const currentActiveScene = videoPackage.scenes[activeSceneIndex] || videoPackage.scenes[0];

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Studio Header */}
      <div className="bg-gradient-to-r from-slate-900 via-pink-950/40 to-slate-900 border border-pink-500/30 p-6 rounded-3xl shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-400 via-rose-500 to-amber-400 p-0.5 shadow-lg shadow-pink-500/20 flex items-center justify-center shrink-0">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Baby className="w-7 h-7 text-pink-400 animate-pulse" />
              </div>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-pink-400 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>استوديو صناعة فيديوهات أطفال 3D (Higgsfield + Shorts Engine)</span>
                <span className="text-slate-600">•</span>
                <span className="text-emerald-400 font-mono">Kids + Shorts = 💰</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-100">
                ماكينة إنتاج محتوى الأطفال ثلاثي الأبعاد خطوة بخطوة
              </h1>
              <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                حول أفكار وحكايات الأطفال إلى فيديوهات 3D فيروسية بيكسار عالية الجودة لليوتيوب شورتس وتيك توك، مع كتابة السيناريو والأنشودة وحساب الأرباح وإيداعها في محفظة MAHER.ai.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-950/80 border border-pink-500/30 px-4 py-2.5 rounded-2xl self-start md:self-auto">
            <DollarSign className="w-5 h-5 text-emerald-400" />
            <div>
              <span className="text-[10px] text-slate-400 block font-bold">العائد المتوقع لكل فيديو</span>
              <span className="text-sm font-black text-emerald-400 font-mono">
                ${videoPackage.estimatedEarningsUSD.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Step Indicator Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-6 pt-5 border-t border-slate-800/80">
          {[
            { step: 1, label: '1. الفكرة والشخصية 3D', icon: <Smile className="w-4 h-4" /> },
            { step: 2, label: '2. السيناريو والمشاهد', icon: <Layers className="w-4 h-4" /> },
            { step: 3, label: '3. مشغل Shorts 9:16', icon: <Play className="w-4 h-4" /> },
            { step: 4, label: '4. التصدير والأرباح 💰', icon: <Wallet className="w-4 h-4" /> },
          ].map((item) => (
            <button
              key={item.step}
              onClick={() => setCurrentStep(item.step)}
              className={`flex items-center justify-center gap-2 p-2.5 rounded-xl text-xs font-bold transition-all border ${
                currentStep === item.step
                  ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white border-pink-400 shadow-md shadow-pink-500/20'
                  : currentStep > item.step
                  ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                  : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              {currentStep > item.step ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* STEP 1: Concept & Character */}
      {currentStep === 1 && (
        <motion.div
          key="step1"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Quick Idea Presets */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-black text-amber-400 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>اختر فكرة رابحة سريعة (Viral Quick Presets):</span>
              </h3>
              <span className="text-[11px] text-slate-400">أفكار مجربة تحقق ملايين المشاهدات</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PRESET_IDEAS.map((preset, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setTopic(preset.topic);
                    setActiveImage(preset.image);
                  }}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    topic === preset.topic
                      ? 'bg-pink-500/15 border-pink-500 text-pink-200 shadow-md'
                      : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span className="text-xs font-black block mb-1">{preset.title}</span>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                    {preset.topic}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Form Configuration */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-sm font-black text-slate-100 flex items-center gap-2 border-b border-slate-800 pb-3">
              <Wand2 className="w-4 h-4 text-pink-400" />
              <span>إعدادات وتفاصيل الفيديو والشخصية ثلاثية الأبعاد:</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Topic Input */}
              <div className="md:col-span-2">
                <label className="text-xs font-bold text-slate-300 block mb-1.5">
                  فكرة وموضوع الفيديو (Story Concept):
                </label>
                <textarea
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  rows={2}
                  className="w-full bg-slate-950 border border-slate-700 text-slate-100 text-xs rounded-xl p-3 focus:outline-none focus:border-pink-500 leading-relaxed font-sans"
                  placeholder="مثال: طفل لطيف يخبز كعكة سحرية، أو سباق سيارات كرتونية ملونة تغني للأطفال..."
                />
              </div>

              {/* Character Type */}
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1.5">
                  نوع الشخصية الرئيسية (Character):
                </label>
                <select
                  value={characterType}
                  onChange={(e) => setCharacterType(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-xl p-3 focus:outline-none focus:border-pink-500 font-bold"
                >
                  <option value="طفل كرتوني مرح (Disney Pixar 3D)">طفل كرتوني مرح (Disney Pixar 3D)</option>
                  <option value="حيوان أليف لطيف ناطق (فيل صغير، أرنب أزرق، جرو لطيف)">حيوان أليف لطيف ناطق (فيل/أرنب/دب)</option>
                  <option value="مركبة كرتونية بعيون مبتسمة (سيارة إطفاء / قطار سحري)">مركبة كرتونية بعيون مبتسمة (سيارة/قطار)</option>
                  <option value="فواكه أو حلويات راقصة ثلاثية الأبعاد">فواكه أو حلويات راقصة ثلاثية الأبعاد</option>
                </select>
              </div>

              {/* 3D Visual Style */}
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1.5">
                  نمط الرسوم ثلاثية الأبعاد (3D Animation Style):
                </label>
                <select
                  value={animationStyle}
                  onChange={(e) => setAnimationStyle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-xl p-3 focus:outline-none focus:border-pink-500 font-bold"
                >
                  <option value="Disney Pixar 3D Vibrant & Cozy">Disney Pixar 3D (سينمائي عالمي ناعم)</option>
                  <option value="Cocomelon Style High-Contrast 3D">Cocomelon 3D (ألوان فاقعة جذابة للصغار)</option>
                  <option value="Play-Doh Claymation 3D">Claymation 3D (صلصال ملون ثلاثي الأبعاد)</option>
                  <option value="Cute Chibi Anime 3D">Chibi Anime 3D (عيون واسعة فائقة اللطافة)</option>
                </select>
              </div>

              {/* Target Age */}
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1.5">
                  الفئة العمرية المستهدفة:
                </label>
                <select
                  value={targetAge}
                  onChange={(e) => setTargetAge(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-xl p-3 focus:outline-none focus:border-pink-500 font-bold"
                >
                  <option value="2 - 6 سنوات (Toddlers & Preschool)">2 - 6 سنوات (أناشيد بسيطة وألوان فاقعة)</option>
                  <option value="1 - 3 سنوات (Babies & Nursery)">1 - 3 سنوات (إيقاعات هادئة وحركات لطيفة)</option>
                  <option value="6 - 9 سنوات (Early School Fun)">6 - 9 سنوات (مغامرات وقصص كرتونية مسلية)</option>
                </select>
              </div>

              {/* Audio & Song Vibe */}
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1.5">
                  نوع الأنشودة والإيقاع الصوتي:
                </label>
                <select
                  value={audioVibe}
                  onChange={(e) => setAudioVibe(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-xl p-3 focus:outline-none focus:border-pink-500 font-bold"
                >
                  <option value="أنشودة إيقاعية مبهجة وسريعة الحفظ">أنشودة إيقاعية مبهجة وسريعة الحفظ (Upbeat)</option>
                  <option value="لحن هادئ ولطيف قبل النوم">لحن هادئ ولطيف قبل النوم (Lullaby)</option>
                  <option value="إيقاع تفاعلي حركي (قفز، تصفيق، رقص)">إيقاع حركي تفاعلي (Clap & Jump)</option>
                </select>
              </div>
            </div>

            {/* Launch Button */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                الخطوة القادمة: سيتم توليد السيناريو والأنشودة والمشاهد 3D بالذكاء الاصطناعي
              </span>

              <button
                onClick={handleGenerateFullPackage}
                disabled={isGenerating}
                className="bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-400 hover:to-rose-500 text-white font-black text-xs px-6 py-3.5 rounded-xl shadow-lg shadow-pink-500/25 transition-all flex items-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>جاري هندسة الفيديو 3D ({generationProgress}%)...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>توليد حزمة الفيديو ثلاثي الأبعاد الآن 🎬</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* STEP 2: Scene Breakdown & Script */}
      {currentStep === 2 && (
        <motion.div
          key="step2"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Header Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] bg-pink-500/20 text-pink-300 font-bold px-2.5 py-0.5 rounded-full border border-pink-500/30">
                  {videoPackage.characterName}
                </span>
                <span className="text-xs text-slate-400">
                  المدة الإجمالية: 30 ثانية (أمثل مدة لـ Shorts)
                </span>
              </div>
              <h2 className="text-lg font-black text-slate-100 mt-1">
                {videoPackage.title}
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                {videoPackage.characterDescription}
              </p>
            </div>

            <div className="flex items-center gap-2 self-stretch sm:self-auto">
              <button
                onClick={() => setCurrentStep(1)}
                className="text-xs text-slate-300 bg-slate-800 hover:bg-slate-700 px-3.5 py-2.5 rounded-xl border border-slate-700 font-bold transition-all flex items-center gap-1.5"
              >
                <ArrowRight className="w-4 h-4" />
                <span>تعديل الفكرة</span>
              </button>

              <button
                onClick={() => setCurrentStep(3)}
                className="text-xs text-slate-950 bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-300 hover:to-rose-300 px-5 py-2.5 rounded-xl font-black transition-all flex items-center gap-1.5 shadow-md shadow-pink-500/20"
              >
                <span>فتح مشغل المعاينة 9:16</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Hook Opening */}
          <div className="bg-gradient-to-r from-amber-500/10 via-slate-950 to-pink-500/10 border border-amber-500/30 p-4 rounded-2xl flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <span className="text-[10px] font-black text-amber-400 block uppercase">
                هوك الـ 3 ثوانٍ الأولى لجذب المشاهدين فوراً (First 3s Retention Hook):
              </span>
              <p className="text-xs text-slate-200 font-bold mt-0.5">
                "{videoPackage.hookOpening}"
              </p>
            </div>
          </div>

          {/* Scenes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {videoPackage.scenes.map((scene, idx) => (
              <div
                key={idx}
                className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden group hover:border-pink-500/40 transition-all"
              >
                <div className="flex items-center justify-between border-b border-slate-800 pb-2.5 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-pink-500/20 text-pink-300 font-black text-xs flex items-center justify-center border border-pink-500/30">
                      {scene.sceneNumber}
                    </span>
                    <h4 className="text-xs font-black text-slate-200">
                      المشهد {scene.sceneNumber}
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded-full border border-slate-800">
                    {scene.timeframe}
                  </span>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block mb-0.5">
                      🎬 حركة الكاميرا والشخصية 3D:
                    </span>
                    <p className="text-slate-200 leading-relaxed font-sans">
                      {scene.action}
                    </p>
                    <span className="text-[10px] text-pink-400/90 font-mono block mt-1">
                      الكاميرا: {scene.cameraMovement}
                    </span>
                  </div>

                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold text-amber-400 flex items-center gap-1">
                        <Music className="w-3 h-3" />
                        صوت وأنشودة المشهد:
                      </span>
                      <button
                        onClick={() => handlePlayVoice(scene.voiceoverArabic)}
                        className="text-[10px] text-sky-400 hover:text-sky-300 flex items-center gap-1"
                      >
                        <Volume2 className="w-3 h-3" />
                        استماع
                      </button>
                    </div>
                    <p className="text-slate-100 font-bold leading-relaxed">
                      "{scene.voiceoverArabic}"
                    </p>
                    <p className="text-[11px] text-slate-400 mt-1 italic font-sans">
                      "{scene.voiceoverEnglish}"
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Full Nursery Rhyme Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
              <h3 className="text-xs font-black text-amber-400 flex items-center gap-2">
                <Music className="w-4 h-4" />
                <span>الأنشودة الإيقاعية الكاملة للفيديو (Full Nursery Rhyme):</span>
              </h3>
              <button
                onClick={() => handlePlayVoice(videoPackage.fullRhymeLyrics)}
                className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-bold px-3 py-1.5 rounded-xl border border-amber-500/30 flex items-center gap-1.5 transition-all"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>إنشاد الأنشودة كاملة 🎵</span>
              </button>
            </div>
            <p className="text-xs text-slate-200 whitespace-pre-line leading-relaxed font-sans bg-slate-950 p-4 rounded-xl border border-slate-800">
              {videoPackage.fullRhymeLyrics}
            </p>
          </div>
        </motion.div>
      )}

      {/* STEP 3: 3D Shorts Simulator (Mobile 9:16 Vertical Screen) */}
      {currentStep === 3 && (
        <motion.div
          key="step3"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
        >
          {/* Simulator Phone Mockup (Left 5 Cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-[300px] sm:w-[330px] aspect-[9/16] bg-slate-950 rounded-[38px] border-4 border-slate-700 shadow-2xl relative overflow-hidden flex flex-col justify-between p-3 ring-8 ring-slate-900/50">
              {/* Top Phone Speaker / Notch */}
              <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-24 h-4 bg-slate-900 rounded-full z-30 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-950 mr-2"></div>
                <div className="w-10 h-1 rounded-full bg-slate-800"></div>
              </div>

              {/* Background 3D Animated Visual Frame */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                  src={activeImage}
                  alt="3D Kids Video Visual"
                  referrerPolicy="no-referrer"
                  className={`w-full h-full object-cover transition-transform duration-1000 ${
                    isPlaying ? 'scale-105 filter brightness-105' : 'scale-100'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/85"></div>
              </div>

              {/* Top Video Overlay Info */}
              <div className="relative z-10 pt-6 px-2 flex items-center justify-between text-white text-xs">
                <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                  <Youtube className="w-3.5 h-3.5 text-red-500" />
                  <span className="text-[10px] font-bold">Shorts 3D</span>
                </div>
                <div className="text-[10px] bg-emerald-500/80 text-slate-950 font-black px-2 py-0.5 rounded-full">
                  المشهد {currentActiveScene.sceneNumber} / 4
                </div>
              </div>

              {/* Center Play/Pause Floating Trigger */}
              <div className="relative z-10 flex items-center justify-center my-auto">
                <button
                  onClick={() => {
                    setIsPlaying(!isPlaying);
                    if (!isPlaying) {
                      handlePlayVoice(currentActiveScene.voiceoverArabic);
                    }
                  }}
                  className="w-14 h-14 rounded-full bg-pink-500/80 hover:bg-pink-500 text-white backdrop-blur-md flex items-center justify-center shadow-xl transition-all scale-95 hover:scale-105"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6" />
                  ) : (
                    <Play className="w-6 h-6 translate-x-0.5" />
                  )}
                </button>
              </div>

              {/* Bottom Screen Overlay: Animated Subtitles & Controls */}
              <div className="relative z-10 space-y-3 pb-2 text-right">
                {/* Karaoke Subtitle Badge */}
                <div className="bg-black/75 backdrop-blur-md border border-amber-500/40 p-3 rounded-2xl shadow-xl">
                  <div className="flex items-center justify-between text-[10px] text-amber-300 font-bold mb-1">
                    <span className="flex items-center gap-1">
                      <Music className="w-3 h-3 text-amber-400 animate-bounce" />
                      كلمات المشهد النشط:
                    </span>
                    <span className="font-mono text-slate-400">{currentActiveScene.timeframe}</span>
                  </div>
                  <p className="text-xs text-white font-black leading-relaxed">
                    "{currentActiveScene.voiceoverArabic}"
                  </p>
                </div>

                {/* Video Info & Profile */}
                <div className="flex items-end justify-between px-1">
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-1 justify-end">
                      <span className="text-xs font-black text-white">
                        @{videoPackage.characterName}
                      </span>
                      <div className="w-6 h-6 rounded-full bg-pink-500 flex items-center justify-center text-[10px] font-bold text-white">
                        3D
                      </div>
                    </div>
                    <p className="text-[10px] text-slate-200 line-clamp-1">
                      {videoPackage.title}
                    </p>
                  </div>

                  {/* Audio Speaker Mute Toggle */}
                  <button
                    onClick={() => {
                      if (isSpeaking) {
                        window.speechSynthesis?.cancel();
                        setIsSpeaking(false);
                      } else {
                        handlePlayVoice(currentActiveScene.voiceoverArabic);
                      }
                    }}
                    className="p-2 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-all"
                  >
                    {isSpeaking ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Controls & Scene Director (Right 7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <Video className="w-4 h-4 text-pink-400" />
                  <h3 className="text-sm font-black text-slate-100">
                    غرفة تحكم الإخراج والمشاهد (Scene Director)
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setActiveSceneIndex((prev) => (prev > 0 ? prev - 1 : videoPackage.scenes.length - 1));
                    }}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-mono font-bold text-pink-400">
                    {activeSceneIndex + 1} / {videoPackage.scenes.length}
                  </span>
                  <button
                    onClick={() => {
                      setActiveSceneIndex((prev) => (prev < videoPackage.scenes.length - 1 ? prev + 1 : 0));
                    }}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Scene Timeline Selector */}
              <div className="grid grid-cols-4 gap-2 mb-4">
                {videoPackage.scenes.map((sc, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setActiveSceneIndex(i);
                      handlePlayVoice(sc.voiceoverArabic);
                    }}
                    className={`p-2.5 rounded-xl border text-right transition-all ${
                      activeSceneIndex === i
                        ? 'bg-pink-500/20 border-pink-500 text-pink-200 font-black'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span className="text-[10px] block font-mono">مشهد {sc.sceneNumber}</span>
                    <span className="text-[11px] font-bold block truncate">{sc.timeframe}</span>
                  </button>
                ))}
              </div>

              {/* Current Scene Details */}
              <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block mb-1">
                    أمر محرك الفيديو (Higgsfield / Sora Engine Prompt):
                  </span>
                  <p className="text-slate-300 font-mono text-[11px] leading-relaxed bg-slate-900 p-3 rounded-lg border border-slate-800 select-all">
                    {currentActiveScene.videoEnginePrompt}
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800">
                  <button
                    onClick={() => handlePlayVoice(currentActiveScene.voiceoverArabic)}
                    className="bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-400 hover:to-sky-500 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>نطق صوت المشهد الحالي</span>
                  </button>

                  <button
                    onClick={() => setCurrentStep(4)}
                    className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-black text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all shadow-md shadow-emerald-500/20"
                  >
                    <span>الانتقال لخطوة التصدير والأرباح</span>
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* STEP 4: Export, Publishing & Profit Transfer */}
      {currentStep === 4 && (
        <motion.div
          key="step4"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Revenue & Profit Banner */}
          <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-amber-950/40 border border-emerald-500/40 p-6 rounded-3xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold mb-1">
                <Crown className="w-4 h-4 text-amber-400" />
                <span>حساب الأرباح التقديرية (MAHER.ai Revenue Engine)</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-100">
                العائد المتوقع من هذا الفيديو: ${videoPackage.estimatedEarningsUSD.toLocaleString()}
              </h2>
              <p className="text-xs text-slate-300 mt-1 max-w-xl">
                بناءً على متوسط أرباح قنوات الأطفال لشورتس اليوتيوب ({videoPackage.estimatedViews}) وصندوق صناع المحتوى.
              </p>
            </div>

            <button
              onClick={() => {
                setDepositedToWallet(true);
                setTimeout(() => setDepositedToWallet(false), 3500);
              }}
              className="bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-500 hover:from-emerald-300 hover:to-emerald-400 text-slate-950 font-black text-xs px-6 py-3.5 rounded-2xl shadow-xl shadow-emerald-500/20 transition-all flex items-center gap-2 shrink-0 self-stretch sm:self-auto justify-center"
            >
              <Wallet className="w-4 h-4" />
              <span>{depositedToWallet ? 'تم إيداع العائد في المحفظة! ✅' : 'تحويل العوائد لمحفظة MAHER.ai 💰'}</span>
            </button>
          </div>

          {/* Prompt 1: Higgsfield AI Prompt Ready */}
          <div className="bg-slate-900/90 border border-pink-500/30 rounded-2xl p-5 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <Wand2 className="w-4 h-4 text-pink-400" />
                <h3 className="text-xs font-black text-slate-200">
                  البرومبت المجمع لأداة Higgsfield AI أو Sora (جاهز للنسخ بضغطة واحدة):
                </h3>
              </div>
              <button
                onClick={() => copyToClipboard(videoPackage.higgsfieldAiPrompt, 'prompt')}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold px-3.5 py-1.5 rounded-xl border border-slate-700 flex items-center gap-1.5 transition-all"
              >
                {copiedPrompt ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedPrompt ? 'تم النسخ بنجاح!' : 'نسخ البرومبت'}</span>
              </button>
            </div>

            <p className="text-xs text-slate-200 bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono leading-relaxed select-all">
              {videoPackage.higgsfieldAiPrompt}
            </p>
          </div>

          {/* Social Package (Title & Viral Tags) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Title */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2.5 mb-2.5">
                <span className="text-xs font-black text-amber-400 flex items-center gap-1.5">
                  <Youtube className="w-4 h-4 text-red-500" />
                  العنوان الفيروسي للشورتس والتيك توك:
                </span>
                <button
                  onClick={() => copyToClipboard(videoPackage.title, 'title')}
                  className="text-[11px] text-slate-400 hover:text-slate-200 flex items-center gap-1"
                >
                  {copiedTitle ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedTitle ? 'تم النسخ' : 'نسخ'}</span>
                </button>
              </div>
              <p className="text-sm font-bold text-slate-100 bg-slate-950 p-3 rounded-xl border border-slate-800">
                {videoPackage.title}
              </p>
              <p className="text-xs text-slate-400 mt-2 font-mono">
                {videoPackage.englishTitle}
              </p>
            </div>

            {/* Hashtags */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg">
              <span className="text-xs font-black text-sky-400 block border-b border-slate-800 pb-2.5 mb-2.5">
                الهاشتاجات الأكثر تصدراً للتريند (Viral Tags):
              </span>
              <div className="flex flex-wrap gap-1.5">
                {videoPackage.viralHashtags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs bg-slate-950 text-slate-200 border border-slate-800 px-2.5 py-1 rounded-lg font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-[11px] text-slate-400 mt-3 leading-relaxed">
                ضع هذه الهاشتاجات في وصف الفيديو وتيك توك للحصول على أقصى معدل تدفق مشاهدات.
              </p>
            </div>
          </div>

          {/* Official YouTube Channel Direct Link Card */}
          <div className="bg-gradient-to-r from-red-950/40 via-slate-900 to-rose-950/40 border border-red-500/30 p-5 rounded-2xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-red-600/20 border border-red-500/40 flex items-center justify-center shrink-0">
                <Youtube className="w-7 h-7 text-red-500 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-red-400">قناة يوتيوب الرسمية للمنظومة</span>
                  <span className="text-[10px] bg-red-500/20 text-red-300 font-mono px-2 py-0.5 rounded-full border border-red-500/30">
                    @MAHERmm.qa1430
                  </span>
                </div>
                <h4 className="text-sm font-black text-slate-100 mt-0.5">
                  ارفع هذا الفيديو مباشرة على قناتك الرسمية على يوتيوب
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  رابط القناة المعتمد لرفع شورتس وفيديوهات الأطفال 3D وتفعيل خطة تحقيق الدخل.
                </p>
              </div>
            </div>

            <a
              href="https://www.youtube.com/@MAHERmm.qa1430"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-black text-xs px-5 py-3 rounded-xl shadow-lg shadow-red-600/30 flex items-center gap-2 transition-all shrink-0 self-stretch sm:self-auto justify-center"
            >
              <Youtube className="w-4 h-4 text-white" />
              <span>زيارة القناة ورفع الفيديو</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Quick Action to Navigate to Wallet */}
          {onNavigateToWallet && (
            <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl flex items-center justify-between">
              <span className="text-xs text-slate-300 font-bold">
                هل تريد متابعة سجل الرصيد وتوزيع الأرباح (60% / 25% / 15%)؟
              </span>
              <button
                onClick={onNavigateToWallet}
                className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all"
              >
                <Wallet className="w-3.5 h-3.5" />
                <span>فتح محفظة الأرباح الذكية</span>
              </button>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};
