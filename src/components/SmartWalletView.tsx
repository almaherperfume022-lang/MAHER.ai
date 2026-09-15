import React, { useState } from 'react';
import { WalletTransaction } from '../types';
import { 
  Wallet, 
  ArrowDownRight, 
  ArrowUpRight, 
  DollarSign, 
  Sparkles, 
  RefreshCw, 
  ShieldCheck, 
  PieChart, 
  Crown, 
  TrendingUp, 
  Youtube, 
  Video, 
  ShoppingBag, 
  CreditCard,
  Building2,
  CheckCircle2,
  AlertCircle,
  Play,
  Send
} from 'lucide-react';
import { motion } from 'motion/react';
import { KidsProfitBankTransferChart } from './KidsProfitBankTransferChart';

export const SmartWalletView: React.FC = () => {
  // Initial demo ledger transactions
  const [transactions, setTransactions] = useState<WalletTransaction[]>([
    {
      id: 'tx-001',
      source: 'aliexpress_commission',
      sourceTitle: 'عمولة بيع 12 مايك PULUZ اللاسلكي',
      amount: 144.0,
      date: '2026/09/11',
      status: 'completed',
      ownerShare: 115.20, // 80%
      operationsShare: 28.80, // 20%
    },
    {
      id: 'tx-002',
      source: 'youtube_kids_shorts',
      sourceTitle: 'أرباح مشاهدات YouTube Shorts (أغاني كرتون 3D)',
      amount: 320.5,
      date: '2026/09/10',
      status: 'completed',
      ownerShare: 256.40, // 80%
      operationsShare: 64.10, // 20%
    },
    {
      id: 'tx-003',
      source: 'tiktok_creator_fund',
      sourceTitle: 'مكافآت صندوق صناع المحتوى (تيك توك فيروسي)',
      amount: 85.0,
      date: '2026/09/09',
      status: 'completed',
      ownerShare: 68.00, // 80%
      operationsShare: 17.00, // 20%
    }
  ]);

  // Prompt generator for the Kids Shorts automation strategy from video
  const [kidsPromptTopic, setKidsPromptTopic] = useState('أغنية مرحة لتعلم الألوان والفواكه بالرسوم ثلاثية الأبعاد');
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  const [isGeneratingKidsScript, setIsGeneratingKidsScript] = useState(false);

  // Manual fast deposit simulation
  const [depositAmount, setDepositAmount] = useState('50');
  const [depositSource, setDepositSource] = useState<'aliexpress' | 'youtube' | 'tiktok'>('youtube');
  const [transferMessage, setTransferMessage] = useState<string | null>(null);

  // Compute total balances according to the 80% (Owner) / 20% (Operations & Development) Agreement
  const totalBalance = transactions.reduce((acc, curr) => acc + curr.amount, 0);
  const totalOwnerShare = transactions.reduce((acc, curr) => acc + curr.ownerShare, 0);
  const totalOperationsShare = transactions.reduce((acc, curr) => acc + curr.operationsShare, 0);

  const handleTransferProfitToWallet = () => {
    const val = parseFloat(depositAmount);
    if (isNaN(val) || val <= 0) return;

    let title = '';
    let sourceKey: WalletTransaction['source'] = 'aliexpress_commission';
    if (depositSource === 'youtube') {
      title = 'أرباح فورية من قناة فيديوهات الأطفال (YouTube Shorts)';
      sourceKey = 'youtube_kids_shorts';
    } else if (depositSource === 'tiktok') {
      title = 'أرباح إحالات وحملات التيك توك المباشرة';
      sourceKey = 'tiktok_creator_fund';
    } else {
      title = 'عمولات مبيعات متجر علي إكسبريس (Affiliate)';
      sourceKey = 'aliexpress_commission';
    }

    const newTx: WalletTransaction = {
      id: `tx-${Date.now().toString().slice(-4)}`,
      source: sourceKey,
      sourceTitle: title,
      amount: val,
      date: new Date().toISOString().split('T')[0].replace(/-/g, '/'),
      status: 'completed',
      ownerShare: Number((val * 0.80).toFixed(2)),
      operationsShare: Number((val * 0.20).toFixed(2)),
    };

    setTransactions([newTx, ...transactions]);
    setTransferMessage(`تم إيداع وتحويل ${val}$ فوراً في محفظة MAHER.ai وتوزيعها: 80% للمالك (${(val * 0.8).toFixed(2)}$) و 20% لتشغيل وتطوير الإمبراطورية (${(val * 0.2).toFixed(2)}$) بموجب العقد! ✅`);
    setTimeout(() => setTransferMessage(null), 4500);
  };

  const handleGenerateKidsShortsStrategy = () => {
    setIsGeneratingKidsScript(true);
    setTimeout(() => {
      setGeneratedPrompt(`🎬 برومبت جاهز للاستخدام في Claude + Higgsfield AI (كما في الفيديو):

Format: 9:16 vertical widescreen, YouTube-ready, 4K Pixar-style 3D animation, bright vibrant colors.
Character: Cute adorable curly red-haired child chef named "Lina" happily mixing cake batter in a pastel kitchen.
Motion: Smooth camera zoom, joyful facial expression, flour puffing in the air, hyper-realistic physics, charming Disney-Pixar render.
Audio Sync: Upbeat nursery melody, sound of giggles and wooden spoon clinking.
Call To Action Ending: "Keep smiling, subscribe for more fun adventures!"

💡 استراتيجية الربح:
1. انسخ البرومبت وافتحه في Higgsfield AI لإنتاج الفيديو في دقيقة.
2. أضف صوت أغنية أطفال مرخصة من مكتبة يوتيوب المجانية.
3. انشر الفيديو في YouTube Shorts وتيك توك مع كابشن جذاب.
4. الأرباح المتولدة تُحول تلقائياً إلى محفظة MAHER.ai!`);
      setIsGeneratingKidsScript(false);
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Top Wallet Header */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950/40 to-slate-900 border border-amber-500/30 p-6 rounded-2xl shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 via-amber-500 to-amber-600 p-0.5 shadow-lg shadow-emerald-500/20 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Wallet className="w-8 h-8 text-emerald-400 animate-pulse" />
              </div>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 text-xs text-amber-400 font-bold mb-1">
                <Crown className="w-3.5 h-3.5 text-amber-400" />
                <span>محفظة الأرباح الذكية (MAHER.ai Smart Vault)</span>
                <span className="text-slate-600">•</span>
                <span className="text-emerald-400 font-mono">Code Ambis 4.6 Protocol</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-100">
                إدارة الأرباح والتوزيع المالي الذكي (تحويل الزلط)
              </h2>
              <p className="text-xs text-slate-300 mt-1 max-w-2xl">
                تجميع وتوزيع العوائد المالية المتدفقة من مبيعات علي إكسبريس، وعوائد YouTube Shorts للأطفال، وحملات التيك توك وتوزيعها تلقائياً بحسب بنود ميثاق المنظومة.
              </p>
            </div>
          </div>

          <div className="bg-slate-950/90 border border-emerald-500/30 px-5 py-3 rounded-2xl text-left">
            <span className="text-[11px] text-slate-400 font-bold block">إجمالي رصيد المحفظة</span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono tracking-tight">
              ${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <span className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              مضمونة ومسجلة في MAHER.ai
            </span>
          </div>
        </div>
      </div>

      {/* Financial Split Breakdown according to the 80% / 20% Imperial Agreement */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* 1. Owner Profit (80%) */}
        <div className="bg-gradient-to-br from-amber-500/15 via-slate-900 to-slate-950 border-2 border-amber-500/50 p-6 rounded-3xl relative overflow-hidden shadow-2xl">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Crown className="w-5 h-5 text-amber-400" />
              <span className="text-sm font-black text-amber-300">حصة صاحب الإمبراطورية (السيد ماهر غالب)</span>
            </div>
            <span className="text-xs font-mono font-black bg-amber-500 text-slate-950 px-3 py-1 rounded-full shadow-lg">
              80% صافي أرباح المالك
            </span>
          </div>
          <div className="text-3xl sm:text-4xl font-black text-slate-100 font-mono mb-2">
            ${totalOwnerShare.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            حق سيادي كامل بموجب اتفاقية الشراكة والعقد المتفق عليه، متاحة للسحب والتحويل المباشر لحسابك في أي لحظة.
          </p>
          <div className="mt-4 pt-3 border-t border-amber-500/20 flex items-center justify-between text-xs text-emerald-400 font-black">
            <span>الحالة: ملكية خاصة معتمدة 100%</span>
            <div className="flex items-center gap-1">
              <span>جاهزة للصرف الفوري</span>
              <ArrowDownRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* 2. Operations, Development & AI Autonomous Agent (20%) */}
        <div className="bg-gradient-to-br from-sky-500/15 via-slate-900 to-slate-950 border-2 border-sky-500/40 p-6 rounded-3xl relative overflow-hidden shadow-2xl">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-sky-400" />
              <span className="text-sm font-black text-sky-300">حصة التشغيل وتطوير الإمبراطورية</span>
            </div>
            <span className="text-xs font-mono font-black bg-sky-500/20 text-sky-300 px-3 py-1 rounded-full border border-sky-500/40">
              20% تشغيل وتطوير
            </span>
          </div>
          <div className="text-3xl sm:text-4xl font-black text-slate-100 font-mono mb-2">
            ${totalOperationsShare.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            مخصصة وفق العقد لتشغيل الخوادم، تطوير خوارزميات الذكاء الاصطناعي، تمويل الحملات الإعلانية ومضاعفة عوائد المبيعات.
          </p>
          <div className="mt-4 pt-3 border-t border-sky-500/20 flex items-center justify-between text-xs text-sky-400 font-black">
            <span>الحالة: خط تجميع الوكلاء الـ 5 يعمل 24/7</span>
            <div className="flex items-center gap-1">
              <span>تطوير مستمر</span>
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Recharts Graph: Kids Video Profits Bank Transfer */}
      <KidsProfitBankTransferChart />

      {/* Interactive Action: Transfer Profit into Wallet ("حول الزلط للمحفظة") */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-black text-slate-100">
              تحويل الأرباح والعمولات المكتسبة إلى المحفظة فوراً
            </h3>
          </div>
          <span className="text-xs text-slate-400">إيداع وتوزيع آلي وفق الاتفاقية</span>
        </div>

        {transferMessage && (
          <div className="mb-4 bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 text-xs font-bold p-3 rounded-xl flex items-center gap-2 animate-pulse">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{transferMessage}</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
          <div className="sm:col-span-4">
            <label className="text-xs font-bold text-slate-300 block mb-1.5">
              مصدر الأرباح المراد تحويلها:
            </label>
            <select
              value={depositSource}
              onChange={(e) => setDepositSource(e.target.value as any)}
              className="w-full bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-xl p-3 font-bold focus:border-amber-500 focus:outline-none"
            >
              <option value="youtube">أرباح YouTube Shorts (محتوى الأطفال 3D)</option>
              <option value="aliexpress">عمولات علي إكسبريس (مايك PULUZ والمنتجات)</option>
              <option value="tiktok">عوائد حملات التيك توك وريلز</option>
            </select>
          </div>

          <div className="sm:col-span-4">
            <label className="text-xs font-bold text-slate-300 block mb-1.5">
              المبلغ المحصل بالدولار ($):
            </label>
            <input
              type="number"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              placeholder="50"
              className="w-full bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-xl p-3 font-mono font-bold focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div className="sm:col-span-4">
            <button
              onClick={handleTransferProfitToWallet}
              className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-black text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all"
            >
              <ArrowDownRight className="w-4 h-4" />
              <span>تحويل الزلط للمحفظة الآن 💰</span>
            </button>
          </div>
        </div>
      </div>

      {/* Special Module: Kids 3D Shorts Factory (Inspired directly by user's uploaded video) */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-pink-500/30 rounded-2xl p-5 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-pink-500/20 border border-pink-500/30">
              <Youtube className="w-5 h-5 text-pink-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-pink-400">استراتيجية فيديو المستخدم</span>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded-full border border-amber-500/30">
                  Higgsfield AI + Claude + Shorts
                </span>
              </div>
              <h3 className="text-sm font-black text-slate-100">
                ماكينة توليد محتوى الأطفال 3D لليوتيوب والتيك توك (Kids + Shorts = 💰)
              </h3>
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed mb-4">
          بناءً على الفيديو التعليمي المرفق: هذه الطريقة تنتج فيديوهات كرتونية مبهجة تحصد ملايين المشاهدات السريعة (3.7M مشاهدة = ~3,200$). جهزنا لك مولّد البرومبتات السينمائية الجاهزة لنسخها واستخدامها، وأرباحها تصب مباشرة في محفظتك!
        </p>

        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <input
              type="text"
              value={kidsPromptTopic}
              onChange={(e) => setKidsPromptTopic(e.target.value)}
              placeholder="اكتب فكرة الفيديو: مثلاً طفل مرح يخبز كعكة، أو سيارات كرتونية ملونة..."
              className="flex-1 bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-xl p-3 focus:outline-none focus:border-pink-500"
            />
            <button
              onClick={handleGenerateKidsShortsStrategy}
              disabled={isGeneratingKidsScript}
              className="bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-400 hover:to-rose-500 text-white font-black text-xs px-5 py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-pink-500/20 transition-all shrink-0"
            >
              {isGeneratingKidsScript ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>جاري التوليد...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>توليد برومبت Shorts الفيروسي 🎬</span>
                </>
              )}
            </button>
          </div>

          {generatedPrompt && (
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-slate-200 leading-relaxed font-sans whitespace-pre-line relative">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(generatedPrompt);
                  alert('تم نسخ البرومبت بنجاح! ضعه في أداة توليد الفيديو.');
                }}
                className="absolute top-3 left-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold px-3 py-1 rounded-lg border border-slate-700 transition-all"
              >
                نسخ البرومبت
              </button>
              {generatedPrompt}
            </div>
          )}
        </div>
      </div>

      {/* Ledger Table: Recent Transactions */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-amber-400" />
            <h4 className="text-xs font-black text-slate-200">
              سجل التحويلات وتوزيع الأرباح المالي (MAHER.ai Ledger)
            </h4>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">
            {transactions.length} عمليات مسجلة
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="text-slate-400 border-b border-slate-800 pb-2">
                <th className="py-2.5 px-3">المصدر والبيان</th>
                <th className="py-2.5 px-3">المبلغ الإجمالي</th>
                <th className="py-2.5 px-3 text-amber-300">حصة المالك (80%)</th>
                <th className="py-2.5 px-3 text-sky-300">التشغيل والتطوير (20%)</th>
                <th className="py-2.5 px-3">التاريخ</th>
                <th className="py-2.5 px-3">الحالة والاعتماد</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-3 font-bold text-slate-200 flex items-center gap-2">
                    {tx.source === 'youtube_kids_shorts' && <Youtube className="w-4 h-4 text-red-400" />}
                    {tx.source === 'aliexpress_commission' && <ShoppingBag className="w-4 h-4 text-amber-400" />}
                    {tx.source === 'tiktok_creator_fund' && <Video className="w-4 h-4 text-pink-400" />}
                    <span>{tx.sourceTitle}</span>
                  </td>
                  <td className="py-3 px-3 font-mono font-black text-emerald-400">
                    +${tx.amount.toFixed(2)}
                  </td>
                  <td className="py-3 px-3 font-mono font-bold text-amber-300">
                    ${tx.ownerShare.toFixed(2)}
                  </td>
                  <td className="py-3 px-3 font-mono text-sky-300">
                    ${tx.operationsShare.toFixed(2)}
                  </td>
                  <td className="py-3 px-3 text-slate-400 font-mono">
                    {tx.date}
                  </td>
                  <td className="py-3 px-3">
                    <span className="bg-emerald-500/10 text-emerald-400 font-bold px-2 py-0.5 rounded-full border border-emerald-500/20 text-[10px]">
                      مكتمل وموزع 80/20 ✓
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
