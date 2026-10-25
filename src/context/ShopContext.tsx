import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { Product, CartItem, ActivePage } from '../types';
import { PRODUCTS } from '../data/products';

interface ShopContextType {
  cart: CartItem[];
  wishlist: string[];
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  rfqModalOpen: boolean;
  rfqProduct: Product | null;
  openRFQModal: (product?: Product) => void;
  closeRFQModal: () => void;
  accountModalOpen: boolean;
  setAccountModalOpen: (open: boolean) => void;
  cartDrawerOpen: boolean;
  setCartDrawerOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategoryFilter: string;
  setSelectedCategoryFilter: (slug: string) => void;
  selectedBrandFilter: string;
  setSelectedBrandFilter: (brand: string) => void;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  cartTotal: number;
  cartCount: number;
  currency: string;
  setCurrency: (c: string) => void;
  navigateToProduct: (product: Product) => void;
  navigateToCategory: (categorySlug: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load state from localStorage if available
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('forgemarket_cart');
      return saved ? JSON.parse(saved) : [
        { product: PRODUCTS[0], quantity: 2 },
        { product: PRODUCTS[4], quantity: 1 }
      ];
    } catch {
      return [{ product: PRODUCTS[0], quantity: 2 }];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('forgemarket_wishlist');
      return saved ? JSON.parse(saved) : ['prod-cctv-01', 'prod-plc-02'];
    } catch {
      return ['prod-cctv-01'];
    }
  });

  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [rfqModalOpen, setRfqModalOpen] = useState(false);
  const [rfqProduct, setRfqProduct] = useState<Product | null>(null);
  const [accountModalOpen, setAccountModalOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('');
  const [selectedBrandFilter, setSelectedBrandFilter] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('forgemarket_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('forgemarket_wishlist', JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  // Scroll to top on page switch
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage, selectedProduct]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => prev === msg ? null : prev);
    }, 3800);
  };

  const addToCart = (product: Product, quantity = 1) => {
    const qtyToAdd = Math.max(quantity, product.moq || 1);
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + qtyToAdd }
            : item
        );
      }
      return [...prev, { product, quantity: qtyToAdd }];
    });
    showToast(`Added ${qtyToAdd}x ${product.name.slice(0, 32)}... to cart`);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
    showToast('Item removed from cart');
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from saved items');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Saved to procurement wishlist');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const openRFQModal = (product?: Product) => {
    setRfqProduct(product || null);
    setRfqModalOpen(true);
  };

  const closeRFQModal = () => {
    setRfqModalOpen(false);
    setRfqProduct(null);
  };

  const navigateToProduct = (product: Product) => {
    setSelectedProduct(product);
    setActivePage('product-detail');
  };

  const navigateToCategory = (categorySlug: string) => {
    setSelectedCategoryFilter(categorySlug);
    setActivePage('catalog');
  };

  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [cart]);

  const cartCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  return (
    <ShopContext.Provider
      value={{
        cart,
        wishlist,
        activePage,
        setActivePage,
        selectedProduct,
        setSelectedProduct,
        quickViewProduct,
        setQuickViewProduct,
        rfqModalOpen,
        rfqProduct,
        openRFQModal,
        closeRFQModal,
        accountModalOpen,
        setAccountModalOpen,
        cartDrawerOpen,
        setCartDrawerOpen,
        searchQuery,
        setSearchQuery,
        selectedCategoryFilter,
        setSelectedCategoryFilter,
        selectedBrandFilter,
        setSelectedBrandFilter,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        toastMessage,
        showToast,
        cartTotal,
        cartCount,
        currency,
        setCurrency,
        navigateToProduct,
        navigateToCategory,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
