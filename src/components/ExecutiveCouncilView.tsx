import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Send, 
  RefreshCw, 
  Award, 
  Sparkles, 
  Target, 
  Crown, 
  CheckCircle2,
  HelpCircle,
  MessageSquare
} from 'lucide-react';

export const ExecutiveCouncilView: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isConsulting, setIsConsulting] = useState(false);
  const [history, setHistory] = useState<{ query: string; response: string }[]>([
    {
      query: 'ما هي استراتيجيتنا لتسريع مبيعات ميكروفون PULUZ اللاسلكي؟',
      response: `بصفتنا الإدارة العامة لشركة MAHER تحت مظلة بروتوكول Code Ambis 4.6:

1. المحور البصري: المنتج يحل مشكلة ضخمة لصناع المحتوى وهي تشويش الهواء. الحل ليس مجرد كتابة إعلان، بل نشر فيديو مدته 10 ثوانٍ يوضح "مقارنة الصوت قبل وبعد تشغيل المايك". هذه المقارنة تحقق معدل نقر يتجاوز 8% في تيك توك وريلز.

2. توجيه الروابط: تم تثبيت رابط الإحالة الرسمي المعتمد (https://s.click.aliexpress.com/e/_c4EF0UiH). ضع الرابط دائماً في البايو أو في أول تعليق مثبت، مع توضيح أن السعر مخفض لفترة محدودة (14.80$).

3. حزمة المبيعات: كل مشتري لمايك الهواتف مهتم بحامل الإضاءة Ring Light، اقترح المنتج الثاني كمكمل لمضاعفة سلة المشتريات (Cross-selling).`
    }
  ]);

  const presetQueries = [
    'كيف نزيد مبيعات مايك PULUZ اللاسلكي هذا الأسبوع؟',
    'ما هي خارطة الطريق للوصول إلى هدف المليار في 2030/6/6؟',
    'كيف نتغلب على قيود النشر التلقائي في منصات السوشيال ميديا؟',
    'ما هي المنتجات الاستهلاكية الأسرع دوراناً في علي إكسبريس؟'
  ];

  const handleConsult = async (textToAsk?: string) => {
    const question = textToAsk || query;
    if (!question.trim() || isConsulting) return;

    setIsConsulting(true);
    try {
      const res = await fetch('/api/executive-advice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: question }),
      });

      const data = await res.json();
      if (data.success && data.advice) {
        setHistory(prev => [{ query: question, response: data.advice }, ...prev]);
        setQuery('');
      }
    } catch (err) {
      console.error('Council advice error:', err);
    } finally {
      setIsConsulting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Title Banner */}
      <div className="bg-slate-900/80 border border-amber-500/30 p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-semibold mb-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>مجلس الإدارة العامة (Code Ambis 4.6 Protocol)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-100">
            جلسة المشورة الاستراتيجية مع عبد المالك وكلود
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            توجيهات تنفيذية عليا، دراسة السوق، وحلول التوسع الاستراتيجي المخصصة للسيد ماهر غالب
          </p>
        </div>

        <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 px-3.5 py-2 rounded-xl text-amber-300 text-xs font-bold">
          <Crown className="w-4 h-4 text-amber-400" />
          <span>جلسة استشارية تنفيذية نشطة</span>
        </div>
      </div>

      {/* Preset Strategy Buttons */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-slate-400 block">
          محاور استراتيجية سريعة ومقترحة:
        </span>
        <div className="flex flex-wrap gap-2">
          {presetQueries.map((pq, idx) => (
            <button
              key={idx}
              onClick={() => handleConsult(pq)}
              disabled={isConsulting}
              className="bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-amber-300 border border-slate-800 hover:border-amber-500/40 text-xs font-medium px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>{pq}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Query Box */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3">
        <div className="flex items-center gap-2 text-xs text-slate-300 font-bold">
          <MessageSquare className="w-4 h-4 text-amber-400" />
          <span>اطرح استفسارك أو مسألتك على الإدارة العامة مباشرة:</span>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch gap-3">
          <textarea
            rows={2}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="اكتب سؤالك أو التحدي التسويقي الذي تواجهه يا سيد ماهر..."
            className="flex-1 bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />

          <button
            onClick={() => handleConsult()}
            disabled={isConsulting || !query.trim()}
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-50 text-slate-950 font-black px-6 py-3 rounded-xl text-xs shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 self-stretch sm:self-auto min-w-[140px]"
          >
            {isConsulting ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>جاري التحليل...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>طلب التوجيه</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Advisory Memo History */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <h3 className="text-sm font-bold text-slate-200">سجل التوجيهات والمذكرات التنفيذية</h3>
          <span className="text-xs text-slate-400">{history.length} توجيه تنفيذي موثق</span>
        </div>

        <div className="space-y-4">
          {history.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-900/80 border border-amber-500/20 rounded-2xl p-5 space-y-3"
            >
              {/* Question */}
              <div className="flex items-start gap-2.5 text-xs text-amber-300 font-bold border-b border-slate-800/80 pb-2">
                <HelpCircle className="w-4 h-4 flex-shrink-0 text-amber-400 mt-0.5" />
                <span>المسألة: {item.query}</span>
              </div>

              {/* Response */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-200 leading-relaxed whitespace-pre-line font-sans">
                {item.response}
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>معتمد من الإدارة العامة (عبد المالك & كلود)</span>
                </div>
                <span className="font-mono text-amber-400/70">Protocol Code Ambis 4.6</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
