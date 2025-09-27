// file: src/app/contact/page.tsx

export default function ContactPage() {
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-6">

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800">Get In Touch</h1>
          <p className="text-gray-600 mt-2">We&apos;d love to hear from you. Reach out with any questions or to book a consultation.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* Contact Information */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-800">Address</h3>
              <p className="text-gray-600 mt-1">Grace Unisex Saloon, Paras Downtown Square Mall, Zirakpur, Punjab</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800">Email</h3>
              <p className="text-gray-600 mt-1">nadimkhan9888@gmail.com</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800">Phone</h3>
              <p className="text-gray-600 mt-1">+91 98887 18416</p>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <form className="bg-gray-50 p-8 rounded-lg border border-gray-200">
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Your Name</label>
                <input type="text" id="name" name="name" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Your Email</label>
                <input type="email" id="email" name="email" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">Message</label>
                <textarea id="message" name="message" rows={5} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"></textarea>
              </div>
              <button type="submit" className="w-full bg-gray-900 text-white font-bold py-3 px-4 rounded-md hover:bg-gray-700 transition-colors">
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}