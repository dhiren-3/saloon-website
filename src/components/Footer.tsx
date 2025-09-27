// file: src/components/Footer.tsx

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-6 text-center">
        <p>&copy; {new Date().getFullYear()} Grace Unisex Saloon. All Rights Reserved.</p>
        <p className="mt-2">123 Beauty Lane, Style City, India</p>
        <div className="mt-4">
          <a href="#" className="px-3 hover:text-emerald-400">Facebook</a>
          <a href="#" className="px-3 hover:text-emerald-400">Instagram</a>
          <a href="#" className="px-3 hover:text-emerald-400">Twitter</a>
        </div>
      </div>
    </footer>
  );
}