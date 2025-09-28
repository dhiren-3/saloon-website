// file: src/app/gallery/page.tsx
import Image from 'next/image';

export default function GalleryPage() {
  // The fix is here: we explicitly define the type as string[]
  const imageUrls: string[] = [
    "/gallery1.jpeg",
    "/gallery2.jpeg",
    "/gallery3.jpeg",
    "/gallery4.jpeg",
    "/gallery5.jpeg",
    "/gallery6.jpeg",
  ];

  return (
    <div className="bg-white">
      <div className="container mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">Our Gallery</h1>
        <p className="text-center text-gray-600 mb-12">A glimpse into our space and our work.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {imageUrls.map((url, index) => (
            <div key={index} className="overflow-hidden rounded-lg shadow-lg">
              <Image 
                src={url} 
                alt={`Salon gallery image ${index + 1}`} 
                width={500}
                height={500}
                className="w-full h-full object-cover aspect-square transition-transform duration-300 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}