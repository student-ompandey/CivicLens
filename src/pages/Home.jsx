import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Issues from '../components/Issues';
import Testimonials from '../components/Testimonials';
import MapSection from '../components/MapSection';
import CTA from '../components/CTA';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <div style={{ height: '100px', width: '100%' }}></div>
      <Issues />
      <div style={{ height: '100px', width: '100%' }}></div>
      <Testimonials />
      <MapSection />
      <div style={{ height: '100px', width: '100%' }}></div>
      <CTA />
      <Footer />
    </>
  );
};

export default Home;
