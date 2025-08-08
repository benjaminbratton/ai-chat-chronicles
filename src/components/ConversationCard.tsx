
import { Clock, Heart, MessageSquare, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { categories } from "./CategoryFilter";

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
  bgColor?: string;
}

export const ConversationCard = ({ conversation, bgColor = "bg-white" }: ConversationCardProps) => {
  const categoryData = categories.find(cat => cat.name === conversation.category);
  const categoryColor = categoryData?.color || "bg-gray-500";
  const categoryTextColor = categoryData?.textColor || "text-white";

  return (
    <div className={`${bgColor} rounded-lg shadow-sm border border-white/20 overflow-hidden hover:shadow-md transition-shadow duration-300 h-full flex flex-col`}>
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center space-x-2 mb-3">
          <span className={`${categoryColor} ${categoryTextColor} text-xs font-medium px-2 py-1 rounded-full`}>
            {conversation.category}
          </span>
        </div>
        
        <h3 className="text-xl font-serif font-medium text-white mb-3 leading-tight flex-1">
          {conversation.title}
        </h3>
        
        <p className="text-white/80 text-sm mb-4 line-clamp-3 leading-relaxed">
          {conversation.excerpt}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center space-x-3">
            <Link to="/profile">
              <img
                src={conversation.authorImage}
                alt={conversation.author}
                className="w-8 h-8 rounded-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
              />
            </Link>
            <div>
              <Link to="/profile">
                <p className="text-sm font-medium text-white hover:text-cyan-400 transition-colors cursor-pointer">{conversation.author}</p>
              </Link>
              <div className="flex items-center space-x-3 text-xs text-white/60">
                <span>{new Date(conversation.publishDate).toLocaleDateString()}</span>
                <div className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{conversation.readTime} min</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 text-white/60">
              <Heart className="w-3 h-3" />
              <span className="text-xs">{conversation.likes}</span>
            </div>
            <div className="flex items-center space-x-1 text-white/60">
              <MessageSquare className="w-3 h-3" />
              <span className="text-xs">{conversation.comments}</span>
            </div>
            <Link 
              to="/ai-consciousness"
              className="flex items-center space-x-1 text-cyan-400 hover:text-cyan-300 text-xs"
            >
              <span>Read</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
