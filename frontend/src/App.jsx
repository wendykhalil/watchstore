import Navbar from './components/store/Navbar';
import Hero from './components/store/Hero';
import Collection from './components/store/Collection';
import { VideoSection, BentoSection, StorySection, CTASection, Footer } from './components/store/Sections';
import CartDrawer from './components/store/CartDrawer';
import FavoritesDrawer from './components/store/FavoritesDrawer';
import SearchOverlay from './components/store/SearchOverlay';
import ProductModal from './components/store/ProductModal';
import CheckoutModal from './components/store/CheckoutModal';

export default function App() {
  return (
    <div className="bg-[#0A0A0A] text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <Collection />
      <VideoSection />
      <BentoSection />
      <StorySection />
      <CTASection />
      <Footer />
      
      {/* UI Components - Drawers & Modal */}
      <CartDrawer />
      <FavoritesDrawer />
      <SearchOverlay />
      <ProductModal />
      <CheckoutModal />
    </div>
  );
}
