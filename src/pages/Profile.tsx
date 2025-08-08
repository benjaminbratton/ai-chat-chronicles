
import { Header } from '@/components/Header';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ConversationCard } from '@/components/ConversationCard';
import { Clock, Heart, MessageSquare, MapPin, Calendar, BookOpen } from 'lucide-react';
import { useAuth } from '@/hooks/useAuthSimple';
import { useConversations } from '@/hooks/useConversationsSimple';
import { supabase } from '@/lib/supabase';
import { useQuery } from '@tanstack/react-query';

const Profile = () => {
  const { user, profile } = useAuth();

  // Fetch conversations by this user
  const { data: conversations = [], isLoading: conversationsLoading } = useQuery({
    queryKey: ['user-conversations', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('conversations')
        .select(`
          *,
          profiles:author_id (
            id,
            full_name,
            username,
            avatar_url
          )
        `)
        .eq('author_id', user.id)
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Get likes and comments count for each conversation
      const conversationsWithCounts = await Promise.all(
        data.map(async (conversation) => {
          const [likesResult, commentsResult] = await Promise.all([
            supabase
              .from('likes')
              .select('id')
              .eq('conversation_id', conversation.id),
            supabase
              .from('comments')
              .select('id')
              .eq('conversation_id', conversation.id)
          ]);

          return {
            id: parseInt(conversation.id),
            title: conversation.title,
            excerpt: conversation.excerpt || conversation.content.substring(0, 150) + '...',
            author: conversation.profiles?.username || conversation.profiles?.full_name || 'Anonymous',
            authorImage: conversation.profiles?.avatar_url || `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face`,
            readTime: conversation.read_time || 5,
            publishDate: new Date(conversation.created_at).toISOString().split('T')[0],
            category: conversation.category,
            likes: likesResult.data?.length || 0,
            comments: commentsResult.data?.length || 0
          };
        })
      );

      return conversationsWithCounts;
    },
    enabled: !!user,
  });

  // Calculate stats
  const stats = {
    conversations: conversations.length,
    totalLikes: conversations.reduce((sum, conv) => sum + conv.likes, 0),
    totalComments: conversations.reduce((sum, conv) => sum + conv.comments, 0),
    followers: 0 // We can implement follower system later
  };

  if (!user || !profile) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="text-center py-12">
            <p className="text-gray-600">Please log in to view your profile.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Profile Header */}
        <Card className="mb-8 border-gray-200">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-8">
              <Avatar className="w-32 h-32">
                <AvatarImage src={profile.avatar_url || undefined} alt={profile.full_name || 'User'} />
                <AvatarFallback className="text-2xl">
                  {(profile.full_name || profile.username || 'U').charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <h1 className="text-3xl font-medium text-black mb-2">
                  {profile.full_name || profile.username || 'Anonymous'}
                </h1>
                <p className="text-xl text-gray-600 mb-4">{profile.title || 'Community Member'}</p>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
                  {profile.location && (
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{profile.location}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>Joined {new Date(profile.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-semibold text-black">{stats.conversations}</div>
                    <div className="text-sm text-gray-500">Conversations</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-semibold text-black">{stats.totalLikes}</div>
                    <div className="text-sm text-gray-500">Total Likes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-semibold text-black">{stats.totalComments}</div>
                    <div className="text-sm text-gray-500">Comments</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-semibold text-black">{stats.followers}</div>
                    <div className="text-sm text-gray-500">Followers</div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button className="bg-black text-white hover:bg-gray-800">
                    Edit Profile
                  </Button>
                  <Button variant="outline" className="border-gray-300 hover:bg-gray-50">
                    Settings
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Biography & Interests */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="text-xl text-black flex items-center space-x-2">
                  <BookOpen className="w-5 h-5" />
                  <span>Biography</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  {profile.bio || 'No biography provided yet.'}
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="text-xl text-black">Interests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {profile.interests && profile.interests.length > 0 ? (
                    profile.interests.map((interest, index) => (
                      <span 
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-200 text-gray-800"
                      >
                        {interest}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500">No interests added yet.</span>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Conversations */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-medium text-black">Conversations</h2>
              <span className="text-sm text-gray-500">{conversations.length} published</span>
            </div>
            
            <div className="space-y-6">
              {conversationsLoading ? (
                <div className="text-center py-8">
                  <p className="text-gray-600">Loading conversations...</p>
                </div>
              ) : conversations.length > 0 ? (
                conversations.map((conversation) => (
                  <ConversationCard key={conversation.id} conversation={conversation} />
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600">No conversations published yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
