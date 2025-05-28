
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw, Grid3X3, Network } from 'lucide-react';

interface VisualizationControlsProps {
  viewMode: string;
  onViewModeChange: (mode: string) => void;
  isAnimating: boolean;
  onAnimationToggle: (animate: boolean) => void;
}

export const VisualizationControls = ({ 
  viewMode, 
  onViewModeChange, 
  isAnimating, 
  onAnimationToggle 
}: VisualizationControlsProps) => {
  return (
    <div className="flex items-center gap-2">
      {/* View Mode Toggle */}
      <div className="flex bg-gray-800/50 rounded-lg p-1 backdrop-blur-sm">
        <Button
          onClick={() => onViewModeChange('network')}
          variant={viewMode === 'network' ? 'default' : 'ghost'}
          size="sm"
          className={viewMode === 'network' ? 'bg-purple-600 text-white' : 'text-gray-300 hover:text-white'}
        >
          <Network className="w-4 h-4 mr-1" />
          Network
        </Button>
        <Button
          onClick={() => onViewModeChange('grid')}
          variant={viewMode === 'grid' ? 'default' : 'ghost'}
          size="sm"
          className={viewMode === 'grid' ? 'bg-purple-600 text-white' : 'text-gray-300 hover:text-white'}
        >
          <Grid3X3 className="w-4 h-4 mr-1" />
          Grid
        </Button>
      </div>

      {/* Animation Controls */}
      <div className="flex gap-1">
        <Button
          onClick={() => onAnimationToggle(!isAnimating)}
          variant="outline"
          size="sm"
          className="bg-gray-800/50 text-gray-300 border-gray-600 hover:bg-gray-700/50 backdrop-blur-sm"
        >
          {isAnimating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="bg-gray-800/50 text-gray-300 border-gray-600 hover:bg-gray-700/50 backdrop-blur-sm"
        >
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
