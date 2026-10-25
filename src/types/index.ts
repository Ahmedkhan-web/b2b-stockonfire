export interface Product {
  id: string;
  name: string;
  partNumber: string;
  category: string;
  categorySlug: string;
  brand: string;
  image: string;
  price: number;
  isQuoteOnly?: boolean;
  moq: number; // Minimum Order Quantity
  moqUnit: string; // e.g. "Units", "Sets", "Pallets"
  leadTime: string; // e.g. "3-5 Business Days"
  inStock: boolean;
  stockCount?: number;
  rating: number;
  reviewCount: number;
  shortSpecs: string[];
  fullSpecs: Record<string, string>;
  description: string;
  certifications: string[]; // e.g. ["ISO 9001", "CE", "UL Listed", "RoHS"]
  volumePricing?: {
    range: string;
    pricePerUnit: number;
  }[];
  origin: string;
  warranty: string;
  featured?: boolean;
  trending?: boolean;
  newArrival?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  itemCount: number;
  iconImage: string;
  description: string;
  featured?: boolean;
  popularSubcategories?: string[];
}

export interface Brand {
  id: string;
  name: string;
  country: string;
  category: string;
  productCount: number;
  badge?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Article {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
  excerpt: string;
  author: string;
  authorRole: string;
}

export type ActivePage = 
  | 'home' 
  | 'catalog' 
  | 'product-detail' 
  | 'wishlist' 
  | 'cart' 
  | 'about' 
  | 'contact' 
  | 'become-supplier';

export interface RFQFormData {
  productId?: string;
  productName?: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  quantity: number;
  targetPrice?: string;
  deliveryDate?: string;
  notes: string;
  shippingCountry: string;
}
