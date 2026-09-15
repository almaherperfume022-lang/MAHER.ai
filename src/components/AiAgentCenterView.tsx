import React, { useState } from 'react';
import { ProductItem } from '../types';
import { liveAudio } from '../services/liveAudio';
import { 
  Bot, 
  Sparkles, 
  Play, 
  Square, 
  Volume2, 
  VolumeX, 
  Copy, 
  Check, 
  ShieldCheck, 
  TrendingUp, 
  Video, 
  ShoppingBag, 
  Zap, 
  Send, 
  CheckCircle2, 
  Cpu, 
  Clock, 
  ArrowRight,
  RefreshCw,
  Crown,
  Layers,
  FileCheck,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AiAgentCenterViewProps {
  products: ProductItem[];
  onSelectProduct?: (product: ProductItem) => void;
  onNavigateToCharter?: () => void;
}

export const AiAgentCenterView: React.FC<AiAgentCenterViewProps> = ({ products, onNavigateToCharter }) => {
  const [selectedProduct, setSelectedProduct] = useState<ProductItem>(products[0]);
  const [activeSubAgent, setActiveSubAgent] = useState<'analyst' | 'creative' | 'ecommerce' | 'concierge' | 'security'>('creative');
  const [customPrompt, setCustomPrompt] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionStep, setExecutionStep] = useState<number>(0);
  const [agentOutput, setAgentOutput] = useState<string>(`بصفتي الوكيل الاصطناعي التنفيذي لشركة MAHER تحت بروتوكول Code Ambis 4.6:

لقد تم بنجاح إطلاق أول فيديو ترويجي لميكروفون PULUZ اللاسلكي على تيك توك وتثبيت رابط الخصم المعتمد في أول تعليق.

الخطوات التكتيكية الموصى بها للأربع والعشرين ساعة القادمة:
1. مراقبة حركة المشاهدات والتفاعل على الفيديو في أول ساعتين لدعم الخوارزميات.
2. توجيه متابعي الواتساب لمشاهدة الفيديو ووضع إعجاب، لرفع رتبة الفيديو إلى قسم For You Page (FYP).
3. الاستعداد لتجهيز فيديو المنتج الرابح الثاني (الأقمشة الستان الفاخرة أو مقص الفولاذ) للحفاظ على وتيرة الانتشار.`);

  const [thoughtSteps, setThoughtSteps] = useState<string[]>([
    'استيعاب أهداف المالك السيد ماهر غالب نحو مبيعات 2026',
    'استدعاء بيانات متجر النخبة وروابط إحالة علي إكسبريس النشطة',
    'تطبيق استراتيجية الانتشار الفيروسي وتأمين الروابط التتبعية',
    'صياغة التقرير التنفيذي المباشر للتطبيق'
  ]);

  const [audioBase64, setAudioBase64] = useState<string | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [enableVoice, setEnableVoice] = useState(true);
  const [copied, setCopied] = useState(false);

  // Sub-agents descriptions aligned with Google Cloud 2026 Report
  const subAgentsList = [
    {
      id: 'analyst',
      name: 'وكيل تحليل السوق والبيانات',
      role: 'Market & Trends Agent',
      desc: 'يراقب المنتجات الأسرع رواجاً وهامش الربح على علي إكسبريس وتيك توك شوب 2026.',
      icon: <TrendingUp className="w-5 h-5 text-sky-400" />,
      color: 'from-sky-500/20 to-blue-500/10 border-sky-500/30 text-sky-300'
    },
    {
      id: 'creative',
      name: 'وكيل صناعة المحتوى والإبداع',
      role: 'Creative & Viral Agent',
      desc: 'يولد سكريبتات 5 ثوانٍ، وهوكات تيك توك، وبرومبتات الفيديو (عربي وإنجليزي).',
      icon: <Video className="w-5 h-5 text-pink-400" />,
      color: 'from-pink-500/20 to-rose-500/10 border-pink-500/30 text-pink-300'
    },
    {
      id: 'ecommerce',
      name: 'وكيل التجارة والأسعار',
      role: 'eCommerce & Pricing Agent',
      desc: 'يحسب العمولات وهوامش الربح ويقترح حزم العروض المزدوجة (Cross-selling).',
      icon: <ShoppingBag className="w-5 h-5 text-amber-400" />,
      color: 'from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-300'
    },
    {
      id: 'concierge',
      name: 'وكيل خدمة العملاء الذكي',
      role: 'Customer Concierge Agent',
      desc: 'يصيغ ردوداً مقنعة للمشترين والمترددين لتحويل استفسارهم إلى عملية شراء فورية.',
      icon: <Zap className="w-5 h-5 text-emerald-400" />,
      color: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-300'
    },
    {
      id: 'security',
      name: 'وكيل الحماية وتدقيق الروابط',
      role: 'Security & Link Audit Agent',
      desc: 'يفحص روابط الإحالة وتتبع العمولات وفق بروتوكول مدفوعات الوكلاء (Google AP2).',
      icon: <ShieldCheck className="w-5 h-5 text-purple-400" />,
      color: 'from-purple-500/20 to-indigo-500/10 border-purple-500/30 text-purple-300'
    }
  ];

  // Execute Agent Mission
  const handleExecuteMission = async (
    actionType: 'market_trends' | 'tiktok_content_package' | 'link_audit' | 'growth_strategy' | 'custom',
    customText?: string
  ) => {
    if (isExecuting) return;
    setIsExecuting(true);
    setExecutionStep(1);
    setAudioBase64(null);
    liveAudio.stop();
    setIsPlayingAudio(false);

    // Simulate animated step progression while backend processes
    const timer1 = setTimeout(() => setExecutionStep(2), 700);
    const timer2 = setTimeout(() => setExecutionStep(3), 1500);

    try {
      const res = await fetch('/api/agent-action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          actionType,
          prompt: customText || customPrompt,
          subAgent: activeSubAgent,
          productContext: selectedProduct,
          generateVoice: enableVoice,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setExecutionStep(4);
        setAgentOutput(data.outputText);
        if (data.thoughtSteps) {
          setThoughtSteps(data.thoughtSteps);
        }
        if (data.audioBase64) {
          setAudioBase64(data.audioBase64);
          // Auto-play voice if enabled
          if (enableVoice) {
            playVoice(data.audioBase64);
          }
        }
        if (customText) {
          setCustomPrompt('');
        }
      } else {
        setAgentOutput(data.error || 'حدث خطأ أثناء تشغيل الوكيل الاصطناعي.');
      }
    } catch (err: any) {
      console.error('Agent execution error:', err);
      setAgentOutput('تعذر الاتصال بالخادم. يرجى المحاولة مرة أخرى.');
    } finally {
      clearTimeout(timer1);
      clearTimeout(timer2);
      setIsExecuting(false);
    }
  };

  const playVoice = async (base64Data?: string | null) => {
    const data = base64Data || audioBase64;
    if (!data) return;

    if (isPlayingAudio) {
      liveAudio.stop();
      setIsPlayingAudio(false);
      return;
    }

    try {
      setIsPlayingAudio(true);
      await liveAudio.playBase64Pcm(data, 24000);
    } catch (err) {
      console.warn('PCM playback failed:', err);
    } finally {
      setIsPlayingAudio(false);
    }
  };

  const handleCopyOutput = () => {
    navigator.clipboard.writeText(agentOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Identity Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950/40 to-slate-900 border border-amber-500/30 p-6 rounded-2xl shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-600 to-red-600 p-0.5 shadow-lg shadow-amber-500/20 flex items-center justify-center">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                  <Bot className="w-8 h-8 text-amber-400 animate-pulse" />
                </div>
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-slate-950"></span>
              </span>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 text-xs text-amber-400 font-bold mb-1">
                <Crown className="w-3.5 h-3.5 text-amber-400" />
                <span>الوكيل الاصطناعي التنفيذي (MAHER Agent 2026)</span>
                <span className="text-slate-600">•</span>
                <span className="text-emerald-400 font-mono">Google Cloud Agent Framework</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-100">
                منظومة الوكلاء المستقلين لقيادة المبيعات والأرباح
              </h2>
              <p className="text-xs text-slate-300 mt-1 max-w-2xl">
                تنفيذ المهام الاستراتيجية والتسويقية نيابة عن المالك <strong>السيد ماهر غالب سعد حسن</strong> تحت مظلة بروتوكول Code Ambis 4.6 نحو هدف المليار 2030/6/6.
              </p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3 bg-slate-950/80 border border-slate-800 px-4 py-2.5 rounded-xl self-stretch md:self-auto justify-between md:justify-start">
            <div className="text-center">
              <span className="text-[10px] text-slate-400 block font-bold">حالة النظام</span>
              <span className="text-xs text-emerald-400 font-black flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                نشط ومتصل
              </span>
            </div>
            <div className="h-6 w-px bg-slate-800"></div>
            <div className="text-center">
              <span className="text-[10px] text-slate-400 block font-bold">سرعة التنفيذ</span>
              <span className="text-xs text-amber-300 font-mono font-bold">~0.4s</span>
            </div>
            <div className="h-6 w-px bg-slate-800"></div>
            <div className="text-center">
              <span className="text-[10px] text-slate-400 block font-bold">بروتوكول الوكيل</span>
              <span className="text-xs text-sky-400 font-mono font-bold">A2A / AP2</span>
            </div>
            {onNavigateToCharter && (
              <>
                <div className="h-6 w-px bg-slate-800"></div>
                <button
                  onClick={onNavigateToCharter}
                  className="bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-black px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>وثيقة MAHER.ai المحكمة 📜</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 5 Specialized Sub-Agents Digital Assembly Line (Google Cloud 2026 Trend) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-black text-slate-200">
              خط التجميع الرقمي للوكلاء التخصصيين (Digital Assembly Line)
            </h3>
          </div>
          <span className="text-[11px] text-slate-400">
            اختر وكيل التخصص أو أطلق مهمة فورية
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {subAgentsList.map((agent) => (
            <div
              key={agent.id}
              onClick={() => setActiveSubAgent(agent.id as any)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer bg-slate-900/90 relative overflow-hidden ${
                activeSubAgent === agent.id
                  ? `border-amber-500 shadow-lg shadow-amber-500/10 ring-1 ring-amber-500/50`
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 rounded-lg bg-slate-950/80 border border-slate-800">
                  {agent.icon}
                </div>
                {activeSubAgent === agent.id && (
                  <span className="text-[10px] font-bold bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/30">
                    محدد
                  </span>
                )}
              </div>
              <h4 className="text-xs font-black text-slate-100 mb-0.5">{agent.name}</h4>
              <span className="text-[10px] font-mono text-slate-400 block mb-1.5">{agent.role}</span>
              <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2">{agent.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Product In Context Bar */}
      <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-slate-300">
          <ShoppingBag className="w-4 h-4 text-amber-400" />
          <span className="font-bold">المنتج المستهدف حالياً في ذاكرة الوكيل:</span>
          <span className="bg-amber-500/20 text-amber-300 px-2.5 py-1 rounded-lg font-black border border-amber-500/30">
            {selectedProduct.title} ({selectedProduct.price}$)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">تغيير المنتج:</span>
          <select
            value={selectedProduct.id}
            onChange={(e) => {
              const p = products.find((prod) => prod.id === e.target.value);
              if (p) setSelectedProduct(p);
            }}
            className="bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:border-amber-500 font-bold"
          >
            {products.map((prod) => (
              <option key={prod.id} value={prod.id}>
                {prod.title} - عمولة {prod.commissionRate}%
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* One-Click Autonomous Missions Bar */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <h3 className="text-sm font-black text-slate-200">
            مهام قيادية جاهزة للتنفيذ بضغطة زر (Autonomous Missions)
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <button
            onClick={() => handleExecuteMission('market_trends')}
            disabled={isExecuting}
            className="bg-slate-900 hover:bg-slate-800 border border-sky-500/30 hover:border-sky-400 p-3.5 rounded-xl text-right transition-all group disabled:opacity-50"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-black text-sky-400 group-hover:text-sky-300">
                📊 اقتناص اتجاهات السوق 2026
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-sky-400 group-hover:translate-x-[-2px] transition-transform" />
            </div>
            <p className="text-[11px] text-slate-400">
              فحص أفضل 3 منتجات استهلاكية رابحة ومعدلات العمولات الآن.
            </p>
          </button>

          <button
            onClick={() => handleExecuteMission('tiktok_content_package')}
            disabled={isExecuting}
            className="bg-slate-900 hover:bg-slate-800 border border-pink-500/30 hover:border-pink-400 p-3.5 rounded-xl text-right transition-all group disabled:opacity-50"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-black text-pink-400 group-hover:text-pink-300">
                🎬 حزمة تيك توك الفيروسية
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-pink-400 group-hover:translate-x-[-2px] transition-transform" />
            </div>
            <p className="text-[11px] text-slate-400">
              توليد هوك 3 ثوانٍ وسكريبت وبرومبتات فيديو سينمائي 4K للمنتج.
            </p>
          </button>

          <button
            onClick={() => handleExecuteMission('link_audit')}
            disabled={isExecuting}
            className="bg-slate-900 hover:bg-slate-800 border border-purple-500/30 hover:border-purple-400 p-3.5 rounded-xl text-right transition-all group disabled:opacity-50"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-black text-purple-400 group-hover:text-purple-300">
                🛡️ تدقيق أمان رابط الإحالة
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-purple-400 group-hover:translate-x-[-2px] transition-transform" />
            </div>
            <p className="text-[11px] text-slate-400">
              فحص معرّف التتبع وتجنب حظر الروابط في منصات النشر.
            </p>
          </button>

          <button
            onClick={() => handleExecuteMission('growth_strategy')}
            disabled={isExecuting}
            className="bg-slate-900 hover:bg-slate-800 border border-amber-500/30 hover:border-amber-400 p-3.5 rounded-xl text-right transition-all group disabled:opacity-50"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-black text-amber-400 group-hover:text-amber-300">
                📈 خطة المبيعات الأسبوعية
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-[-2px] transition-transform" />
            </div>
            <p className="text-[11px] text-slate-400">
              جدول زمني تنفيذي لتحقيق أول 50 مبيعة مؤكدة خطوة بخطوة.
            </p>
          </button>
        </div>
      </div>

      {/* Main Agent Terminal & Direct Interactive Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left/Main Column: Output Terminal & Thought Steps */}
        <div className="lg:col-span-8 space-y-4">
          {/* Progress / Thought Chain (Visible when executing or after) */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-amber-400" />
                <h4 className="text-xs font-black text-slate-200">
                  سلسلة تفكير واستدعاء الأدوات للوكيل (Agent Thought Process & Reasoning)
                </h4>
              </div>
              <div className="flex items-center gap-2">
                {audioBase64 && (
                  <button
                    onClick={() => playVoice()}
                    className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl border transition-all ${
                      isPlayingAudio
                        ? 'bg-red-500/20 border-red-500/40 text-red-300 animate-pulse'
                        : 'bg-amber-500/20 border-amber-500/40 text-amber-300 hover:bg-amber-500/30'
                    }`}
                  >
                    {isPlayingAudio ? <Square className="w-3.5 h-3.5 fill-red-400" /> : <Volume2 className="w-3.5 h-3.5" />}
                    <span>{isPlayingAudio ? 'إيقاف الصوت' : 'استماع لصوت الوكيل'}</span>
                  </button>
                )}

                <button
                  onClick={handleCopyOutput}
                  className="flex items-center gap-1.5 text-xs text-slate-300 bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-xl border border-slate-700 transition-all font-bold"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'تم النسخ' : 'نسخ التقرير'}</span>
                </button>
              </div>
            </div>

            {/* Steps Visualizer */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 mb-4">
              {thoughtSteps.map((step, idx) => (
                <div
                  key={idx}
                  className={`p-2.5 rounded-xl border text-[11px] leading-snug transition-all ${
                    isExecuting && executionStep === idx + 1
                      ? 'bg-amber-500/20 border-amber-400 text-amber-200 animate-pulse font-bold'
                      : !isExecuting || executionStep > idx + 1
                      ? 'bg-slate-950/60 border-slate-800 text-slate-300'
                      : 'bg-slate-950/30 border-slate-800/40 text-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="w-4 h-4 rounded-full bg-slate-800 text-[9px] flex items-center justify-center font-mono font-bold text-amber-400">
                      {idx + 1}
                    </span>
                    <span className="font-bold text-[10px] text-slate-400">
                      {idx === 0 ? 'الهدف' : idx === 1 ? 'السياق' : idx === 2 ? 'الأدوات' : 'التسليم'}
                    </span>
                  </div>
                  <span>{step}</span>
                </div>
              ))}
            </div>

            {/* Output Display Terminal */}
            <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 font-sans relative overflow-hidden">
              <div className="flex items-center justify-between text-[11px] text-slate-500 border-b border-slate-800 pb-2 mb-3">
                <span>المخرجات التنفيذية الجاهزة للتطبيق</span>
                <span className="font-mono text-emerald-400">Status: Completed</span>
              </div>
              <div className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line select-text">
                {agentOutput}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Custom Command Input & Google Cloud 2026 Insights */}
        <div className="lg:col-span-4 space-y-4">
          {/* Direct Command Input Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="w-4 h-4 text-amber-400" />
                <h4 className="text-xs font-black text-slate-200">
                  إصدار أمر تنفيذي مباشر للوكيل
                </h4>
              </div>
              <label className="flex items-center gap-1.5 text-[11px] text-slate-300 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={enableVoice}
                  onChange={(e) => setEnableVoice(e.target.checked)}
                  className="rounded border-slate-700 text-amber-500 focus:ring-amber-500"
                />
                <span>صوت الذكاء الاصطناعي</span>
              </label>
            </div>

            <p className="text-[11px] text-slate-400 leading-normal">
              وجّه أي طلب بيعي أو تسويقي أو تحليلي للوكيل، وسيقوم بتحليله وتنفيذه فوراً وفق صلاحياته الممنوحة:
            </p>

            <div className="space-y-2">
              <textarea
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="مثال: جهز لي نص رسالة واتساب حصرية للعملاء لشراء مايك PULUZ مع هدية إضافية..."
                rows={4}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-all resize-none"
              />

              <button
                onClick={() => handleExecuteMission('custom')}
                disabled={isExecuting || !customPrompt.trim()}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all disabled:opacity-50"
              >
                {isExecuting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                    <span>الوكيل ينفذ المهمة الآن...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>إرسال وتفويض الأمر للوكيل 🚀</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Google Cloud 2026 Shift Card */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
            <div className="flex items-center gap-2 text-sky-400 text-xs font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>مرتكزات وكلاء 2026 (Google Cloud Report)</span>
            </div>
            <blockquote className="text-[11px] text-slate-300 italic border-r-2 border-amber-500 pr-3 leading-relaxed">
              "الوكلاء أنظمة تجمع بين ذكاء النماذج المتقدمة والوصول للأدوات لتنفيذ الإجراءات نيابة عنك وتحت إشرافك."
              <footer className="text-[10px] text-slate-400 not-italic mt-1 font-bold">
                — ساندر بيتشاي، الرئيس التنفيذي لـ Google
              </footer>
            </blockquote>

            <div className="space-y-2 pt-1 text-[11px] text-slate-400">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>إشراف بشري استراتيجي:</strong> دور المالك هو وضع الأهداف والتحقق، بينما ينفذ الوكيل المهام الروتينية.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>ربط بالسياق الحقيقي (Grounding):</strong> الوكيل متصل ببيانات المتجر والروابط الخاصة بك.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>بروتوكول A2A & AP2:</strong> جاهزية للتعامل مع أنظمة الشراء الذاتي للوكلاء القادمة في 2026.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
