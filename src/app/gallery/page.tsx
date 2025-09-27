// file: src/app/gallery/page.tsx

export default function GalleryPage() {
  // We'll use placeholder images for now. Later, you can replace the links.
  const imageUrls = [
    "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=2070",
    "https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=1932",
    "https://images.unsplash.com/photo-1599387737255-36a72149b502?q=80&w=2070",
    "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070",
    "https://images.unsplash.com/photo-1559599238-3087932314b8?q=80&w=2070",
    "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?q=80&w=2074",
  ];

  return (
    <div className="bg-white">
      <div className="container mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">Our Gallery</h1>
        <p className="text-center text-gray-600 mb-12">A glimpse into our space and our work.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {imageUrls.map((url, index) => (
            <div key={index} className="overflow-hidden rounded-lg shadow-lg">
              <img
                src={url}
                alt={`Saloon gallery image ${index + 1}`}
                className="w-full h-full object-cover aspect-square transition-transform duration-300 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}