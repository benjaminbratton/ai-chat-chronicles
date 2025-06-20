
import { Clock, Heart, MessageSquare, Sparkles } from "lucide-react";

interface Conversation {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  authorImage: string;
  readTime: number;
  publishDate: string;
  category: string;
  likes: number;
  comments: number;
}

interface ConversationCardProps {
  conversation: Conversation;
}

export const ConversationCard = ({ conversation }: ConversationCardProps) => {
  return (
    <div className="group bg-gray-800/80 rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 relative border border-gray-700/30 backdrop-blur-sm">
      {/* Enhanced decorative gradient border for dark mode */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl blur-sm"></div>
      
      <div className="relative bg-gray-800/90 rounded-3xl m-1">
        <div className="p-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="bg-gradient-to-r from-gray-600 to-gray-800 text-white text-xs font-bold px-4 py-2 rounded-full border border-gray-600">
                {conversation.category}
              </span>
              <Sparkles className="w-4 h-4 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="flex items-center space-x-2 text-gray-400 text-sm bg-gray-700/50 px-3 py-1 rounded-full">
              <Clock className="w-3 h-3" />
              <span className="font-medium">{conversation.readTime} min</span>
            </div>
          </div>
          
          <h3 className="text-xl font-black text-white mb-4 leading-tight line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
            {conversation.title}
          </h3>
          
          <p className="text-gray-300 mb-6 line-clamp-3 leading-relaxed font-light">
            {conversation.excerpt}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src={conversation.authorImage}
                  alt={conversation.author}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-600 group-hover:ring-blue-400 transition-all duration-300"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </div>
              <div>
                <p className="font-bold text-white text-sm">{conversation.author}</p>
                <p className="text-gray-400 text-xs font-medium">
                  {new Date(conversation.publishDate).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1 text-gray-400 hover:text-red-400 transition-colors cursor-pointer">
                <Heart className="w-4 h-4" />
                <span className="text-sm font-bold">{conversation.likes}</span>
              </div>
              <div className="flex items-center space-x-1 text-gray-400 hover:text-blue-400 transition-colors cursor-pointer">
                <MessageSquare className="w-4 h-4" />
                <span className="text-sm font-bold">{conversation.comments}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
