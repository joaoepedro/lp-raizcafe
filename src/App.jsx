import { useRef } from 'react';
import { ConsentProvider } from './lib/consent';
import { CartProvider } from './lib/cart';
import Header from './components/Header';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import PourLine from './components/PourLine';
import Origin from './components/Origin';
import Products from './components/Products';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import Comparison from './components/Comparison';
import Offer from './components/Offer';
import FAQ from './components/FAQ';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import StickyMobileCTA from './components/StickyMobileCTA';
import CartDrawer from './components/CartDrawer';

export default function App() {
  const pageRef = useRef(null);

  return (
    <ConsentProvider>
      <CartProvider>
        <div ref={pageRef} className="font-body">
          <PourLine targetRef={pageRef} />
          <Header />
          <main>
            <Hero />
            <TrustBar />
            <Origin />
            <Products />
            <Process />
            <Testimonials />
            <Comparison />
            <Offer />
            <FAQ />
            <Newsletter />
          </main>
          <Footer />
          <WhatsAppButton />
          <StickyMobileCTA />
          <CartDrawer />
        </div>
      </CartProvider>
    </ConsentProvider>
  );
}
