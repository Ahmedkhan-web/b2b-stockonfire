import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { RFQModal } from './components/RFQModal';
import { CartDrawer } from './components/CartDrawer';
import { AccountModal } from './components/AccountModal';
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { WishlistPage } from './pages/WishlistPage';
import { CartPage } from './pages/CartPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { BecomeSupplierPage } from './pages/BecomeSupplierPage';
import { CheckCircle2 } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { activePage, toastMessage } = useShop();

  const renderCurrentPage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage />;
      case 'catalog':
        return <CatalogPage />;
      case 'product-detail':
        return <ProductDetailPage />;
      case 'wishlist':
        return <WishlistPage />;
      case 'cart':
        return <CartPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'become-supplier':
        return <BecomeSupplierPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F3EC] text-slate-800">
      {/* 1. Header (Announcement + Main Nav + Mobile Menu) */}
      <Header />

      {/* 2. Main Page Content */}
      <main className="flex-1">
        {renderCurrentPage()}
      </main>

      {/* 3. Comprehensive Footer */}
      <Footer />

      {/* 4. Global Modals & Drawers */}
      <ProductDetailModal />
      <RFQModal />
      <CartDrawer />
      <AccountModal />

      {/* 5. Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#0B192C] text-white px-4 py-3 rounded-xl shadow-2xl border border-slate-700 text-xs font-semibold animate-bounce-subtle">
          <CheckCircle2 className="w-4 h-4 text-orange-400 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export function App() {
  return (
    <ShopProvider>
      <MainLayout />
    </ShopProvider>
  );
}

export default App;
