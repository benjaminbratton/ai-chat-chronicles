
import { Search, PlusCircle, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const Header = () => {
  const location = useLocation();
  
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <h1 className="text-2xl font-light text-gray-900 tracking-wide">
                polylogos
              </h1>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/' 
                  ? 'text-gray-900 border-b border-gray-900 pb-1' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/explore" 
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/explore' 
                  ? 'text-gray-900 border-b border-gray-900 pb-1' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Explore
            </Link>
            <Link 
              to="/visualize" 
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/visualize' 
                  ? 'text-gray-900 border-b border-gray-900 pb-1' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Visualize
            </Link>
            <Link 
              to="/seminars" 
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/seminars' 
                  ? 'text-gray-900 border-b border-gray-900 pb-1' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Seminars
            </Link>
            <Link 
              to="/posting" 
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/posting' 
                  ? 'text-gray-900 border-b border-gray-900 pb-1' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Share
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-300 text-sm focus:outline-none focus:border-gray-500 transition-colors w-64"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Link to="/posting">
              <button className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
                Share
              </button>
            </Link>
            <button className="text-gray-600 hover:text-gray-900 transition-colors">
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
