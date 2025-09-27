// file: src/app/services/page.tsx

export default function ServicesPage() {
  // Updated list of services with descriptions, no prices
  const services = [
    { name: "Haircut", description: "Precision cuts and modern styling tailored to you." },
    { name: "Hair Color", description: "From vibrant global colors to subtle highlights and balayage." },
    { name: "Keratin Treatment", description: "Achieve smooth, frizz-free, and manageable hair for months." },
    { name: "Smoothening", description: "Relax your curls and waves for a sleek, straight look." },
    { name: "Hair Spa", description: "Deep conditioning treatments to nourish and revitalize your hair." },
    { name: "Facial", description: "Rejuvenating facials customized to your skin type and needs." },
    { name: "Body Wax", description: "Gentle and effective waxing services for smooth, hair-free skin." },
  ];

  return (
    <div className="bg-white">
      <div className="container mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">Our Services</h1>
        <p className="text-center text-gray-600 mb-12">Quality, precision, and a touch of luxury.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => (
            <div key={service.name} className="bg-gray-50 p-8 rounded-lg border border-gray-200">
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">{service.name}</h3>
              <p className="text-gray-700">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}