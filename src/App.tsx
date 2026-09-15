import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { StoreView } from './components/StoreView';
import { CampaignCenterView } from './components/CampaignCenterView';
import { TikTokStudioView } from './components/TikTokStudioView';
import { AffiliatePortalView } from './components/AffiliatePortalView';
import { PwaInstallView } from './components/PwaInstallView';
import { ExecutiveCouncilView } from './components/ExecutiveCouncilView';
import { AiAgentCenterView } from './components/AiAgentCenterView';
import { CompanyCharterDocumentView } from './components/CompanyCharterDocumentView';
import { SmartWalletView } from './components/SmartWalletView';
import { GlobalMarketConquestView } from './components/GlobalMarketConquestView';
import { HotkeysModal } from './components/HotkeysModal';
import { INITIAL_PRODUCTS } from './data/products';
import { ProductItem, NavigationTab } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, Command, Keyboard } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('dashboard');
  const [products, setProducts] = useState<ProductItem[]>(INITIAL_PRODUCTS);
  const [selectedProductForCampaign, setSelectedProductForCampaign] = useState<ProductItem>(INITIAL_PRODUCTS[0]);
  const [isHotkeysOpen, setIsHotkeysOpen] = useState<boolean>(false);
  const [hotkeyFeedback, setHotkeyFeedback] = useState<{ key: string; label: string } | null>(null);

  const navigateToTab = useCallback((tab: NavigationTab, keyName?: string, labelName?: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (keyName && labelName) {
      setHotkeyFeedback({ key: keyName, label: labelName });
      setTimeout(() => setHotkeyFeedback(null), 2500);
    }
  }, []);

  // Global Keyboard Shortcuts Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts if the user is typing inside an input, textarea, or contentEditable
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable)
      ) {
        return;
      }

      // Check for help modal key (? or K)
      if (e.key === '?' || (e.key === 'k' && (e.metaKey || e.ctrlKey))) {
        e.preventDefault();
        setIsHotkeysOpen((prev) => !prev);
        return;
      }

      const key = e.key.toLowerCase();

      // Hotkey mappings
      switch (key) {
        case '1':
        case 'd':
          e.preventDefault();
          navigateToTab('dashboard', key.toUpperCase(), 'القيادة والاستراتيجية');
          break;
        case '2':
        case 'w':
          e.preventDefault();
          navigateToTab('wallet', key.toUpperCase(), 'محفظة الأرباح (80%)');
          break;
        case '3':
        case 'a':
          e.preventDefault();
          navigateToTab('campaigns', key.toUpperCase(), 'الحلول الإعلانية الذكية (AI)');
          break;
        case '4':
        case 'g':
          e.preventDefault();
          navigateToTab('global_conquest', key.toUpperCase(), 'اكتساح الأسواق العالمية');
          break;
        case '5':
        case 's':
          e.preventDefault();
          navigateToTab('store', key.toUpperCase(), 'متجر النخبة (22 صورة)');
          break;
        case '6':
        case 'c':
          e.preventDefault();
          navigateToTab('ai_agent', key.toUpperCase(), 'الوكيل الاصطناعي (AI Agent)');
          break;
        case '7':
        case 't':
          e.preventDefault();
          navigateToTab('tiktok', key.toUpperCase(), 'استوديو تيك توك السينمائي');
          break;
        case '8':
        case 'l':
          e.preventDefault();
          navigateToTab('affiliates', key.toUpperCase(), 'لوحة الشرف وبوابة المسوقين');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigateToTab]);

  const handleSelectProductForCampaign = (product: ProductItem) => {
    setSelectedProductForCampaign(product);
    setActiveTab('campaigns');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddProduct = (newProduct: ProductItem) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-amber-500/30 selection:text-amber-200 font-sans relative" dir="rtl">
      {/* Royal Header */}
      <Header 
        activeTab={activeTab} 
        onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenHotkeys={() => setIsHotkeysOpen(true)}
      />

      {/* Floating Hotkey Quick Indicator / Toast */}
      <AnimatePresence>
        {hotkeyFeedback && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 text-slate-950 px-4 py-2 rounded-2xl shadow-2xl flex items-center gap-2 border border-amber-300 ring-4 ring-amber-500/20 font-bold text-xs"
          >
            <Zap className="w-4 h-4 fill-slate-950" />
            <span>تنقل سريع عبر الاختصار [<kbd className="px-1.5 py-0.5 bg-slate-950 text-amber-300 rounded font-mono text-[11px]">{hotkeyFeedback.key}</kbd>]:</span>
            <span className="text-slate-950 underline decoration-slate-950/40">{hotkeyFeedback.label}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <AnimatePresence mode="wait" initial={false}>
          {activeTab === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.25 }}
            >
              <DashboardView
                products={products}
                onNavigate={setActiveTab}
                onSelectProductForCampaign={handleSelectProductForCampaign}
              />
            </motion.div>
          )}

          {activeTab === 'global_conquest' && (
            <motion.div
              key="global_conquest"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.25 }}
            >
              <GlobalMarketConquestView 
                products={products}
                onSelectProductForCampaign={handleSelectProductForCampaign}
                onNavigateToWallet={() => setActiveTab('wallet')}
              />
            </motion.div>
          )}

          {activeTab === 'wallet' && (
            <motion.div
              key="wallet"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.25 }}
            >
              <SmartWalletView />
            </motion.div>
          )}

          {activeTab === 'ai_agent' && (
            <motion.div
              key="ai_agent"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.25 }}
            >
              <AiAgentCenterView
                products={products}
                onSelectProduct={handleSelectProductForCampaign}
                onNavigateToCharter={() => setActiveTab('company_charter')}
              />
            </motion.div>
          )}

          {activeTab === 'company_charter' && (
            <motion.div
              key="company_charter"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.25 }}
            >
              <CompanyCharterDocumentView />
            </motion.div>
          )}

          {activeTab === 'store' && (
            <motion.div
              key="store"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.25 }}
            >
              <StoreView
                products={products}
                onSelectProductForCampaign={handleSelectProductForCampaign}
                onAddProduct={handleAddProduct}
              />
            </motion.div>
          )}

          {activeTab === 'campaigns' && (
            <motion.div
              key="campaigns"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.25 }}
            >
              <CampaignCenterView
                products={products}
                selectedProduct={selectedProductForCampaign}
                onSelectProduct={setSelectedProductForCampaign}
              />
            </motion.div>
          )}

          {activeTab === 'tiktok' && (
            <motion.div
              key="tiktok"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.25 }}
            >
              <TikTokStudioView products={products} />
            </motion.div>
          )}

          {activeTab === 'affiliates' && (
            <motion.div
              key="affiliates"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.25 }}
            >
              <AffiliatePortalView />
            </motion.div>
          )}

          {activeTab === 'pwa' && (
            <motion.div
              key="pwa"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.25 }}
            >
              <PwaInstallView />
            </motion.div>
          )}

          {activeTab === 'executive_council' && (
            <motion.div
              key="executive_council"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.25 }}
            >
              <ExecutiveCouncilView />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Royal Footer */}
      <footer className="w-full py-6 border-t border-slate-900 bg-slate-950/90 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-400">
            <span className="text-amber-400 font-bold">شركة MAHER للتسويق بالعمولة</span>
            <span>•</span>
            <span>المالك: السيد ماهر غالب سعد حسن</span>
            <span>•</span>
            <span className="text-red-400">هدف المليار (2030/6/6)</span>
          </div>

          <div className="flex items-center gap-3 text-slate-500 text-[11px]">
            <button
              onClick={() => setIsHotkeysOpen(true)}
              className="text-amber-400/80 hover:text-amber-300 transition-colors flex items-center gap-1 text-[11px] underline decoration-amber-500/30"
            >
              <Keyboard className="w-3.5 h-3.5" />
              <span>اختصارات لوحة المفاتيح [?]</span>
            </button>
            <span>•</span>
            <span>بروتوكول Code Ambis 4.6</span>
            <span>•</span>
            <span>إشراف الإدارة العامة (عبد المالك & كلود)</span>
          </div>
        </div>
      </footer>

      {/* Hotkeys Quick Reference Modal */}
      <HotkeysModal
        isOpen={isHotkeysOpen}
        onClose={() => setIsHotkeysOpen(false)}
        onNavigate={(tab) => navigateToTab(tab)}
      />
    </div>
  );
}
