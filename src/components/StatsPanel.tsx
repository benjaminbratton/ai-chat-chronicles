
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

interface StatsPanelProps {
  selectedFilter: string;
}

export const StatsPanel = ({ selectedFilter }: StatsPanelProps) => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['visualization-stats', selectedFilter],
    queryFn: async () => {
      // Fetch conversations
      let query = supabase
        .from('conversations')
        .select('category, created_at')
        .eq('published', true);

      if (selectedFilter !== 'all') {
        query = query.eq('category', selectedFilter);
      }

      const { data: conversations, error } = await query;
      if (error) throw error;

      // Calculate category distribution
      const categoryStats = conversations?.reduce((acc, conv) => {
        acc[conv.category] = (acc[conv.category] || 0) + 1;
        return acc;
      }, {} as Record<string, number>) || {};

      const categoryData = Object.entries(categoryStats).map(([name, value]) => ({
        name,
        value,
        fill: getCategoryColor(name)
      }));

      // Calculate activity over time (last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const recentConversations = conversations?.filter(conv => 
        new Date(conv.created_at) >= thirtyDaysAgo
      ) || [];

      const activityData = [];
      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dayStart = new Date(date.setHours(0, 0, 0, 0));
        const dayEnd = new Date(date.setHours(23, 59, 59, 999));
        
        const dayCount = recentConversations.filter(conv => {
          const convDate = new Date(conv.created_at);
          return convDate >= dayStart && convDate <= dayEnd;
        }).length;

        activityData.push({
          day: date.toLocaleDateString('en-US', { weekday: 'short' }),
          conversations: dayCount
        });
      }

      return {
        total: conversations?.length || 0,
        categories: categoryData,
        activity: activityData,
        topCategory: categoryData.reduce((max, cat) => 
          cat.value > (max?.value || 0) ? cat : max, categoryData[0]
        )
      };
    },
  });

  const getCategoryColor = (category: string) => {
    const colors = {
      'Technology': '#6366F1',
      'Philosophy': '#8B5CF6',
      'Society': '#10B981',
      'Economics': '#F59E0B',
      'Environment': '#06B6D4',
      'Research': '#EF4444',
    };
    return colors[category as keyof typeof colors] || '#6B7280';
  };

  const chartConfig = {
    conversations: {
      label: "Conversations",
    },
  };

  if (isLoading) {
    return (
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="text-xl text-black">Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Loading statistics...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="text-xl text-black">Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-black">{stats?.total || 0}</div>
            <div className="text-sm text-gray-500">Total Conversations</div>
          </div>
          
          {stats?.topCategory && (
            <div className="text-center">
              <div className="text-xl font-semibold text-gray-700">{stats.topCategory.name}</div>
              <div className="text-sm text-gray-500">Most Active Category</div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Category Distribution */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg text-black">Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats?.categories || []}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={70}
                  dataKey="value"
                >
                  {stats?.categories?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Activity Chart */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg text-black">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats?.activity || []}>
                <XAxis dataKey="day" fontSize={10} />
                <YAxis fontSize={10} />
                <Bar dataKey="conversations" fill="#6366F1" radius={2} />
                <ChartTooltip content={<ChartTooltipContent />} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};
