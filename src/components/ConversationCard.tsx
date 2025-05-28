
import { Clock, Heart, MessageSquare } from "lucide-react";

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
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full">
            {conversation.category}
          </span>
          <div className="flex items-center space-x-1 text-gray-500 text-sm">
            <Clock className="w-3 h-3" />
            <span>{conversation.readTime} min</span>
          </div>
        </div>
        
        <h3 className="text-xl font-serif font-bold text-gray-900 mb-3 leading-tight line-clamp-2">
          {conversation.title}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
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
              <p className="font-medium text-gray-900 text-sm">{conversation.author}</p>
              <p className="text-gray-500 text-xs">
                {new Date(conversation.publishDate).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 text-gray-500">
              <Heart className="w-4 h-4" />
              <span className="text-sm">{conversation.likes}</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-500">
              <MessageSquare className="w-4 h-4" />
              <span className="text-sm">{conversation.comments}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
