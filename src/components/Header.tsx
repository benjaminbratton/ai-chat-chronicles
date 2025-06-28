
import { Search, PlusCircle, Instagram, Linkedin } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from '@/hooks/useAuth';
import { UserMenu } from './UserMenu';
import { AuthButtons } from './AuthButtons';

interface HeaderProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  onSearchSubmit?: () => void;
}

export const Header = ({ searchQuery = "", onSearchChange, onSearchSubmit }: HeaderProps) => {
  const location = useLocation();
  const { user, loading } = useAuth();

  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearchSubmit) {
      onSearchSubmit();
    }
  };
  
  return (
    <header className="bg-white border-b border-gray-200">
      {/* Top logo section */}
      <div className="max-w-6xl mx-auto px-6 pt-4">
        <div className="flex justify-between items-center mb-4">
          <img 
            src="/lovable-uploads/6d0b0b90-2ccb-48c9-a546-f7589d6fa23d.png" 
            alt="Antikythera Logo" 
            className="h-12 object-contain"
          />
          
          {/* Social Media Icons */}
          <div className="flex items-center space-x-4">
            <a 
              href="https://twitter.com/polylogos" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-black transition-colors"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a 
              href="https://instagram.com/polylogos" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-pink-500 transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a 
              href="https://substack.com/polylogos" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-orange-500 transition-colors"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
              </svg>
            </a>
            <a 
              href="https://linkedin.com/company/polylogos" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-700 transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
      
      {/* Main header content */}
      <div className="max-w-6xl mx-auto px-6 pb-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-3">
              <h1 className="text-2xl font-bold text-purple-800 tracking-tight">
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
              to="/about" 
              className={`text-sm tracking-wide uppercase transition-colors ${
                location.pathname === '/about' 
                  ? 'text-black font-medium' 
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              About
            </Link>
            {user && (
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
            )}
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => onSearchChange?.(e.target.value)}
                onKeyPress={handleSearchKeyPress}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 bg-white text-sm focus:ring-1 focus:ring-black focus:border-black transition-all"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            {user && (
              <Link to="/posting">
                <button className="flex items-center space-x-2 bg-black text-white px-4 py-2.5 font-medium text-sm tracking-wide hover:bg-gray-800 transition-colors">
                  <PlusCircle className="w-4 h-4" />
                  <span className="hidden sm:block uppercase">Share</span>
                </button>
              </Link>
            )}
            
            {loading ? (
              <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
            ) : user ? (
              <UserMenu />
            ) : (
              <AuthButtons />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
