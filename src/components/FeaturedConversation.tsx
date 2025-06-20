
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
    <div className="bg-gray-50 p-8 hover:bg-gray-100 transition-colors">
      <div className="mb-4">
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
          {conversation.category}
        </span>
      </div>
      
      <h2 className="text-xl font-medium text-gray-900 mb-4 leading-tight">
        {conversation.title}
      </h2>
      
      <p className="text-gray-600 mb-6 leading-relaxed font-light">
        {conversation.excerpt}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img
            src={conversation.authorImage}
            alt={conversation.author}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-medium text-gray-900">{conversation.author}</p>
            <div className="flex items-center space-x-3 text-xs text-gray-500">
              <span>{new Date(conversation.publishDate).toLocaleDateString()}</span>
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>{conversation.readTime} min</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1 text-gray-500 text-sm">
            <Heart className="w-4 h-4" />
            <span>{conversation.likes}</span>
          </div>
          <div className="flex items-center space-x-1 text-gray-500 text-sm">
            <MessageSquare className="w-4 h-4" />
            <span>{conversation.comments}</span>
          </div>
          <Link 
            to="/ai-consciousness"
            className="text-blue-600 hover:text-blue-800 transition-colors text-sm font-medium"
          >
            Read →
          </Link>
        </div>
      </div>
    </div>
  );
};
