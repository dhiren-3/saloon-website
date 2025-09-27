// file: src/app/page.tsx

import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Hero />

      <section className="py-20 bg-white">
  <div className="container mx-auto px-6 text-center">
    <h2 className="text-4xl font-bold text-gray-800 mb-4">Popular Services</h2>
    <p className="text-lg text-gray-600 mb-12">Just a glimpse of what we offer. Visit our services page for the full menu.</p>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
      {/* Service 1 */}
      <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Haircut & Style</h3>
        <p className="text-gray-700">Precision cuts and modern styling tailored to you.</p>
      </div>
      {/* Service 2 */}
      <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Advanced Color</h3>
        <p className="text-gray-700">From vibrant global colors to subtle highlights and balayage.</p>
      </div>
      {/* Service 3 */}
      <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Keratin Therapy</h3>
        <p className="text-gray-700">Achieve smooth, frizz-free, and manageable hair for months.</p>
      </div>
    </div>

    <a href="/services" className="mt-12 inline-block bg-gray-800 text-white font-bold px-8 py-3 rounded-md hover:bg-gray-700 transition-colors">
      View All Services
    </a>
  </div>
</section>

      <Footer />
    </>
  );
}