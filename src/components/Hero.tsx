// file: src/components/Hero.tsx

export default function Hero() {
  return (
    <section className="relative h-[60vh] flex items-center justify-center text-center text-white">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1599387737255-36a72149b502?q=80&w=2070')" }}></div>
      <div className="relative z-10 px-4">
        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-4">
          Experience a New Level of Style
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Your personal retreat for beauty and wellness.
        </p>
        <a 
          href="/book" 
          className="bg-emerald-500 text-white font-bold px-8 py-3 rounded-md hover:bg-emerald-600 transition-colors text-lg"
        >
          Book Your Appointment
        </a>
      </div>
    </section>
  );
}