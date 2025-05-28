
import { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';

interface Node {
  id: string;
  label: string;
  category: string;
  size: number;
  connections: number;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
}

interface Link {
  source: string;
  target: string;
  strength: number;
}

interface NetworkVisualizationProps {
  filter: string;
  viewMode: string;
  isAnimating: boolean;
}

export const NetworkVisualization = ({ filter, viewMode, isAnimating }: NetworkVisualizationProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [hoveredNode, setHoveredNode] = useState<Node | null>(null);

  // Mock data for demonstration
  const nodes: Node[] = [
    { id: '1', label: 'AI Ethics', category: 'Philosophy', size: 25, connections: 8 },
    { id: '2', label: 'Machine Learning', category: 'Technology', size: 30, connections: 12 },
    { id: '3', label: 'Neural Networks', category: 'Technology', size: 22, connections: 7 },
    { id: '4', label: 'Privacy', category: 'Society', size: 18, connections: 5 },
    { id: '5', label: 'Automation', category: 'Economics', size: 20, connections: 6 },
    { id: '6', label: 'Consciousness', category: 'Philosophy', size: 15, connections: 4 },
    { id: '7', label: 'Data Science', category: 'Technology', size: 28, connections: 10 },
    { id: '8', label: 'Future Work', category: 'Society', size: 16, connections: 3 },
    { id: '9', label: 'Robotics', category: 'Technology', size: 24, connections: 9 },
    { id: '10', label: 'Climate Change', category: 'Environment', size: 19, connections: 5 },
  ];

  const links: Link[] = [
    { source: '1', target: '2', strength: 0.8 },
    { source: '2', target: '3', strength: 0.9 },
    { source: '1', target: '4', strength: 0.6 },
    { source: '2', target: '7', strength: 0.7 },
    { source: '5', target: '8', strength: 0.5 },
    { source: '1', target: '6', strength: 0.4 },
    { source: '9', target: '2', strength: 0.6 },
    { source: '10', target: '5', strength: 0.3 },
    { source: '7', target: '9', strength: 0.5 },
    { source: '4', target: '8', strength: 0.4 },
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      'Technology': '#9CA3AF',
      'Philosophy': '#A78BFA',
      'Society': '#86EFAC',
      'Economics': '#FDE047',
      'Environment': '#67E8F9',
    };
    return colors[category as keyof typeof colors] || '#9CA3AF';
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    // Initialize node positions
    nodes.forEach(node => {
      if (!node.x) node.x = Math.random() * rect.width;
      if (!node.y) node.y = Math.random() * rect.height;
      if (!node.vx) node.vx = 0;
      if (!node.vy) node.vy = 0;
    });

    const draw = () => {
      // Clear with light background
      ctx.fillStyle = '#f9fafb';
      ctx.fillRect(0, 0, rect.width, rect.height);

      // Draw links
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.lineWidth = 1;
      links.forEach(link => {
        const sourceNode = nodes.find(n => n.id === link.source);
        const targetNode = nodes.find(n => n.id === link.target);
        if (sourceNode && targetNode && sourceNode.x && sourceNode.y && targetNode.x && targetNode.y) {
          ctx.beginPath();
          ctx.moveTo(sourceNode.x, sourceNode.y);
          ctx.lineTo(targetNode.x, targetNode.y);
          ctx.globalAlpha = link.strength * 0.3;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      });

      // Draw nodes
      nodes.forEach(node => {
        if (!node.x || !node.y) return;
        
        const isHovered = hoveredNode?.id === node.id;
        const isSelected = selectedNode?.id === node.id;
        
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size * (isHovered ? 1.2 : 1), 0, 2 * Math.PI);
        
        // Node fill
        ctx.fillStyle = getCategoryColor(node.category);
        ctx.globalAlpha = isSelected ? 0.7 : 0.5;
        ctx.fill();
        
        // Node border
        ctx.strokeStyle = isHovered ? '#6B7280' : 'rgba(0, 0, 0, 0.1)';
        ctx.lineWidth = isHovered ? 2 : 1;
        ctx.stroke();
        ctx.globalAlpha = 1;

        // Node label
        if (isHovered || isSelected) {
          ctx.fillStyle = '#4B5563';
          ctx.font = '12px Inter, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(node.label, node.x, node.y - node.size - 10);
        }
      });
    };

    const simulate = () => {
      if (!isAnimating) return;

      // Simple force simulation
      nodes.forEach(node => {
        if (!node.x || !node.y || !node.vx || !node.vy) return;

        // Center force
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        node.vx += (centerX - node.x) * 0.0001;
        node.vy += (centerY - node.y) * 0.0001;

        // Repulsion between nodes
        nodes.forEach(other => {
          if (other.id === node.id || !other.x || !other.y) return;
          const dx = node.x - other.x;
          const dy = node.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 100) {
            const force = 50 / (distance * distance);
            node.vx += (dx / distance) * force;
            node.vy += (dy / distance) * force;
          }
        });

        // Apply velocity
        node.x += node.vx;
        node.y += node.vy;
        node.vx *= 0.99;
        node.vy *= 0.99;

        // Keep in bounds
        node.x = Math.max(node.size, Math.min(rect.width - node.size, node.x));
        node.y = Math.max(node.size, Math.min(rect.height - node.size, node.y));
      });
    };

    const animate = () => {
      simulate();
      draw();
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isAnimating, hoveredNode, selectedNode]);

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const clickedNode = nodes.find(node => {
      if (!node.x || !node.y) return false;
      const distance = Math.sqrt((x - node.x) ** 2 + (y - node.y) ** 2);
      return distance <= node.size;
    });

    setSelectedNode(clickedNode || null);
  };

  const handleCanvasMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const hoveredNode = nodes.find(node => {
      if (!node.x || !node.y) return false;
      const distance = Math.sqrt((x - node.x) ** 2 + (y - node.y) ** 2);
      return distance <= node.size;
    });

    setHoveredNode(hoveredNode || null);
    canvas.style.cursor = hoveredNode ? 'pointer' : 'default';
  };

  return (
    <Card className="bg-white border-gray-200">
      <div className="p-6">
        <div className="relative">
          <canvas
            ref={canvasRef}
            className="w-full h-[600px] bg-gray-50 rounded-lg border border-gray-200"
            onClick={handleCanvasClick}
            onMouseMove={handleCanvasMouseMove}
          />
          
          {selectedNode && (
            <div className="absolute top-4 right-4 bg-white border border-gray-200 rounded-lg p-4 max-w-xs shadow-lg">
              <h3 className="text-black font-semibold mb-2">{selectedNode.label}</h3>
              <p className="text-gray-600 text-sm mb-2">Category: {selectedNode.category}</p>
              <p className="text-gray-600 text-sm">Connections: {selectedNode.connections}</p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
