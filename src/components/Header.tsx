
import { Search, PlusCircle, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const Header = () => {
  const location = useLocation();
  
  return (
    <header className="bg-gray-900 border-b border-gray-700 shadow-xl">
      {/* Top logo section */}
      <div className="max-w-6xl mx-auto px-6 pt-6">
        <div className="flex justify-start mb-6">
          <img 
            src="/lovable-uploads/6d0b0b90-2ccb-48c9-a546-f7589d6fa23d.png" 
            alt="Antikythera Logo" 
            className="h-24 object-contain"
          />
        </div>
      </div>
      
      {/* Main header content */}
      <div className="max-w-6xl mx-auto px-6 pb-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-3">
              <h1 className="text-4xl font-medium text-purple-300 tracking-wide">
                polylogos
              </h1>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-12 ml-16">
            <Link 
              to="/" 
              className={`text-sm tracking-wide uppercase transition-colors ${
                location.pathname === '/' 
                  ? 'text-white font-medium' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/explore" 
              className={`text-sm tracking-wide uppercase transition-colors ${
                location.pathname === '/explore' 
                  ? 'text-white font-medium' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Explore
            </Link>
            <Link 
              to="/visualize" 
              className={`text-sm tracking-wide uppercase transition-colors ${
                location.pathname === '/visualize' 
                  ? 'text-white font-medium' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Visualize
            </Link>
            <Link 
              to="/seminars" 
              className={`text-sm tracking-wide uppercase transition-colors ${
                location.pathname === '/seminars' 
                  ? 'text-white font-medium' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Seminars
            </Link>
            <Link 
              to="/posting" 
              className={`text-sm tracking-wide uppercase transition-colors ${
                location.pathname === '/posting' 
                  ? 'text-white font-medium' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Share
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-600 bg-gray-800 text-white text-sm focus:ring-1 focus:ring-purple-400 focus:border-purple-400 transition-all placeholder-gray-400"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            <Link to="/posting">
              <button className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2.5 font-medium text-sm tracking-wide hover:bg-purple-700 transition-colors">
                <PlusCircle className="w-4 h-4" />
                <span className="hidden sm:block uppercase">Share</span>
              </button>
            </Link>
            <button className="p-2.5 text-gray-300 hover:text-white transition-colors">
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
