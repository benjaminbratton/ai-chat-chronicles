
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
    <div className="border-b border-gray-200 pb-8 hover:bg-gray-50 transition-colors p-6 -mx-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="mb-2">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              {conversation.category}
            </span>
          </div>
          
          <h3 className="text-lg font-medium text-gray-900 mb-3 leading-tight">
            {conversation.title}
          </h3>
          
          <p className="text-gray-600 mb-4 leading-relaxed font-light">
            {conversation.excerpt}
          </p>

          <div className="flex items-center space-x-3">
            <img
              src={conversation.authorImage}
              alt={conversation.author}
              className="w-6 h-6 rounded-full object-cover"
            />
            <p className="text-sm font-medium text-gray-900">{conversation.author}</p>
            <span className="text-sm text-gray-500">
              {new Date(conversation.publishDate).toLocaleDateString()}
            </span>
            <div className="flex items-center space-x-1 text-sm text-gray-500">
              <Clock className="w-3 h-3" />
              <span>{conversation.readTime} min</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4 ml-8">
          <div className="flex items-center space-x-1 text-gray-500 text-sm">
            <Heart className="w-4 h-4" />
            <span>{conversation.likes}</span>
          </div>
          <div className="flex items-center space-x-1 text-gray-500 text-sm">
            <MessageSquare className="w-4 h-4" />
            <span>{conversation.comments}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
