import React, { useState } from 'react';
import { ProductItem, CampaignOutput } from '../types';
import { 
  Sparkles, 
  Copy, 
  Check, 
  Facebook, 
  MessageCircle, 
  Video, 
  Send, 
  RefreshCw, 
  Target, 
  TrendingUp,
  Award,
  Zap,
  ExternalLink
} from 'lucide-react';

interface CampaignCenterViewProps {
  products: ProductItem[];
  selectedProduct: ProductItem | null;
  onSelectProduct: (product: ProductItem) => void;
}

export const CampaignCenterView: React.FC<CampaignCenterViewProps> = ({
  products,
  selectedProduct,
  onSelectProduct,
}) => {
  const currentProduct = selectedProduct || products[0];

  const [sellingAngle, setSellingAngle] = useState('حل مشكلة عزل الهواء وتشويش الصوت للمحتوى اليومي');
  const [targetPlatform, setTargetPlatform] = useState('all');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  // Preloaded high-conversion campaign output for the star product
  const [campaignData, setCampaignData] = useState<CampaignOutput>({
    facebookPost: {
      headline: '🎙️ وداعاً لتشويش الصوت في تصويرك وبثوثك المباشرة! ✨',
      body: `هل تعاني من الهواء والأصوات المزعجة أثناء تصوير الفيديوهات أو البث في الأماكن المفتوحة؟ 

الحل الأمثل وصل مع ميكروفون PULUZ اللاسلكي المزدوج الصغير والعملي:

🌟 مميزات حصرية تجعله الأفضل لصناع المحتوى:
✅ عزل صوت ذكي ومتقدم بنظام DSP لنقاء فائق يشبه الاستوديو.
✅ لاسلكي بالكامل بمدى إرسال يصل إلى 20 متراً بحرية تامة.
✅ حجم ميني وخفيف الوزن، يثبت بسهولة على الملابس دون أن يظهر.
✅ متوافق مع كافة الهواتف (iPhone & Android) فورياً Plug & Play بدون أي برامج معقدة!
✅ بطارية قوية تدوم حتى 8 ساعات متواصلة وشحن سريع.

🏷️ السعر المخفض: 14.80$ فقط (لفترة محدودة) 🔥
👇 اطلب المايك الآن عبر الرابط المباشر من علي إكسبريس:
${currentProduct.affiliateUrl}

#صوت_احترافي #ميكروفون_لاسلكي #تصوير_فيديو #ريلز #PULUZ #AliExpress`,
      callToAction: 'اضغط على الرابط أعلاه واطلب المايك الآن قبل نفاد الكمية المخفضة!'
    },
    tiktokReels: {
      hook5s: 'لو بتصور ريلز أو تيك توك بدون المايك ده، فصوتك بيضيع نص مشاهداتك!',
      script15s: 'جربت أسجل صوتي بالموبايل العادي وسط الزحمة والصوت كان كارثة.. وبمجرد ما شغلت مايك PULUZ اللاسلكي.. اسمع الفرق النقي! عزل كامل بضغطة زر وبدون سلك. الرابط في البايو بأقل سعر.',
      visualDirections: 'مشهد 1: تصوير فيديو بصوت الموبايل السيء المشوش (3 ثواني). مشهد 2: تركيب المايك الصغير على القميص. مشهد 3: الصوت يتحول لنقاء استوديو فخم ومبهر.',
      soundSuggestion: 'موسيقى تريند هادئة وواضحة (Lo-Fi Beats or Trending Synth)',
      caption: 'الفرق الصادم بين صوت الموبايل وصوت مايك PULUZ 🎙️🔥 رابط الشراء مع الخصم في البايو وأول تعليق!'
    },
    whatsappBroadcast: {
      shortStatus: `🎙️ أفضل مايك لاسلكي للهواتف بعزل ذكي وسعر رخيص جداً (14$)! اطلبه الآن من الرابط: ${currentProduct.affiliateUrl}`,
      groupBroadcast: `يا شباب، لأي شخص يصور فيديوهات أو بثوث على تيك توك وفيسبوك، مايك PULUZ اللاسلكي عامل ضجة بجودته وعزله للضوضاء وسعره تحت 15$ فقط! الرابط المباشر: ${currentProduct.affiliateUrl}`
    },
    strategicSummary: {
      profitPerSale: `$1.85 دولار (~7 ريال سعودي) لكل مبيعة + عمولة كامل السلة المضافة`,
      targetAudience: `صناع المحتوى المبتدئون على تيك توك وفيسبوك، المعلمون في الدروس أونلاين، الباعة عبر البثوث المباشرة.`,
      executiveTip: `المشترون يتأثرون بتجربة الصوت المباشرة (قبل وبعد العزل)، ركز على المقارنة السمعية لتحقيق أعلى معدل تحويل.`
    }
  });

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch('/api/generate-campaign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName: currentProduct.title,
          productCategory: currentProduct.categoryLabel,
          price: `$${currentProduct.price}`,
          commissionRate: `${currentProduct.commissionRate}%`,
          affiliateLink: currentProduct.affiliateUrl,
          targetPlatform,
          sellingAngle,
        }),
      });

      const data = await res.json();
      if (data.success && data.data) {
        setCampaignData(data.data);
      }
    } catch (err) {
      console.warn('API error, keeping fallback campaign:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = (text: string, sectionKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionKey);
    setTimeout(() => setCopiedSection(null), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Title Banner */}
      <div className="bg-slate-900/80 border border-amber-500/30 p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs text-amber-400 font-semibold mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>مركز الحلول الإعلانية والبيانات (SCREEN_69)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-100">
            توليد الحملات التسويقية الذكية ببروتوكول Code Ambis 4.6
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            صياغة نصوص إعلانية احترافية فورية، سكريبتات فيديوهات قصيرة، ورسائل واتساب بضغطة زر
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-300 font-medium">المنتج النشط:</span>
          <select
            value={currentProduct.id}
            onChange={(e) => {
              const prod = products.find(p => p.id === e.target.value);
              if (prod) onSelectProduct(prod);
            }}
            className="bg-slate-950 border border-amber-500/40 text-amber-300 text-xs font-bold rounded-xl px-3 py-2 focus:outline-none"
          >
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title.slice(0, 45)}...
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Control Panel for Campaign Settings */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">الزاوية البيعية (Selling Angle)</label>
            <input
              type="text"
              value={sellingAngle}
              onChange={(e) => setSellingAngle(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
              placeholder="مثال: التوفير، الجودة، حل مشكلة الهواء..."
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">المنصة المستهدفة</label>
            <select
              value={targetPlatform}
              onChange={(e) => setTargetPlatform(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
            >
              <option value="all">كافة المنصات (فيسبوك، تيك توك، واتساب)</option>
              <option value="facebook">فيسبوك فقط</option>
              <option value="tiktok">تيك توك وريلز فقط</option>
              <option value="whatsapp">واتساب فقط</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-50 text-slate-950 text-xs font-black py-2.5 rounded-lg shadow-lg shadow-amber-500/20 transition-all"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>جاري التحليل والتوليد بالذكاء الاصطناعي...</span>
                </>
              ) : (
                <>
                  <Zap className="w-3.5 h-3.5 fill-slate-950" />
                  <span>توليد حملة إعلانية جديدة للمنتج</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Output Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Section 1: Facebook Post */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                <Facebook className="w-4 h-4" />
                <span>منشور فيسبوك الإعلاني الجاهز للنشر</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopy(campaignData.facebookPost.body, 'fb')}
                  className="flex items-center gap-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1.5 rounded-lg border border-slate-700 transition-all"
                >
                  {copiedSection === 'fb' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-amber-400" />}
                  <span>{copiedSection === 'fb' ? 'تم النسخ!' : 'نسخ المنشور'}</span>
                </button>

                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentProduct.affiliateUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs bg-blue-600 hover:bg-blue-500 text-white px-2.5 py-1.5 rounded-lg font-semibold shadow transition-all"
                >
                  <Send className="w-3 h-3" />
                  <span>نشر مباشر</span>
                </a>
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/90 text-xs text-slate-200 whitespace-pre-line leading-relaxed max-h-80 overflow-y-auto font-sans">
              {campaignData.facebookPost.body}
            </div>
          </div>

          <div className="text-[11px] text-amber-300/80 bg-amber-500/10 p-2.5 rounded-lg border border-amber-500/20">
            💡 <strong>نصيحة للنشر:</strong> أرفق صورة المنتج أو فيديو قصير من علي إكسبريس مع النص لزيادة وصول المنشور 5 أضعاف.
          </div>
        </div>

        {/* Section 2: TikTok & Reels Video Script */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-pink-400 font-bold text-sm">
                <Video className="w-4 h-4" />
                <span>سكريبت فيديو تيك توك وريلز (TikTok / Shorts)</span>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <a
                  href="https://www.tiktok.com/@maher.mmqao"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs bg-pink-600/20 hover:bg-pink-600/30 text-pink-300 px-2.5 py-1.5 rounded-lg border border-pink-500/40 font-bold transition-all"
                  title="فتح حساب تيك توك"
                >
                  <Video className="w-3.5 h-3.5 text-pink-400" />
                  <span>@maher.mmqao</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <button
                  onClick={() => handleCopy(`${campaignData.tiktokReels.hook5s}\n\n${campaignData.tiktokReels.script15s}\n\n${campaignData.tiktokReels.caption}`, 'tiktok')}
                  className="flex items-center gap-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1.5 rounded-lg border border-slate-700 transition-all"
                >
                  {copiedSection === 'tiktok' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-amber-400" />}
                  <span>{copiedSection === 'tiktok' ? 'تم النسخ!' : 'نسخ السكريبت'}</span>
                </button>
              </div>
            </div>

            {/* Hook 5s */}
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-pink-400 block">
                ⚡ جملة الهوك الخاطفة (أول 5 ثواني لمنع التمرير):
              </span>
              <div className="bg-slate-950 p-3 rounded-lg border border-pink-500/30 text-xs font-semibold text-slate-100">
                "{campaignData.tiktokReels.hook5s}"
              </div>
            </div>

            {/* 15s Script */}
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-amber-300 block">
                🎙️ السكريبت الصوتي الكامل (15 ثانية):
              </span>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs text-slate-200 leading-relaxed">
                {campaignData.tiktokReels.script15s}
              </div>
            </div>

            {/* Visual Directions */}
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-slate-400 block">
                🎬 التوجيهات البصرية (ماذا تصور أمام الكاميرا):
              </span>
              <div className="bg-slate-950/70 p-2.5 rounded-lg border border-slate-800/80 text-[11px] text-slate-300">
                {campaignData.tiktokReels.visualDirections}
              </div>
            </div>

            {/* Caption */}
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-slate-400 block">
                📝 الكابشن المقترح للبايو:
              </span>
              <div className="bg-slate-950/70 p-2 rounded-lg border border-slate-800/80 text-[11px] text-slate-300 truncate">
                {campaignData.tiktokReels.caption}
              </div>
            </div>
          </div>

          <div className="text-[11px] text-pink-300/80 bg-pink-500/10 p-2.5 rounded-lg border border-pink-500/20">
            🎵 <strong>الصوت المقترح:</strong> {campaignData.tiktokReels.soundSuggestion}
          </div>
        </div>

        {/* Section 3: WhatsApp Broadcasts */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <MessageCircle className="w-4 h-4" />
              <span>رسائل وحالات الواتساب (WhatsApp Status)</span>
            </div>

            <button
              onClick={() => handleCopy(campaignData.whatsappBroadcast.shortStatus, 'wa-status')}
              className="flex items-center gap-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1.5 rounded-lg border border-slate-700 transition-all"
            >
              {copiedSection === 'wa-status' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-amber-400" />}
              <span>{copiedSection === 'wa-status' ? 'تم النسخ!' : 'نسخ الحالة'}</span>
            </button>
          </div>

          <div className="space-y-3">
            <div>
              <span className="text-[11px] font-bold text-emerald-400 block mb-1">
                📱 نص لحالة الواتساب السريعة:
              </span>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs text-slate-200">
                {campaignData.whatsappBroadcast.shortStatus}
              </div>
            </div>

            <div>
              <span className="text-[11px] font-bold text-slate-400 block mb-1">
                👥 رسالة البث للمجموعات والأصدقاء:
              </span>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs text-slate-200">
                {campaignData.whatsappBroadcast.groupBroadcast}
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Strategic Executive Insights */}
        <div className="bg-slate-900/80 border border-amber-500/20 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <Award className="w-4 h-4" />
              <span>التحليل الاستراتيجي وأرباح المنتج (Code Ambis 4.6)</span>
            </div>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-start gap-2.5">
              <TrendingUp className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-200 block mb-0.5">الربح المتوقع لكل مبيعة:</strong>
                <span className="text-emerald-400 font-semibold">{campaignData.strategicSummary.profitPerSale}</span>
              </div>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-start gap-2.5">
              <Target className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-200 block mb-0.5">الفئة المستهدفة الأكثر تحويلاً:</strong>
                <span className="text-slate-300">{campaignData.strategicSummary.targetAudience}</span>
              </div>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-amber-500/30 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-amber-300 block mb-0.5">نصيحة الإدارة العامة (عبد المالك وكلود):</strong>
                <span className="text-slate-200 italic">{campaignData.strategicSummary.executiveTip}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
