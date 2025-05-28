
import { Search, PlusCircle, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const Header = () => {
  const location = useLocation();
  
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-200 flex items-center justify-center">
                <span className="text-purple-400 font-medium text-2xl tracking-wider leading-none flex items-center justify-center" style={{ marginTop: '-17%' }}>p</span>
              </div>
              <h1 className="text-2xl font-medium text-black tracking-wide">
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
                  ? 'text-black font-medium' 
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/explore" 
              className={`text-sm tracking-wide uppercase transition-colors ${
                location.pathname === '/explore' 
                  ? 'text-black font-medium' 
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              Explore
            </Link>
            <Link 
              to="/visualize" 
              className={`text-sm tracking-wide uppercase transition-colors ${
                location.pathname === '/visualize' 
                  ? 'text-black font-medium' 
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              Visualize
            </Link>
            <Link 
              to="/seminars" 
              className={`text-sm tracking-wide uppercase transition-colors ${
                location.pathname === '/seminars' 
                  ? 'text-black font-medium' 
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              Seminars
            </Link>
            <Link 
              to="/posting" 
              className={`text-sm tracking-wide uppercase transition-colors ${
                location.pathname === '/posting' 
                  ? 'text-black font-medium' 
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              Share
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 bg-white text-sm focus:ring-1 focus:ring-black focus:border-black transition-all"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            <Link to="/posting">
              <button className="flex items-center space-x-2 bg-black text-white px-4 py-2.5 font-medium text-sm tracking-wide hover:bg-gray-800 transition-colors">
                <PlusCircle className="w-4 h-4" />
                <span className="hidden sm:block uppercase">Share</span>
              </button>
            </Link>
            <button className="p-2.5 text-gray-600 hover:text-black transition-colors">
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
