
import { Clock, Heart, MessageSquare, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

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

interface FeaturedConversationProps {
  conversation: Conversation;
  bgColor?: string;
}

export const FeaturedConversation = ({ conversation, bgColor = "bg-white" }: FeaturedConversationProps) => {
  return (
    <div className={`${bgColor} rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 h-full flex flex-col group hover:scale-[1.02]`}>
      <div className="p-8 md:p-12 flex-1 flex flex-col relative overflow-hidden">
        {/* Decorative gradient overlay */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/20 to-transparent rounded-full blur-2xl"></div>
        
        <div className="flex items-center space-x-2 mb-6 relative z-10">
          <span className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">
            {conversation.category}
          </span>
          <span className="bg-gradient-to-r from-orange-400 to-red-400 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg animate-pulse">
            Featured
          </span>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
          {conversation.title}
        </h2>
        
        <p className="text-lg text-gray-600 mb-8 leading-relaxed flex-1 font-light">
          {conversation.excerpt}
        </p>

        <div className="flex items-center justify-between mt-auto relative z-10">
          <div className="flex items-center space-x-4">
            <Link to="/profile" className="group/avatar">
              <div className="relative">
                <img
                  src={conversation.authorImage}
                  alt={conversation.author}
                  className="w-14 h-14 rounded-full object-cover cursor-pointer transition-all duration-300 group-hover/avatar:scale-110 group-hover/avatar:shadow-lg ring-2 ring-white group-hover/avatar:ring-blue-300"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover/avatar:opacity-20 transition-opacity duration-300"></div>
              </div>
            </Link>
            <div>
              <Link to="/profile">
                <p className="font-bold text-gray-900 hover:text-blue-600 transition-colors cursor-pointer text-lg">
                  {conversation.author}
                </p>
              </Link>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span className="font-medium">{new Date(conversation.publishDate).toLocaleDateString()}</span>
                <div className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-full">
                  <Clock className="w-3 h-3" />
                  <span className="font-medium">{conversation.readTime} min read</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors cursor-pointer">
              <Heart className="w-5 h-5" />
              <span className="font-bold">{conversation.likes}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors cursor-pointer">
              <MessageSquare className="w-5 h-5" />
              <span className="font-bold">{conversation.comments}</span>
            </div>
            <Link 
              to="/ai-consciousness"
              className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-full font-bold hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <span>Read</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
