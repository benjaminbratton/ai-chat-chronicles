
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export const AuthButtons = () => {
  return (
    <div className="flex items-center space-x-3">
      <Link to="/login">
        <Button variant="ghost" className="text-sm font-medium">
          Sign In
        </Button>
      </Link>
      <Link to="/signup">
        <Button className="bg-black text-white hover:bg-gray-800 text-sm font-medium">
          Sign Up
        </Button>
      </Link>
    </div>
  );
};
