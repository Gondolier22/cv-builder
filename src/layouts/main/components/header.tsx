import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4 print:hidden">
      <Link to="/" className="flex gap-2 items-center">
        <img src="/logo.webp" alt="CV Builder Logo" className="h-8" />
        <p className="text-lg font-semibold text-white">CV Builder</p>
      </Link>
    </header>
  );
};

export default Header;
