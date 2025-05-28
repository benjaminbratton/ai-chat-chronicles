
import { Search, PlusCircle, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const Header = () => {
  const location = useLocation();
  
  return (
    <header className="bg-background/95 backdrop-blur-lg border-b border-border/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-br from-white to-gray-300 flex items-center justify-center transform rotate-45">
                <span className="text-black font-medium text-lg mono transform -rotate-45">p</span>
              </div>
              <h1 className="text-xl font-light text-foreground tracking-wider mono">
                polylogos
              </h1>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-16 ml-20">
            <Link 
              to="/" 
              className={`text-xs tracking-widest uppercase transition-all duration-200 relative ${
                location.pathname === '/' 
                  ? 'text-foreground font-medium' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Home
              {location.pathname === '/' && (
                <div className="absolute -bottom-1 left-0 w-full h-px bg-foreground"></div>
              )}
            </Link>
            <Link 
              to="/explore" 
              className={`text-xs tracking-widest uppercase transition-all duration-200 relative ${
                location.pathname === '/explore' 
                  ? 'text-foreground font-medium' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Explore
              {location.pathname === '/explore' && (
                <div className="absolute -bottom-1 left-0 w-full h-px bg-foreground"></div>
              )}
            </Link>
            <Link 
              to="/visualize" 
              className={`text-xs tracking-widest uppercase transition-all duration-200 relative ${
                location.pathname === '/visualize' 
                  ? 'text-foreground font-medium' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Visualize
              {location.pathname === '/visualize' && (
                <div className="absolute -bottom-1 left-0 w-full h-px bg-foreground"></div>
              )}
            </Link>
            <Link 
              to="/posting" 
              className={`text-xs tracking-widest uppercase transition-all duration-200 relative ${
                location.pathname === '/posting' 
                  ? 'text-foreground font-medium' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Share
              {location.pathname === '/posting' && (
                <div className="absolute -bottom-1 left-0 w-full h-px bg-foreground"></div>
              )}
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full pl-10 pr-4 py-2.5 bg-card/50 border border-border text-sm focus:ring-1 focus:ring-foreground/20 focus:border-foreground/30 transition-all backdrop-blur-sm"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            <Link to="/posting">
              <button className="flex items-center space-x-2 bg-foreground text-background px-4 py-2.5 font-medium text-xs tracking-widest hover:bg-foreground/90 transition-all duration-200 industrial-border">
                <PlusCircle className="w-4 h-4" />
                <span className="hidden sm:block uppercase mono">Share</span>
              </button>
            </Link>
            <button className="p-2.5 text-muted-foreground hover:text-foreground transition-colors industrial-border bg-card/20">
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
