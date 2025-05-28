
import { Header } from '@/components/Header';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ConversationCard } from '@/components/ConversationCard';
import { Clock, Heart, MessageSquare, MapPin, Calendar, BookOpen } from 'lucide-react';

const profileData = {
  name: "Dr. Sarah Chen",
  title: "Professor of Philosophy & AI Ethics",
  location: "Stanford University, CA",
  joinDate: "March 2022",
  avatar: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face",
  biography: "Dr. Sarah Chen is a renowned philosopher and AI ethics researcher at Stanford University. Her work focuses on the intersection of consciousness, artificial intelligence, and moral philosophy. She has published over 50 papers on topics ranging from machine consciousness to the ethical implications of AI decision-making systems. Dr. Chen is passionate about making complex philosophical concepts accessible to broader audiences through thoughtful dialogue and discussion.",
  interests: [
    "AI Consciousness",
    "Machine Ethics", 
    "Philosophy of Mind",
    "Cognitive Science",
    "Digital Humanities",
    "Bioethics"
  ],
  stats: {
    conversations: 12,
    totalLikes: 847,
    totalComments: 234,
    followers: 1205
  }
};

const userConversations = [
  {
    id: 1,
    title: "Can machines truly understand consciousness?",
    excerpt: "Exploring the hard problem of consciousness through the lens of artificial intelligence and what it means for machines to have subjective experiences.",
    author: "Dr. Sarah Chen",
    authorImage: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=100&h=100&fit=crop&crop=face",
    readTime: 8,
    publishDate: "2024-01-15",
    category: "Philosophy",
    likes: 156,
    comments: 43
  },
  {
    id: 2,
    title: "The ethics of AI decision-making in healthcare",
    excerpt: "Examining moral frameworks for AI systems that make life-and-death decisions in medical contexts and the responsibility of creators.",
    author: "Dr. Sarah Chen",
    authorImage: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=100&h=100&fit=crop&crop=face",
    readTime: 12,
    publishDate: "2024-01-10",
    category: "Philosophy",
    likes: 203,
    comments: 67
  },
  {
    id: 3,
    title: "Digital identity and the self in virtual spaces",
    excerpt: "How do we maintain authentic identity in digital spaces? Exploring the philosophical implications of virtual presence and digital personas.",
    author: "Dr. Sarah Chen",
    authorImage: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=100&h=100&fit=crop&crop=face",
    readTime: 6,
    publishDate: "2024-01-05",
    category: "Philosophy",
    likes: 124,
    comments: 31
  },
  {
    id: 4,
    title: "The role of empathy in artificial intelligence",
    excerpt: "Can machines develop genuine empathy, and what would that mean for human-AI relationships in the future?",
    author: "Dr. Sarah Chen",
    authorImage: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=100&h=100&fit=crop&crop=face",
    readTime: 10,
    publishDate: "2023-12-28",
    category: "Philosophy",
    likes: 189,
    comments: 52
  }
];

const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Profile Header */}
        <Card className="mb-8 border-gray-200">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-8">
              <Avatar className="w-32 h-32">
                <AvatarImage src={profileData.avatar} alt={profileData.name} />
                <AvatarFallback className="text-2xl">SC</AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <h1 className="text-3xl font-medium text-black mb-2">{profileData.name}</h1>
                <p className="text-xl text-gray-600 mb-4">{profileData.title}</p>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{profileData.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>Joined {profileData.joinDate}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-semibold text-black">{profileData.stats.conversations}</div>
                    <div className="text-sm text-gray-500">Conversations</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-semibold text-black">{profileData.stats.totalLikes}</div>
                    <div className="text-sm text-gray-500">Total Likes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-semibold text-black">{profileData.stats.totalComments}</div>
                    <div className="text-sm text-gray-500">Comments</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-semibold text-black">{profileData.stats.followers}</div>
                    <div className="text-sm text-gray-500">Followers</div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button className="bg-black text-white hover:bg-gray-800">
                    Follow
                  </Button>
                  <Button variant="outline" className="border-gray-300 hover:bg-gray-50">
                    Message
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
                <p className="text-gray-600 leading-relaxed">{profileData.biography}</p>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="text-xl text-black">Interests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {profileData.interests.map((interest, index) => (
                    <span 
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-200 text-gray-800"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Conversations */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-medium text-black">Conversations</h2>
              <span className="text-sm text-gray-500">{userConversations.length} published</span>
            </div>
            
            <div className="space-y-6">
              {userConversations.map((conversation) => (
                <ConversationCard key={conversation.id} conversation={conversation} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
