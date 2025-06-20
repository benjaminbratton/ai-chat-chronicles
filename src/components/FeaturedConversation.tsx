
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
  image?: string;
}

interface FeaturedConversationProps {
  conversation: Conversation;
  bgColor?: string;
}

export const FeaturedConversation = ({ conversation, bgColor = "bg-white" }: FeaturedConversationProps) => {
  const categoryData = categories.find(cat => cat.name === conversation.category);
  const categoryColor = categoryData?.color || "bg-gray-500";
  const categoryTextColor = categoryData?.textColor || "text-white";

  return (
    <div className={`${bgColor} rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col border border-gray-100`}>
      <div className="p-8 md:p-12 flex-1 flex flex-col">
        <div className="flex items-center space-x-2 mb-4">
          <span className={`${categoryColor} ${categoryTextColor} text-xs font-medium px-3 py-1 rounded-full`}>
            {conversation.category}
          </span>
          <span className="bg-orange-100 text-orange-800 text-xs font-medium px-3 py-1 rounded-full">
            Featured
          </span>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-serif font-thin text-gray-900 mb-6 leading-tight">
          {conversation.title}
        </h2>

        {conversation.image && (
          <div className="mb-6">
            <img
              src={conversation.image}
              alt={conversation.title}
              className="w-full h-48 md:h-64 object-cover rounded-lg shadow-md"
            />
          </div>
        )}
        
        <p className="text-lg text-gray-600 mb-6 leading-relaxed flex-1 font-light">
          {conversation.excerpt}
        </p>

        <div className="flex items-center justify-between mt-auto">
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
                <span className="font-light">{new Date(conversation.publishDate).toLocaleDateString()}</span>
                <div className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span className="font-light">{conversation.readTime} min read</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-gray-500">
              <Heart className="w-4 h-4" />
              <span className="text-sm font-light">{conversation.likes}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-500">
              <MessageSquare className="w-4 h-4" />
              <span className="text-sm font-light">{conversation.comments}</span>
            </div>
            <Link 
              to="/ai-consciousness"
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
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
