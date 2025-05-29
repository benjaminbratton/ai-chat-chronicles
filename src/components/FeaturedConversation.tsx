
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
}

export const FeaturedConversation = ({ conversation }: FeaturedConversationProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="p-8 md:p-12">
        <div className="flex items-center space-x-2 mb-4">
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
            {conversation.category}
          </span>
          <span className="bg-orange-100 text-orange-800 text-xs font-medium px-3 py-1 rounded-full">
            Featured
          </span>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-serif font-thin text-gray-900 mb-4 leading-tight">
          {conversation.title}
        </h2>
        
        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
          {conversation.excerpt}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/profile">
              <img
                src={conversation.authorImage}
                alt={conversation.author}
                className="w-12 h-12 rounded-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
              />
            </Link>
            <div>
              <Link to="/profile">
                <p className="font-medium text-gray-900 hover:text-blue-600 transition-colors cursor-pointer">{conversation.author}</p>
              </Link>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>{new Date(conversation.publishDate).toLocaleDateString()}</span>
                <div className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{conversation.readTime} min read</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-gray-500">
              <Heart className="w-4 h-4" />
              <span className="text-sm">{conversation.likes}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-500">
              <MessageSquare className="w-4 h-4" />
              <span className="text-sm">{conversation.comments}</span>
            </div>
            <Link 
              to="/ai-consciousness"
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              <span>Read more</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
