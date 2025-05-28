
import { useState, useEffect, useRef } from 'react';
import { Header } from '@/components/Header';
import { BrowserWindow } from '@/components/BrowserWindow';
import { NetworkVisualization } from '@/components/NetworkVisualization';
import { TopicFilter } from '@/components/TopicFilter';
import { VisualizationControls } from '@/components/VisualizationControls';
import { StatsPanel } from '@/components/StatsPanel';

const Visualize = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [viewMode, setViewMode] = useState('network');
  const [isAnimating, setIsAnimating] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50">
      <BrowserWindow />
      <Header />
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-thin text-black mb-4 tracking-tight">
            Topic Network Visualization
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl">
            Explore the interconnected web of AI conversations, topics, and themes. 
            Watch as ideas flow and connect across the polylogos universe.
          </p>
        </div>

        {/* Controls Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <TopicFilter 
            selectedFilter={selectedFilter}
            onFilterChange={setSelectedFilter}
          />
          <VisualizationControls
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            isAnimating={isAnimating}
            onAnimationToggle={setIsAnimating}
          />
        </div>

        {/* Main Visualization Area */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Stats Panel */}
          <div className="lg:col-span-1">
            <StatsPanel selectedFilter={selectedFilter} />
          </div>

          {/* Main Visualization */}
          <div className="lg:col-span-3">
            <NetworkVisualization
              filter={selectedFilter}
              viewMode={viewMode}
              isAnimating={isAnimating}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Visualize;
