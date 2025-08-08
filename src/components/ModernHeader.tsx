import { Search, ArrowLeft } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from '@/hooks/useAuthSimple';
import { UserMenu } from './UserMenu';
import { AuthButtons } from './AuthButtons';

interface ModernHeaderProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  onSearchSubmit?: () => void;
  showBackButton?: boolean;
  onBackClick?: () => void;
}

export const ModernHeader = ({ 
  searchQuery = "", 
  onSearchChange, 
  onSearchSubmit,
  showBackButton = false,
  onBackClick 
}: ModernHeaderProps) => {
  const location = useLocation();
  const { user, loading } = useAuth();

  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearchSubmit) {
      onSearchSubmit();
    }
  };
  
  return (
    <header className="bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left side - Logo and back button */}
          <div className="flex items-center space-x-4">
            {showBackButton && (
              <button
                onClick={onBackClick}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            
            <Link to="/" className="text-xl font-semibold text-foreground">
              alogia
            </Link>
          </div>
          
          {/* Center - Search bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Find posts where GPT 4o argued with Claude about metaphysics"
                value={searchQuery}
                onChange={(e) => onSearchChange?.(e.target.value)}
                onKeyPress={handleSearchKeyPress}
                className="w-full pl-10 pr-4 py-2 bg-secondary border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
          
          {/* Right side - User menu or auth buttons */}
          <div className="flex items-center space-x-4">
            {user ? (
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
