import React, { useState } from 'react';
import { ProductItem, ProductCategory } from '../types';
import { 
  ShoppingBag, 
  ExternalLink, 
  Copy, 
  Check, 
  Sparkles, 
  Facebook, 
  Plus, 
  Search, 
  DollarSign,
  TrendingUp,
  Tag,
  Star,
  CheckCircle2,
  X,
  Camera,
  Image as ImageIcon,
  ShieldCheck
} from 'lucide-react';
import { Imperial22PhotosModal } from './Imperial22PhotosModal';
import { generate22ImperialPhotos } from '../utils/imperialImages';

interface StoreViewProps {
  products: ProductItem[];
  onSelectProductForCampaign: (product: ProductItem) => void;
  onAddProduct: (product: ProductItem) => void;
}

export const StoreView: React.FC<StoreViewProps> = ({
  products,
  onSelectProductForCampaign,
  onAddProduct,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [selectedProductForGallery, setSelectedProductForGallery] = useState<ProductItem | null>(null);

  // New product form state
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<ProductCategory>('electronics');
  const [newPrice, setNewPrice] = useState('15.00');
  const [newCommissionRate, setNewCommissionRate] = useState('12');
  const [newAffiliateUrl, setNewAffiliateUrl] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const categories: { id: string; label: string }[] = [
    { id: 'all', label: 'جميع منتجات النخبة' },
    { id: 'electronics', label: '🎙️ إلكترونيات وتصوير' },
    { id: 'consumer', label: '⚡ استهلاك يومي وسريع' },
    { id: 'textiles', label: '🧵 منسوجات وستان' },
    { id: 'grooming', label: '✂️ عناية وتقليم' },
    { id: 'accessories', label: '📱 ملحقات المحتوى' },
  ];

  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCopy = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newAffiliateUrl.trim()) return;

    const priceNum = parseFloat(newPrice) || 15;
    const commissionNum = parseFloat(newCommissionRate) || 10;
    const estProfit = parseFloat(((priceNum * commissionNum) / 100).toFixed(2));

    const item: ProductItem = {
      id: `custom-prod-${Date.now()}`,
      title: newTitle.trim(),
      titleEn: newTitle.trim(),
      description: newDescription.trim() || 'منتج مختار بعناية من منصة علي إكسبريس بأعلى نسبة عمولة.',
      category: newCategory,
      categoryLabel: categories.find(c => c.id === newCategory)?.label || 'منتج عام',
      price: priceNum,
      originalPrice: priceNum * 1.5,
      commissionRate: commissionNum,
      estCommissionUsd: estProfit,
      affiliateUrl: newAffiliateUrl.trim(),
      imageUrl: newImageUrl.trim() || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=600&q=80',
      badge: 'مضاف حديثاً 🌟',
      isHotProduct: true,
      salesCount: 120,
      rating: 4.9,
      sellingPoints: ['منتج عالي الجودة والطلب', 'عمولة مباشرة ومضمونة', 'شحن موثوق من علي إكسبريس']
    };

    onAddProduct(item);
    setIsAddModalOpen(false);
    // Reset form
    setNewTitle('');
    setNewAffiliateUrl('');
    setNewDescription('');
    setNewImageUrl('');
  };

  return (
    <div className="space-y-6">
      {/* Header & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-semibold mb-1">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>متجر النخبة للمنتجات الاستهلاكية (SCREEN_53)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-100">
            محرك الأرباح اليومية والمنتجات الأكثر مبيعاً
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            منتجات تم فحصها من حيث سرعة الاستهلاك، سهولة البيع، وأعلى نسب العمولات بالدولار
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 px-4 py-2.5 rounded-xl text-xs font-black shadow-lg shadow-amber-500/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة منتج عمولة جديد</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Category Tabs */}
        <div className="w-full md:w-auto flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="ابحث بالاسم أو الوصف..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900/80 border border-slate-800 rounded-lg pr-9 pl-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProducts.map((product) => {
          const isCopied = copiedId === product.id;
          return (
            <div
              key={product.id}
              className="bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/5 group"
            >
              {/* Image & Badges */}
              <div className="relative h-52 bg-slate-950 overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Category & Badge */}
                <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-end">
                  {product.badge && (
                    <span className="bg-amber-500 text-slate-950 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow">
                      {product.badge}
                    </span>
                  )}
                  <span className="bg-slate-950/80 backdrop-blur text-slate-300 text-[10px] px-2 py-0.5 rounded border border-slate-700">
                    {product.categoryLabel}
                  </span>
                </div>

                {/* 22 Photos Quick Badge Trigger */}
                <button
                  onClick={() => setSelectedProductForGallery(product)}
                  className="absolute top-3 left-3 bg-slate-950/90 hover:bg-amber-500 hover:text-slate-950 text-amber-300 text-[10px] font-black px-2.5 py-1 rounded-xl border border-amber-500/40 shadow-lg flex items-center gap-1 transition-all"
                  title="استعراض 22 صورة للمنتج (1¢/صورة)"
                >
                  <Camera className="w-3 h-3 text-amber-400 group-hover:text-slate-950" />
                  <span>22 صورة (1¢) 📸</span>
                </button>

                {/* Commission Floating Tag */}
                <div className="absolute bottom-3 left-3 bg-emerald-600 text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow-lg flex items-center gap-1">
                  <span>عمولة {product.commissionRate}%</span>
                  <span className="text-[10px] opacity-80">(~${product.estCommissionUsd})</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center gap-1 text-amber-400">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span className="font-bold">{product.rating}</span>
                    </div>
                    <span>{product.salesCount.toLocaleString()} مبيعة</span>
                  </div>

                  <h3 className="font-bold text-sm text-slate-100 group-hover:text-amber-300 transition-colors line-clamp-2">
                    {product.title}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Selling Points */}
                <div className="space-y-1 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
                  {product.sellingPoints.slice(0, 2).map((pt, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-300">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                      <span className="truncate">{pt}</span>
                    </div>
                  ))}
                </div>

                {/* Price and Estimated Profit */}
                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-500 block">سعر الزبون</span>
                    <span className="text-base font-extrabold text-amber-400">${product.price}</span>
                  </div>

                  <div className="text-left">
                    <span className="text-xs text-slate-500 block">ربحك الصافي</span>
                    <span className="text-base font-extrabold text-emerald-400">+${product.estCommissionUsd}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 pt-1">
                  {/* Primary Buy Affiliate Button */}
                  <a
                    href={product.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-xs font-bold py-2.5 rounded-xl shadow-md transition-all"
                  >
                    <span>فتح وشراء بالعمولة (AliExpress)</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  {/* Secondary Fast Tools: Copy link, FB share, AI ad */}
                  <div className="grid grid-cols-3 gap-1.5">
                    {/* Copy Link */}
                    <button
                      onClick={() => handleCopy(product.affiliateUrl, product.id)}
                      className="flex items-center justify-center gap-1 bg-slate-800 hover:bg-slate-700 text-slate-200 py-1.5 px-2 rounded-lg text-[11px] font-semibold transition-all border border-slate-700"
                      title="نسخ رابط الإحالة"
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-amber-400" />}
                      <span>{isCopied ? 'تم!' : 'نسخ'}</span>
                    </button>

                    {/* Direct Facebook Share */}
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(product.affiliateUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1 bg-blue-600/80 hover:bg-blue-600 text-white py-1.5 px-2 rounded-lg text-[11px] font-semibold transition-all"
                      title="نشر سريع على فيسبوك"
                    >
                      <Facebook className="w-3.5 h-3.5" />
                      <span>فيسبوك</span>
                    </a>

                    {/* AI Campaign Generator Trigger */}
                    <button
                      onClick={() => onSelectProductForCampaign(product)}
                      className="flex items-center justify-center gap-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 py-1.5 px-2 rounded-lg text-[11px] font-semibold transition-all"
                      title="توليد إعلان ذكي فوراً"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>إعلان AI</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-amber-500/30 rounded-2xl max-w-lg w-full p-6 space-y-4 relative shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-slate-100">إضافة منتج بالعمولة إلى متجرك</h3>
              </div>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-200 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">اسم المنتج</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: ميكروفون لاسلكي ذكي..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">التصنيف</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as ProductCategory)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                  >
                    <option value="electronics">إلكترونيات وتصوير</option>
                    <option value="consumer">استهلاك يومي وسريع</option>
                    <option value="textiles">منسوجات وستان</option>
                    <option value="grooming">عناية وتقليم</option>
                    <option value="accessories">ملحقات الهاتف</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">السعر التقريبي ($)</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">نسبة العمولة (%)</label>
                  <input
                    type="number"
                    step="0.5"
                    required
                    value={newCommissionRate}
                    onChange={(e) => setNewCommissionRate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">رابط الصورة (اختياري)</label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">رابط العمولة (Affiliate Link)</label>
                <input
                  type="url"
                  required
                  placeholder="https://s.click.aliexpress.com/e/..."
                  value={newAffiliateUrl}
                  onChange={(e) => setNewAffiliateUrl(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">وصف تسويقي للمنتج</label>
                <textarea
                  rows={2}
                  placeholder="مميزات المنتج وزاوية البيع..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-slate-400 hover:text-slate-200"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold"
                >
                  حفظ في المتجر
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Imperial 22 Photos Modal */}
      {selectedProductForGallery && (
        <Imperial22PhotosModal
          product={selectedProductForGallery}
          onClose={() => setSelectedProductForGallery(null)}
        />
      )}
    </div>
  );
};
