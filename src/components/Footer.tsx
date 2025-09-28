// file: src/components/Footer.tsx

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-6 text-center">
        <p>&copy; {new Date().getFullYear()} Grace Unisex Salon. All Rights Reserved.</p>
        <p className="mt-2">Paras Downtown Mall, Zirakpur, Punjab</p>
        <div className="mt-4">
          
          <a href="https://www.instagram.com/gracehairsalon2023/?hl=am-et" className="px-3 hover:text-emerald-400">Instagram</a>
          
        </div>
      </div>
    </footer>
  );
}