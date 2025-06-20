
import { useState } from "react";
import { ArrowUp, MessageSquare, Share2, Bookmark, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { categories } from "./CategoryFilter";

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  authorAvatar: string;
  category: string;
  aiModel: string;
  upvotes: number;
  comments: number;
  timestamp: string;
  readTime: number;
}

interface PostCardProps {
  post: Post;
  bgColor?: string;
}

export const PostCard = ({ post, bgColor = "bg-white" }: PostCardProps) => {
  const [upvoted, setUpvoted] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const categoryData = categories.find(cat => cat.name === post.category);
  const categoryColor = categoryData?.color || "bg-gray-500";
  const categoryTextColor = categoryData?.textColor || "text-white";

  const handleUpvote = () => {
    setUpvoted(!upvoted);
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
  };

  return (
    <div className={`${bgColor} rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200`}>
      <div className="p-6">
        {/* Header with category and AI model */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <span className={`${categoryColor} ${categoryTextColor} text-xs font-medium px-3 py-1 rounded-full`}>
              {post.category}
            </span>
            <span className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full">
              {post.aiModel}
            </span>
          </div>
          <span className="text-xs text-gray-500 font-light">{post.timestamp}</span>
        </div>

        {/* Title */}
        <Link to="/ai-consciousness">
          <h2 className="text-xl font-serif font-thin text-gray-900 mb-3 hover:text-blue-600 transition-colors cursor-pointer leading-tight">
            {post.title}
          </h2>
        </Link>

        {/* Content */}
        <p className="text-gray-600 text-sm mb-4 leading-relaxed font-light line-clamp-2">
          {post.content}
        </p>

        {/* Author and Metadata */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Link to="/profile">
              <img
                src={post.authorAvatar}
                alt={post.author}
                className="w-8 h-8 rounded-full object-cover hover:opacity-80 transition-opacity cursor-pointer"
              />
            </Link>
            <div>
              <Link to="/profile">
                <p className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors cursor-pointer">
                  {post.author}
                </p>
              </Link>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <Clock className="w-3 h-3" />
                <span className="font-light">{post.readTime} min read</span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center space-x-4">
            {/* Upvote */}
            <button
              onClick={handleUpvote}
              className={`flex items-center space-x-1 px-2 py-1 rounded transition-colors ${
                upvoted 
                  ? "text-green-600 bg-green-50" 
                  : "text-gray-500 hover:text-green-600 hover:bg-green-50"
              }`}
            >
              <ArrowUp className="w-4 h-4" />
              <span className="text-sm font-light">{upvoted ? post.upvotes + 1 : post.upvotes}</span>
            </button>

            {/* Comments */}
            <Link
              to="/ai-consciousness"
              className="flex items-center space-x-1 px-2 py-1 rounded text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span className="text-sm font-light">{post.comments}</span>
            </Link>

            {/* Share */}
            <button className="flex items-center space-x-1 px-2 py-1 rounded text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors">
              <Share2 className="w-4 h-4" />
              <span className="text-sm font-light">Share</span>
            </button>
          </div>

          {/* Bookmark */}
          <button
            onClick={handleBookmark}
            className={`p-1 rounded transition-colors ${
              bookmarked
                ? "text-blue-600 bg-blue-50"
                : "text-gray-400 hover:text-blue-600 hover:bg-blue-50"
            }`}
          >
            <Bookmark className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
