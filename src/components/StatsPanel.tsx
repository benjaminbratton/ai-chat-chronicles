
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { TrendingUp, Users, MessageSquare, Zap } from 'lucide-react';

interface StatsPanelProps {
  selectedFilter: string;
}

export const StatsPanel = ({ selectedFilter }: StatsPanelProps) => {
  const stats = [
    {
      title: 'Total Topics',
      value: '1,247',
      change: '+12%',
      icon: TrendingUp,
      color: 'text-blue-600'
    },
    {
      title: 'Active Conversations',
      value: '3,892',
      change: '+8%',
      icon: MessageSquare,
      color: 'text-green-600'
    },
    {
      title: 'Contributors',
      value: '15,234',
      change: '+24%',
      icon: Users,
      color: 'text-purple-600'
    },
    {
      title: 'Connections',
      value: '8,745',
      change: '+15%',
      icon: Zap,
      color: 'text-yellow-600'
    }
  ];

  const topTopics = [
    { name: 'AI Ethics', connections: 847, growth: '+23%' },
    { name: 'Machine Learning', connections: 692, growth: '+18%' },
    { name: 'Climate Change', connections: 534, growth: '+12%' },
    { name: 'Neural Networks', connections: 423, growth: '+31%' },
    { name: 'Data Privacy', connections: 389, growth: '+9%' },
  ];

  return (
    <div className="space-y-6">
      {/* Key Statistics */}
      <Card className="bg-white border-gray-200">
        <CardHeader>
          <CardTitle className="text-black text-lg">Network Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-xl font-semibold text-black">{stat.value}</p>
                </div>
              </div>
              <span className="text-sm text-green-600">{stat.change}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Top Topics */}
      <Card className="bg-white border-gray-200">
        <CardHeader>
          <CardTitle className="text-black text-lg">Trending Topics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topTopics.map((topic, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-black">{topic.name}</p>
                  <p className="text-xs text-gray-600">{topic.connections} connections</p>
                </div>
                <span className="text-xs text-green-600">{topic.growth}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Legend */}
      <Card className="bg-white border-gray-200">
        <CardHeader>
          <CardTitle className="text-black text-lg">Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[
              { name: 'Technology', color: 'bg-blue-600' },
              { name: 'Philosophy', color: 'bg-purple-600' },
              { name: 'Society', color: 'bg-green-600' },
              { name: 'Economics', color: 'bg-yellow-600' },
              { name: 'Environment', color: 'bg-cyan-600' },
            ].map((category, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                <span className="text-sm text-gray-700">{category.name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
