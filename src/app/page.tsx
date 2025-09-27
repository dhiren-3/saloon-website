// file: src/app/page.tsx

import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Hero />

      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Services</h2>
          <p className="text-lg text-gray-600">
            (A preview of your amazing services will go here.)
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}