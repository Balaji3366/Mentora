export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-10 py-6">
      <h1 className="text-3xl font-bold text-blue-600">
        Mentora
      </h1>

      <div className="flex items-center gap-8">
        <a href="#" className="hover:text-blue-600">Features</a>
        <a href="#" className="hover:text-blue-600">Roadmaps</a>
        <a href="#" className="hover:text-blue-600">About</a>

        <button className="rounded-xl bg-blue-600 px-5 py-2 text-white hover:bg-blue-700">
          Get Started
        </button>
      </div>
    </nav>
  );
}