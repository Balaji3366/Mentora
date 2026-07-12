export default function Footer() {
  return (
    <footer className="bg-black text-white py-12 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <h2 className="text-3xl font-bold text-blue-500">
            Mentora
          </h2>

          <p className="mt-4 text-gray-400">
            Your AI Mentor for learning, career growth,
            interview preparation, and success.
          </p>
        </div>

        {/* Product */}
        <div>
          <h3 className="font-semibold text-lg mb-4">
            Product
          </h3>

          <ul className="space-y-2 text-gray-400">
            <li className="hover:text-white cursor-pointer">AI Mentor</li>
            <li className="hover:text-white cursor-pointer">Roadmaps</li>
            <li className="hover:text-white cursor-pointer">Mock Interviews</li>
            <li className="hover:text-white cursor-pointer">Resume Builder</li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-semibold text-lg mb-4">
            Company
          </h3>

          <ul className="space-y-2 text-gray-400">
            <li className="hover:text-white cursor-pointer">About</li>
            <li className="hover:text-white cursor-pointer">Blog</li>
            <li className="hover:text-white cursor-pointer">Careers</li>
            <li className="hover:text-white cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="font-semibold text-lg mb-4">
            Follow Us
          </h3>

          <ul className="space-y-2 text-gray-400">
            <li className="hover:text-white cursor-pointer">LinkedIn</li>
            <li className="hover:text-white cursor-pointer">GitHub</li>
            <li className="hover:text-white cursor-pointer">Twitter</li>
            <li className="hover:text-white cursor-pointer">Discord</li>
          </ul>
        </div>

      </div>

      <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500">
        © 2026 Mentora. All rights reserved.
      </div>
    </footer>
  );
}