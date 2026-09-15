import React, { useState } from 'react';
import { ProductItem } from '../types';
import { 
  Video, 
  Play, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Share2, 
  CheckCircle2, 
  MessageSquare, 
  Heart, 
  Bookmark, 
  Music,
  Clock,
  Flame,
  Copy,
  Check,
  ExternalLink
} from 'lucide-react';

interface TikTokStudioViewProps {
  products: ProductItem[];
}

export const TikTokStudioView: React.FC<TikTokStudioViewProps> = ({ products }) => {
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copiedScript, setCopiedScript] = useState(false);

  const scenarios = [
    {
      id: 'mic-test',
      title: '🎙️ اختبار المايك الحقيقي: الصدمة بين الموبايل والمايك!',
      productName: 'ميكروفون PULUZ اللاسلكي',
      targetDuration: '15 ثانية',
      viralHook: 'اسمع الفرق بنفسك قبل ما تشتري!',
      scenes: [
        { time: '0:00 - 0:03', visual: 'تتكلم في الشارع أو أمام مروحة بصوت الموبايل السيء المشوش', audio: 'ده صوت الموبايل العادي وسط الزحمة والهواء...' },
        { time: '0:03 - 0:08', visual: 'تركب مايك PULUZ الصغير على قميصك بلمسة واحدة سريعة', audio: 'وده نفس المكان بعد ما شغلت مايك PULUZ اللاسلكي! نقاء استوديو حقيقي.' },
        { time: '0:08 - 0:15', visual: 'عرض العلبة والملحقات وزر التشغيل الفوري بدون برامج', audio: 'بطارية 8 ساعات وشغال على كل الموبايلات. الرابط بخصم حصري في أول تعليق والبايو!' }
      ],
      soundTrack: 'Trending Synth Beats 120BPM',
      hashtagBundle: '#مايك_لاسلكي #تصوير_احترافي #تيك_توك #ريلز #عزل_الصوت #PULUZ',
      imageUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'satin-luxury',
      title: '🧵 سحر الستان والدانتيل الياباني (الفخامة الملكية)',
      productName: 'الأقمشة والستان الياباني النخبوي',
      targetDuration: '12 ثانية',
      viralHook: 'أفخم خامة أقمشة ممكن تلمسها إيدك هذا الموسم!',
      scenes: [
        { time: '0:00 - 0:03', visual: 'حركة بطيئة Slow Motion لسقوط قماش الستان الياباني ولمعانه تحت الإضاءة', audio: 'لو بتدوري على قماش يفرق طلتك في أي مناسبة...' },
        { time: '0:03 - 0:08', visual: 'تكبير Macro على تفاصيل تطريز الدانتيل ونعومة الخيوط الذهبية', audio: 'ستان ودانتيل ياباني نخبوي أصلي، ملمس حريري ولا يتكسر.' },
        { time: '0:08 - 0:12', visual: 'عرض الألوان الملكية المتاحة', audio: 'التوصيل متاح الآن والكمية محدودة جداً، رابط الطلب بالبايو!' }
      ],
      soundTrack: 'Luxury Elegant Orchestral Strings',
      hashtagBundle: '#فساتين_سهرة #أقمشة_فاخرة #ستان_ياباني #خياطة_راقية #دانتيل',
      imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'scissors-sharp',
      title: '✂️ قوة وحدة مقص الفولاذ الكربوني (تقطيع 16 طبقة قماش)',
      productName: 'مقص الفولاذ الكربوني للتفصيل',
      targetDuration: '10 ثواني (ASMR)',
      viralHook: 'صوت القص لوحده إدمان! ASMR حقيقي',
      scenes: [
        { time: '0:00 - 0:04', visual: 'صوت قص سريع وحاد وممتع لعدة طبقات قماش سميكة دون أي مقاومة', audio: '(صوت قص نقي وممتع ASMR مع موسيقى هادئة)' },
        { time: '0:04 - 0:10', visual: 'إبراز الشفرة الليزرية والمقبض المريح لليد', audio: 'مقص فولاذ كربوني ألماني الموديل، حاد كالموس ومش هيتلم معاك أبداً. الرابط بالبايو!' }
      ],
      soundTrack: 'Pure ASMR Cutting Sound + Ambient Lofi',
      hashtagBundle: '#خياطة #تفصيل #مقص_احترافي #أدوات_خياطة #ASMR',
      imageUrl: 'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?auto=format&fit=crop&w=600&q=80'
    }
  ];

  const current = scenarios[selectedScenarioIndex];

  const handleCopyScript = () => {
    const text = `🎬 ${current.title}\n\n⚡ الهوك: "${current.viralHook}"\n\n📝 السكريبت:\n` +
      current.scenes.map(s => `${s.time} - [بصرياً: ${s.visual}] -> (صوتياً: ${s.audio})`).join('\n') +
      `\n\n# الهاشتاجات:\n${current.hashtagBundle}`;
    navigator.clipboard.writeText(text);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-pink-950/40 via-slate-900 to-slate-900 border border-pink-500/30 p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs text-pink-400 font-semibold mb-1">
            <Video className="w-3.5 h-3.5" />
            <span>عرض الفيديو السينمائي النخبوي وحساب تيك توك الرسمي</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-100">
            استوديو الفيديوهات الفيروسية لتيك توك وريلز
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            تحويل المشاهدات إلى مبيعات فورية لحساب <strong className="text-pink-300 font-mono">@maher.mmqao</strong> بالربط مع روابط إحالة علي إكسبريس
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
          <a
            href="https://www.tiktok.com/@maher.mmqao"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-black text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-pink-600/25 transition-all hover:scale-105"
            title="فتح حساب تيك توك الرسمي"
          >
            <Video className="w-4 h-4" />
            <span>فتح حساب تيك توك @maher.mmqao</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={handleCopyScript}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-4 py-2.5 rounded-xl text-xs font-bold transition-all"
          >
            {copiedScript ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-amber-400" />}
            <span>{copiedScript ? 'تم النسخ!' : 'نسخ السكريبت'}</span>
          </button>
        </div>
      </div>

      {/* Scenario Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {scenarios.map((sc, idx) => (
          <button
            key={sc.id}
            onClick={() => setSelectedScenarioIndex(idx)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              selectedScenarioIndex === idx
                ? 'bg-gradient-to-r from-pink-600 to-red-600 text-white shadow-lg shadow-pink-600/20'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <span>{sc.title}</span>
          </button>
        ))}
      </div>

      {/* Main Studio View: Phone Mockup + Storyboard Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Phone Mockup (9:16 vertical video player preview) */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-72 sm:w-80 h-[520px] rounded-[36px] bg-slate-950 border-[6px] border-slate-800 shadow-2xl overflow-hidden flex flex-col justify-between">
            {/* Background Image / Video Mockup */}
            <div className="absolute inset-0 z-0">
              <img
                src={current.imageUrl}
                alt={current.title}
                className="w-full h-full object-cover opacity-60 filter brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90"></div>
            </div>

            {/* Top Phone Header */}
            <div className="relative z-10 p-4 flex items-center justify-between text-white text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold">مباشر • MAHER</span>
              </div>
              <span className="bg-red-600/80 px-2 py-0.5 rounded text-[10px] font-black">
                {current.targetDuration}
              </span>
            </div>

            {/* Center Floating Hook Badge */}
            <div className="relative z-10 px-4 text-center">
              <div className="inline-block bg-amber-500 text-slate-950 font-black text-xs px-3.5 py-1.5 rounded-full shadow-2xl border-2 border-white animate-bounce">
                "{current.viralHook}"
              </div>
            </div>

            {/* Right Action Icons (TikTok Style) */}
            <div className="absolute right-3 bottom-24 z-10 flex flex-col items-center gap-4 text-white">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-slate-900/60 backdrop-blur flex items-center justify-center">
                  <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                </div>
                <span className="text-[10px] font-bold mt-0.5">24.5K</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-slate-900/60 backdrop-blur flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <span className="text-[10px] font-bold mt-0.5">1,820</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-slate-900/60 backdrop-blur flex items-center justify-center">
                  <Bookmark className="w-5 h-5 text-amber-400 fill-amber-400" />
                </div>
                <span className="text-[10px] font-bold mt-0.5">4,310</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-slate-900/60 backdrop-blur flex items-center justify-center">
                  <Share2 className="w-5 h-5 text-white" />
                </div>
                <span className="text-[10px] font-bold mt-0.5">مشاركة</span>
              </div>
            </div>

            {/* Bottom Caption & Audio Bar */}
            <div className="relative z-10 p-4 space-y-2 text-white text-xs">
              <a
                href="https://www.tiktok.com/@maher.mmqao"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-pink-400 hover:text-pink-300 font-mono flex items-center gap-1.5 transition-colors"
              >
                <span>@maher.mmqao</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <p className="text-[11px] text-slate-200 line-clamp-2">
                {current.scenes[1].audio}
              </p>
              <div className="flex items-center gap-2 text-[10px] text-slate-300 bg-slate-900/50 backdrop-blur px-2.5 py-1 rounded-full w-fit">
                <Music className="w-3 h-3 text-pink-400" />
                <span>{current.soundTrack}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Storyboard Breakdown & Directions */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="space-y-0.5">
                <h3 className="text-base font-bold text-slate-100">{current.title}</h3>
                <span className="text-xs text-amber-400 font-semibold">{current.productName}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
                <Clock className="w-3.5 h-3.5 text-pink-400" />
                <span>المدة المثالية: {current.targetDuration}</span>
              </div>
            </div>

            {/* Scene-by-Scene Timeline */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-300 block">
                🎬 خطوات تصوير المشاهد ثانية بثانية:
              </span>

              {current.scenes.map((scene, idx) => (
                <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-pink-400 bg-pink-500/10 px-2 py-0.5 rounded border border-pink-500/20">
                      مشهد {idx + 1} ({scene.time})
                    </span>
                  </div>

                  <div className="text-xs space-y-1">
                    <div className="text-slate-300">
                      <strong className="text-slate-400">الكاميرا تصور: </strong>
                      <span>{scene.visual}</span>
                    </div>
                    <div className="text-amber-200 font-medium">
                      <strong className="text-amber-400">الكلام المنطوق: </strong>
                      <span>"{scene.audio}"</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Best Practice Tips */}
            <div className="bg-amber-500/10 border border-amber-500/30 p-3.5 rounded-xl space-y-1.5 text-xs">
              <div className="flex items-center gap-1.5 text-amber-300 font-bold">
                <Flame className="w-4 h-4 text-amber-400" />
                <span>أسرار تيك توك الذهبية لعام 2024 - 2026:</span>
              </div>
              <ul className="text-slate-300 space-y-1 list-disc list-inside text-[11px] leading-relaxed">
                <li>لا تقل "مرحباً بكم" أو مقدمات طويلة؛ ادخل في المشكلة والصدمة فوراً في أول ثانيتين.</li>
                <li>ضع رابط المنتج في البايو واكتب في أول تعليق مثبت: "رابط المايك مع الخصم موجود في البايو فوق ☝️".</li>
                <li>استخدم أصوات التريند الرائجة في تيك توك مع خفض صوتها بنسبة 10% ليكون صوتك واضحاً ومسموعاً.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
