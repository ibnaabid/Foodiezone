import Image from "next/image";
import Footer from "./Components/Footer";
import Hero from "./Components/Hero";
import Categories from "./Components/Categories";
import HighlightsSection from "./Components/Highlights";
import Statistics from "./Components/Static";
import Testimonials from "./Components/testimonial";
import CTA from "./Components/CTA";
import Blogs from "./Components/Blog";
import FAQ from "./Components/FAQ";
import Newsletter from "./Components/Newsletter";

export default function Home() {
  return (
    <>
    <Hero />
      <Categories />
      <HighlightsSection />
      <Statistics />
      
      {/* নতুন যোগ করা সেকশনগুলো */}
      <Testimonials />
      <CTA />
      <Blogs />
      <FAQ />
      <Newsletter />
      <Footer/>
    </>
  );
}
