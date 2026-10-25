import React from 'react';
import { Hero } from '../components/Hero';
import { CategoryCarousel } from '../components/CategoryCarousel';
import { FeaturedProducts } from '../components/FeaturedProducts';
import { BulkPromoBanner } from '../components/BulkPromoBanner';
import { PopularCategories } from '../components/PopularCategories';
import { TrustedBrands } from '../components/TrustedBrands';
import { TrendingProducts } from '../components/TrendingProducts';
import { ShopByIndustry } from '../components/ShopByIndustry';
import { MarketplaceBenefits } from '../components/MarketplaceBenefits';
import { SupplierPromotion } from '../components/SupplierPromotion';
import { PopularProductsByCategory } from '../components/PopularProductsByCategory';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { ArticlesSection } from '../components/ArticlesSection';
import { Newsletter } from '../components/Newsletter';

export const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* 1. Large Cinematic Hero Section matching uploaded reference design */}
      <Hero />


      {/* 3. Featured Industrial Products */}
      <FeaturedProducts />

      {/* 4. Special Offers & Bulk Purchase Promotional Banner */}
      <BulkPromoBanner />

      {/* 5. Popular Product Categories */}
      <PopularCategories />

      {/* 6. Trusted Brands Section */}
      <TrustedBrands />

      {/* 7. New Arrivals & Trending Products */}
      <TrendingProducts />

      {/* 8. Shop by Industry */}
      <ShopByIndustry />

      {/* 9. Marketplace Benefits & Purchasing Advantages */}
      <MarketplaceBenefits />

      {/* 10. Supplier & Wholesale Business Promotion */}
      <SupplierPromotion />

      {/* 11. Popular Products by Category */}
      <PopularProductsByCategory />

      {/* 12. Why Choose ForgeMarket Comparison */}
      <WhyChooseUs />

      {/* 13. Latest Industrial Articles & Buying Guides */}
      <ArticlesSection />

      {/* 14. Newsletter Subscription Section */}
      <Newsletter />
    </div>
  );
};
