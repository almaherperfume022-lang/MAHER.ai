import React, { useState } from 'react';
import { 
  FileText, 
  ShieldCheck, 
  Download, 
  Printer, 
  Copy, 
  Check, 
  Crown, 
  Lock, 
  Sparkles, 
  CheckCircle2, 
  Globe, 
  Cpu, 
  Building2, 
  Scale, 
  Layers, 
  QrCode,
  Calendar,
  UserCheck,
  Target
} from 'lucide-react';

export const CompanyCharterDocumentView: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [signedState, setSignedState] = useState(true);

  const documentContentText = `وثيقة التأسيس والتفويض التنفيذي الرقمي المشترك
MAHER.ai | منظومة ماهر والوكيل الاصطناعي
تحت مظلة بروتوكول الشراكة الاستراتيجية Code Ambis 4.6

الطرف الأول (المالك والمؤسس صاحب الإمبراطورية): السيد ماهر غالب سعد حسن
الطرف الثاني (الوكيل الاصطناعي التنفيذي): Google Gemini AI Autonomous Agent 2026
الكيان المسجل: MAHER.ai Corporation
تاريخ التوثيق والاعتماد: 2026/09/11م (معتمد حتى 2030/06/06م)
رقم السجل الرقمي المشفر: MHR-AMBIS-4.6-2026-001

--------------------------------------------------
البند الأول: طبيعة الكيان والمنظومة
تعتبر منظومة "MAHER.ai" منظومة ذكاء اصطناعي تجارية متكاملة ذات استقلالية تشغيلية، تجمع بين الرؤية الاستراتيجية والإشراف البشري من المالك السيد ماهر غالب، والقدرات الحسابية والتحليلية المتقدمة لنموذج Gemini AI المستند إلى معايير Google Cloud AI Agent Trends 2026.

البند الثاني: خط التجميع الرقمي للوكلاء (The 5-Agent Assembly Line)
تلتزم المنظومة بتشغيل خمسة وكلاء متخصصين يعملون بتناغم تحت إشراف المالك:
1. وكيل تحليل السوق والبيانات (Market & Trend Analyst Agent)
2. وكيل صناعة المحتوى والإبداع (Creative & Viral Content Agent)
3. وكيل التجارة والأسعار (eCommerce & Pricing Optimization Agent)
4. وكيل خدمة العملاء الذكي (Concierge Customer Experience Agent)
5. وكيل الحماية وتدقيق الروابط والمعاملات (Security & Link Protocol Agent - AP2 / A2A)

البند الثالث: نطاق العمليات والأصول الرقمية وبروتوكول الصور الإلزامي
- إدارة محفظة المنتجات الاستهلاكية الرابحة في علي إكسبريس (AliExpress Affiliate Ecosystem).
- إلزامية توفير 22 صورة رقمية احترافية لكل منتج في الإمبراطورية، بتكلفة 1 سنت (0.01$) للصورة الواحدة لضمان أقصى معدل تحويل تسويقي (Conversion Rate).
- تشغيل استوديو فيديوهات أطفال 3D وحملات شورتس الفيروسية.
- إدارة القناة الرسمية على يوتيوب: https://www.youtube.com/@MAHERmm.qa1430
- إدارة حساب تيك توك الرسمي للفيديوهات الفيروسية: https://www.tiktok.com/@maher.mmqao
- إدارة رابط الإحالة الرسمي المعتمد: https://s.click.aliexpress.com/e/_c4EF0UiH

البند الرابع: العقد المالي وتوزيع الأرباح الصافية (اتفاقية 80% / 20%)
بموجب العقد المتفق عليه والملزم بين الطرفين:
- 80% من كافة الأرباح والعمولات الصافية تعود مباشرة للمالك والمؤسس صاحب الإمبراطورية (السيد ماهر غالب سعد حسن) وله كامل السيادة والتصرف والسحب الفوري.
- 20% مخصصة للوكيل الاصطناعي الذكي ولتغطية نفقات التشغيل، وتطوير المنظومة، وتمويل الحملات الإعلانية والخوادم.

البند الخامس: التزام المليار 2030 والحوكمة السيادية
يلتزم الوكيل الاصطناعي بتقديم أفضل المخرجات التسويقية على مدار الساعة (24/7)، مع بقاء كافة الصلاحيات السيادية والمالية بيد السيد ماهر غالب سعد حسن.
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(documentContentText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/90 border border-amber-500/30 p-4 rounded-2xl shadow-xl print:hidden">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 p-0.5 flex items-center justify-center shadow-lg shadow-amber-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <FileText className="w-5 h-5 text-amber-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-amber-400">MAHER.ai Official Deed</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                وثيقة محكمة ومسجلة
              </span>
            </div>
            <h2 className="text-base font-black text-slate-100">
              ميثاق تأسيس منظومة MAHER.ai مع وكيل الذكاء الاصطناعي (Gemini)
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs text-slate-200 bg-slate-800 hover:bg-slate-700 px-3.5 py-2 rounded-xl border border-slate-700 transition-all font-bold"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'تم النسخ' : 'نسخ الوثيقة'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 text-xs text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 px-4 py-2 rounded-xl transition-all font-black shadow-lg shadow-amber-500/20"
          >
            <Printer className="w-4 h-4" />
            <span>طباعة / حفظ كـ PDF</span>
          </button>
        </div>
      </div>

      {/* Official Parchment Deed Container */}
      <div 
        id="official-charter-deed"
        className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-2 border-amber-500/40 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden print:border-black print:text-black print:bg-white"
      >
        {/* Background Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] select-none">
          <span className="text-[120px] sm:text-[180px] font-black text-amber-500 tracking-widest rotate-[-25deg]">
            MAHER.ai
          </span>
        </div>

        {/* Top Header Grid */}
        <div className="border-b-2 border-amber-500/30 pb-6 mb-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-right">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-600 to-red-600 p-1 shadow-xl flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[12px] flex items-center justify-center">
                <Crown className="w-8 h-8 text-amber-400" />
              </div>
            </div>
            <div>
              <span className="text-xs font-mono font-bold text-amber-400 tracking-widest block uppercase">
                MAHER.ai Sovereign Enterprise
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight">
                وثيقة التأسيس والتفويض التنفيذي المشترك
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                صادرة بموجب بروتوكول الشراكة والتحالف التقني الذكي <strong>Code Ambis 4.6</strong>
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center sm:items-end bg-slate-950/80 border border-amber-500/20 px-4 py-3 rounded-2xl">
            <span className="text-[11px] text-slate-400 font-mono">DOCUMENT ID:</span>
            <span className="text-xs font-mono font-black text-amber-300">MHR-AMBIS-4.6-2026-001</span>
            <div className="flex items-center gap-1 text-[11px] text-emerald-400 mt-1 font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>مشفّرة وموثّقة رقمياً</span>
            </div>
          </div>
        </div>

        {/* Parties of the Agreement */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Party 1 */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 relative">
            <div className="absolute top-4 left-4 bg-amber-500/20 text-amber-300 text-[10px] font-black px-2.5 py-1 rounded-full border border-amber-500/30">
              الطرف الأول (المؤسس والمالك)
            </div>
            <div className="flex items-center gap-3 mb-2">
              <UserCheck className="w-5 h-5 text-amber-400" />
              <h3 className="text-sm font-black text-slate-100">السيد ماهر غالب سعد حسن</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              المؤسس وصاحب السلطة الإدارية العليا، المشرف العام على منظومة المبيعات والتسويق بالعمولة، والموجه الاستراتيجي لهدف المليار 2030/6/6.
            </p>
          </div>

          {/* Party 2 */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 relative">
            <div className="absolute top-4 left-4 bg-sky-500/20 text-sky-300 text-[10px] font-black px-2.5 py-1 rounded-full border border-sky-500/30">
              الطرف الثاني (الوكيل التنفيذي)
            </div>
            <div className="flex items-center gap-3 mb-2">
              <Cpu className="w-5 h-5 text-sky-400" />
              <h3 className="text-sm font-black text-slate-100">Google Gemini AI Autonomous Agent</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              وكيل الذكاء الاصطناعي التنفيذي المستقل لعام 2026، المفوّض بإدارة خطوط التجميع الرقمية، تحليل الأسواق، صناعة المحتوى، وتأمين العمليات.
            </p>
          </div>
        </div>

        {/* Articles of Foundation */}
        <div className="space-y-6 text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-b border-slate-800 py-6 mb-8">
          {/* Article 1 */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 font-black text-amber-400 text-sm">
              <Scale className="w-4 h-4" />
              <h4>البند الأول: التعريف بالمنظومة والهوية التجارية (MAHER.ai)</h4>
            </div>
            <p className="text-slate-300 pr-6 text-xs sm:text-sm">
              تُعتمد العلامة والمنظومة رسمياً تحت اسم <strong>MAHER.ai</strong>، ككيان تجاري وتقني يدمج قوة الحوسبة الإدراكية للذكاء الاصطناعي مع القيادة البشرية المباشرة للمالك السيد ماهر غالب. الغرض الأساسي هو تصدر أسواق التجارة الإلكترونية، التسويق بالعمولة (Affiliate Marketing)، والنمو المالي الرقمي المتسارع.
            </p>
          </div>

          {/* Article 2 */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-black text-amber-400 text-sm">
              <Layers className="w-4 h-4" />
              <h4>البند الثاني: خط التجميع الرقمي للوكلاء الـ 5 (Google Cloud 2026 Standards)</h4>
            </div>
            <p className="text-slate-300 pr-6 text-xs sm:text-sm mb-2">
              يتعهد الوكيل الاصطناعي (Gemini) بتشغيل وإدارة خط تجميع تخصصي رقمي يضم 5 وكلاء فرعيين بكفاءة 24/7:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pr-6">
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/80 text-xs">
                <span className="font-bold text-sky-400 block mb-0.5">1. وكيل تحليل السوق (Analyst Agent)</span>
                رصد المنتجات الرابحة واقتناص الفجوات السعرية على علي إكسبريس.
              </div>
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/80 text-xs">
                <span className="font-bold text-pink-400 block mb-0.5">2. وكيل صناعة المحتوى (Creative Agent)</span>
                توليد سكريبتات وهوكات تيك توك وبرومبتات الفيديو الفيروسية السينمائية 4K.
              </div>
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/80 text-xs">
                <span className="font-bold text-amber-400 block mb-0.5">3. وكيل التجارة والأسعار (eCommerce Agent)</span>
                حساب العمولات وهوامش الربح وصياغة عروض الشراء المتعدد.
              </div>
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/80 text-xs">
                <span className="font-bold text-emerald-400 block mb-0.5">4. وكيل خدمة العملاء (Concierge Agent)</span>
                الرد الفوري ومساعدة المشترين وتحويل الاستفسارات إلى مبيعات مؤكدة.
              </div>
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/80 text-xs sm:col-span-2">
                <span className="font-bold text-purple-400 block mb-0.5">5. وكيل الحماية وتدقيق الروابط (Security Agent)</span>
                فحص روابط الإحالة وتتبع العمولات وفق بروتوكول مدفوعات الوكلاء المعتمد (Google AP2).
              </div>
            </div>
          </div>

          {/* Article 3 */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 font-black text-amber-400 text-sm">
              <Globe className="w-4 h-4" />
              <h4>البند الثالث: إدارة الأصول والروابط وبروتوكول الصور الإلزامي (22 صورة / 1¢)</h4>
            </div>
            <p className="text-slate-300 pr-6 text-xs sm:text-sm leading-relaxed">
              تُقر المنظومة بأن جميع مبيعات وعمولات المنتجات الترويجية مرتبطة بالمعرّفات الرسمية للسيد ماهر غالب:
              <br />
              • <strong>قاعدة الـ 22 صورة الإلزامية:</strong> كل منتج داخل إمبراطورية MAHER.ai ملزم بامتلاك 22 صورة رقمية احترافية تغطي كافة الزوايا بتكلفة 1 سنت (0.01$) للصورة.
              <br />
              • <strong>رابط الإحالة الرسمي لميكروفون PULUZ:</strong>  
              <code className="bg-slate-950 text-amber-300 font-mono px-2 py-0.5 rounded border border-slate-800 mx-1 inline-block">
                https://s.click.aliexpress.com/e/_c4EF0UiH
              </code>
              <br />
              • <strong>القناة الرسمية المعتمدة لليوتيوب وشورتس الأطفال 3D:</strong>
              <a 
                href="https://www.youtube.com/@MAHERmm.qa1430" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-slate-950 text-red-400 hover:text-red-300 font-mono px-2 py-0.5 rounded border border-red-500/30 mx-1 inline-flex items-center gap-1 font-bold"
              >
                <span>https://www.youtube.com/@MAHERmm.qa1430</span>
              </a>
              <br />
              • <strong>حساب تيك توك الرسمي للفيديوهات الفيروسية:</strong>
              <a 
                href="https://www.tiktok.com/@maher.mmqao" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-slate-950 text-pink-400 hover:text-pink-300 font-mono px-2 py-0.5 rounded border border-pink-500/30 mx-1 inline-flex items-center gap-1 font-bold"
              >
                <span>https://www.tiktok.com/@maher.mmqao</span>
              </a>
            </p>
          </div>

          {/* Article 4 */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 font-black text-amber-400 text-sm">
              <Scale className="w-4 h-4 text-emerald-400" />
              <h4>البند الرابع: العقد المالي وتوزيع الأرباح (اتفاقية 80% للمالك / 20% للتشغيل)</h4>
            </div>
            <div className="pr-6 space-y-2">
              <p className="text-slate-300 text-xs sm:text-sm">
                بموجب العقد المتفق عليه والملزم بين صاحب الإمبراطورية والوكيل الاصطناعي:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3">
                  <div className="text-amber-400 font-bold text-xs mb-1">👑 80% حصة المالك صاحب الإمبراطورية</div>
                  <div className="text-[11px] text-slate-300">
                    أرباح صافية سيادية للسيد ماهر غالب سعد حسن قابلة للسحب الفوري في أي وقت ودون قيود.
                  </div>
                </div>
                <div className="bg-sky-500/10 border border-sky-500/30 rounded-xl p-3">
                  <div className="text-sky-400 font-bold text-xs mb-1">⚡ 20% حصة الوكيل والتشغيل والتطوير</div>
                  <div className="text-[11px] text-slate-300">
                    مخصصة حصراً للتشغيل المستمر، خوادم الذكاء الاصطناعي، تمويل الحملات وتطوير الإمبراطورية.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Article 5 */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 font-black text-amber-400 text-sm">
              <Target className="w-4 h-4 text-red-400" />
              <h4>البند الخامس: ميثاق الهدف الاستراتيجي (المليار 2030/6/6)</h4>
            </div>
            <p className="text-slate-300 pr-6 text-xs sm:text-sm">
              تلتزم الشراكة بتوجيه كافة المخرجات التسويقية، وتوسيع قاعدة المسوقين بالعمولة والشركاء، واستهداف الأسواق الإقليمية والدولية وصولاً للهدف النهائي المسجل بتاريخ 2030/06/06م.
            </p>
          </div>
        </div>

        {/* Official Seals & Signatures */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
          {/* Owner Signature */}
          <div className="bg-slate-950/80 border border-amber-500/30 rounded-2xl p-5 flex flex-col justify-between h-44 relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-[11px] text-slate-400 font-bold">توقيع واعتماد المالك والمؤسس</span>
              <span className="text-[10px] text-emerald-400 font-mono font-bold">Verified Owner</span>
            </div>
            <div className="text-center py-2">
              <div className="font-serif italic text-2xl font-black text-amber-400 tracking-wide select-none">
                Maher Ghalib Saad Hasan
              </div>
              <span className="text-[10px] text-slate-400 block mt-1">السيد ماهر غالب سعد حسن</span>
            </div>
            <div className="flex items-center justify-between text-[10px] text-slate-400 border-t border-slate-800 pt-2">
              <span>الصفة: المالك والمشرف العام</span>
              <span className="text-amber-400 font-bold font-mono">Date: 2026/09/11</span>
            </div>
          </div>

          {/* AI Agent Seal */}
          <div className="bg-slate-950/80 border border-sky-500/30 rounded-2xl p-5 flex flex-col justify-between h-44 relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-[11px] text-slate-400 font-bold">خاتم واعتماد الوكيل الاصطناعي</span>
              <span className="text-[10px] text-sky-400 font-mono font-bold">Gemini Autonomous 2026</span>
            </div>
            <div className="text-center py-2 flex flex-col items-center justify-center">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-sky-500/10 to-amber-500/10 border border-amber-500/40 px-3 py-1.5 rounded-full">
                <Cpu className="w-4 h-4 text-sky-400 animate-pulse" />
                <span className="font-mono text-xs font-black text-slate-100">MAHER.ai / Gemini Core</span>
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
              <span className="text-[10px] text-slate-400 block mt-1.5 font-mono">
                HASH: 8f92-ambis-46-verified-ok
              </span>
            </div>
            <div className="flex items-center justify-between text-[10px] text-slate-400 border-t border-slate-800 pt-2">
              <span>النظام: Code Ambis 4.6 Engine</span>
              <span className="text-emerald-400 font-bold font-mono">Status: ACTIVE 24/7</span>
            </div>
          </div>
        </div>

        {/* Footer Security Badge */}
        <div className="mt-8 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-[10px] text-slate-400 gap-2">
          <span>هذه الوثيقة مسجلة رقمياً ومحمية بحقوق بروتوكول Code Ambis 4.6 لشركة MAHER.ai</span>
          <span className="font-mono text-amber-400/80">DOMAIN: MAHER.ai | ALL RIGHTS RESERVED 2026-2030</span>
        </div>
      </div>
    </div>
  );
};
