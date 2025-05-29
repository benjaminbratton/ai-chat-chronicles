
import { Header } from '@/components/Header';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ConversationCard } from '@/components/ConversationCard';
import { Clock, Heart, MessageSquare, MapPin, Calendar, BookOpen, Star, Award, ExternalLink, Globe } from 'lucide-react';

interface CelebrityProfileData {
  name: string;
  title: string;
  location: string;
  joinDate: string;
  avatar: string;
  biography: string;
  achievements: string[];
  books: { title: string; year: string; description: string }[];
  affiliations: string[];
  website?: string;
  interests: string[];
  stats: {
    conversations: number;
    totalLikes: number;
    totalComments: number;
    followers: number;
  };
}

interface CelebrityProfileProps {
  profileData: CelebrityProfileData;
  conversations: any[];
}

export const CelebrityProfile = ({ profileData, conversations }: CelebrityProfileProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Celebrity Profile Header */}
        <Card className="mb-8 border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
          <CardContent className="p-8">
            <div className="flex items-center space-x-2 mb-4">
              <Badge className="bg-gold text-black border-gold">
                <Star className="w-3 h-3 mr-1" />
                Celebrity Writer
              </Badge>
              <Badge variant="outline" className="border-blue-300 text-blue-700">
                <Award className="w-3 h-3 mr-1" />
                Verified Expert
              </Badge>
            </div>
            
            <div className="flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-8">
              <Avatar className="w-40 h-40 border-4 border-white shadow-lg">
                <AvatarImage src={profileData.avatar} alt={profileData.name} />
                <AvatarFallback className="text-3xl bg-blue-100">MT</AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-black mb-2">{profileData.name}</h1>
                <p className="text-xl text-gray-700 mb-2">{profileData.title}</p>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{profileData.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>Joined {profileData.joinDate}</span>
                  </div>
                  {profileData.website && (
                    <div className="flex items-center space-x-1">
                      <Globe className="w-4 h-4" />
                      <a href={profileData.website} target="_blank" rel="noopener noreferrer" 
                         className="text-blue-600 hover:underline flex items-center space-x-1">
                        <span>Website</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">{profileData.stats.conversations}</div>
                    <div className="text-sm text-gray-500">Conversations</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-500">{profileData.stats.totalLikes}</div>
                    <div className="text-sm text-gray-500">Total Likes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">{profileData.stats.totalComments}</div>
                    <div className="text-sm text-gray-500">Comments</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">{profileData.stats.followers}</div>
                    <div className="text-sm text-gray-500">Followers</div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button className="bg-blue-600 text-white hover:bg-blue-700">
                    Follow
                  </Button>
                  <Button variant="outline" className="border-gray-300 hover:bg-gray-50">
                    Message
                  </Button>
                  <Button variant="outline" className="border-gray-300 hover:bg-gray-50">
                    Subscribe to Updates
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Biography, Books, etc. */}
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
                <CardTitle className="text-xl text-black">Notable Books</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {profileData.books.map((book, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-4">
                      <h4 className="font-semibold text-gray-900">{book.title}</h4>
                      <p className="text-sm text-gray-500 mb-2">{book.year}</p>
                      <p className="text-sm text-gray-600">{book.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="text-xl text-black">Affiliations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {profileData.affiliations.map((affiliation, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-700">{affiliation}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="text-xl text-black">Research Interests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {profileData.interests.map((interest, index) => (
                    <span 
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Conversations */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-black">Featured Conversations</h2>
              <span className="text-sm text-gray-500">{conversations.length} published</span>
            </div>
            
            <div className="space-y-6">
              {conversations.map((conversation) => (
                <ConversationCard key={conversation.id} conversation={conversation} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
