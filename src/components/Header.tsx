import { Search, PlusCircle, Instagram, Linkedin, Youtube } from "lucide-react";
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
              href="https://youtube.com/@polylogos" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-red-500 transition-colors"
            >
              <Youtube className="w-5 h-5" />
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
            <a 
              href="https://chat.whatsapp.com/polylogos" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-green-500 transition-colors"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.525 3.488"/>
              </svg>
            </a>
            <a 
              href="https://discord.gg/polylogos" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-indigo-500 transition-colors"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0189 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z"/>
              </svg>
            </a>
            <a 
              href="https://line.me/ti/g2/polylogos" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-green-400 transition-colors"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.070 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
              </svg>
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
          <nav className="hidden md:flex items-center space-x-6 ml-16">
            <Link 
              to="/" 
              className={`text-sm tracking-wide uppercase transition-all duration-500 transform ${
                location.pathname === '/' 
                  ? 'text-black font-bold scale-110 bg-gradient-to-r from-purple-100 to-blue-100 px-4 py-2 rounded-full shadow-lg border-2 border-purple-200' 
                  : 'text-gray-600 hover:text-black hover:font-semibold hover:scale-110 hover:bg-gradient-to-r hover:from-gray-100 hover:to-purple-50 hover:px-4 hover:py-2 hover:rounded-full hover:shadow-lg hover:border-2 hover:border-gray-200 px-2 py-1'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/explore" 
              className={`text-sm tracking-wide uppercase transition-all duration-500 transform ${
                location.pathname === '/explore' 
                  ? 'text-black font-bold scale-110 bg-gradient-to-r from-purple-100 to-blue-100 px-4 py-2 rounded-full shadow-lg border-2 border-purple-200' 
                  : 'text-gray-600 hover:text-black hover:font-semibold hover:scale-110 hover:bg-gradient-to-r hover:from-gray-100 hover:to-purple-50 hover:px-4 hover:py-2 hover:rounded-full hover:shadow-lg hover:border-2 hover:border-gray-200 px-2 py-1'
              }`}
            >
              Explore
            </Link>
            <Link 
              to="/posting" 
              className={`text-sm tracking-wide uppercase transition-all duration-500 transform ${
                location.pathname === '/posting' 
                  ? 'text-black font-bold scale-110 bg-gradient-to-r from-purple-100 to-blue-100 px-4 py-2 rounded-full shadow-lg border-2 border-purple-200' 
                  : 'text-gray-600 hover:text-black hover:font-semibold hover:scale-110 hover:bg-gradient-to-r hover:from-gray-100 hover:to-purple-50 hover:px-4 hover:py-2 hover:rounded-full hover:shadow-lg hover:border-2 hover:border-gray-200 px-2 py-1'
              }`}
            >
              Share
            </Link>
            <Link 
              to="/model" 
              className={`text-sm tracking-wide uppercase transition-all duration-500 transform ${
                location.pathname === '/model' 
                  ? 'text-black font-bold scale-110 bg-gradient-to-r from-purple-100 to-blue-100 px-4 py-2 rounded-full shadow-lg border-2 border-purple-200' 
                  : 'text-gray-600 hover:text-black hover:font-semibold hover:scale-110 hover:bg-gradient-to-r hover:from-gray-100 hover:to-purple-50 hover:px-4 hover:py-2 hover:rounded-full hover:shadow-lg hover:border-2 hover:border-gray-200 px-2 py-1'
              }`}
            >
              Model
            </Link>
            <Link 
              to="/visualize" 
              className={`text-sm tracking-wide uppercase transition-all duration-500 transform ${
                location.pathname === '/visualize' 
                  ? 'text-black font-bold scale-110 bg-gradient-to-r from-purple-100 to-blue-100 px-4 py-2 rounded-full shadow-lg border-2 border-purple-200' 
                  : 'text-gray-600 hover:text-black hover:font-semibold hover:scale-110 hover:bg-gradient-to-r hover:from-gray-100 hover:to-purple-50 hover:px-4 hover:py-2 hover:rounded-full hover:shadow-lg hover:border-2 hover:border-gray-200 px-2 py-1'
              }`}
            >
              Visualize
            </Link>
            <Link 
              to="/seminars" 
              className={`text-sm tracking-wide uppercase transition-all duration-500 transform ${
                location.pathname === '/seminars' 
                  ? 'text-black font-bold scale-110 bg-gradient-to-r from-purple-100 to-blue-100 px-4 py-2 rounded-full shadow-lg border-2 border-purple-200' 
                  : 'text-gray-600 hover:text-black hover:font-semibold hover:scale-110 hover:bg-gradient-to-r hover:from-gray-100 hover:to-purple-50 hover:px-4 hover:py-2 hover:rounded-full hover:shadow-lg hover:border-2 hover:border-gray-200 px-2 py-1'
              }`}
            >
              Seminars
            </Link>
            <Link 
              to="/about" 
              className={`text-sm tracking-wide uppercase transition-all duration-500 transform ${
                location.pathname === '/about' 
                  ? 'text-black font-bold scale-110 bg-gradient-to-r from-purple-100 to-blue-100 px-4 py-2 rounded-full shadow-lg border-2 border-purple-200' 
                  : 'text-gray-600 hover:text-black hover:font-semibold hover:scale-110 hover:bg-gradient-to-r hover:from-gray-100 hover:to-purple-50 hover:px-4 hover:py-2 hover:rounded-full hover:shadow-lg hover:border-2 hover:border-gray-200 px-2 py-1'
              }`}
            >
              About
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
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
