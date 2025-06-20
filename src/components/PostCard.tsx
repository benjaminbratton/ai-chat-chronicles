
import { ArrowUp, ArrowDown, MessageSquare, Clock, Share2, Bookmark } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

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
}

export const PostCard = ({ post }: PostCardProps) => {
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [currentUpvotes, setCurrentUpvotes] = useState(post.upvotes);

  const handleUpvote = () => {
    if (upvoted) {
      setCurrentUpvotes(prev => prev - 1);
      setUpvoted(false);
    } else {
      setCurrentUpvotes(prev => prev + (downvoted ? 2 : 1));
      setUpvoted(true);
      setDownvoted(false);
    }
  };

  const handleDownvote = () => {
    if (downvoted) {
      setCurrentUpvotes(prev => prev + 1);
      setDownvoted(false);
    } else {
      setCurrentUpvotes(prev => prev - (upvoted ? 2 : 1));
      setDownvoted(true);
      setUpvoted(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
      <div className="flex">
        {/* Vote Section */}
        <div className="flex flex-col items-center p-4 bg-gray-50 rounded-l-lg">
          <button
            onClick={handleUpvote}
            className={`p-1 rounded hover:bg-gray-200 transition-colors ${
              upvoted ? 'text-orange-500' : 'text-gray-400'
            }`}
          >
            <ArrowUp className="w-5 h-5" />
          </button>
          <span className={`text-sm font-medium ${upvoted ? 'text-orange-500' : downvoted ? 'text-blue-500' : 'text-gray-600'}`}>
            {currentUpvotes}
          </span>
          <button
            onClick={handleDownvote}
            className={`p-1 rounded hover:bg-gray-200 transition-colors ${
              downvoted ? 'text-blue-500' : 'text-gray-400'
            }`}
          >
            <ArrowDown className="w-5 h-5" />
          </button>
        </div>

        {/* Content Section */}
        <div className="flex-1 p-4">
          {/* Post Header */}
          <div className="flex items-center space-x-2 mb-2 text-xs text-gray-500">
            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full font-medium">
              r/{post.category}
            </span>
            <span>•</span>
            <div className="flex items-center space-x-1">
              <img
                src={post.authorAvatar}
                alt={post.author}
                className="w-4 h-4 rounded-full"
              />
              <span>u/{post.author}</span>
            </div>
            <span>•</span>
            <span>{post.timestamp}</span>
            <span>•</span>
            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
              {post.aiModel}
            </span>
          </div>

          {/* Post Title */}
          <Link to={`/post/${post.id}`}>
            <h3 className="text-lg font-medium text-gray-900 mb-2 hover:text-blue-600 cursor-pointer line-clamp-2">
              {post.title}
            </h3>
          </Link>

          {/* Post Content Preview */}
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {post.content}
          </p>

          {/* Post Actions */}
          <div className="flex items-center space-x-4 text-xs text-gray-500">
            <Link 
              to={`/post/${post.id}`}
              className="flex items-center space-x-1 hover:bg-gray-100 px-2 py-1 rounded transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{post.comments} comments</span>
            </Link>
            <button className="flex items-center space-x-1 hover:bg-gray-100 px-2 py-1 rounded transition-colors">
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
            <button
              onClick={() => setBookmarked(!bookmarked)}
              className={`flex items-center space-x-1 hover:bg-gray-100 px-2 py-1 rounded transition-colors ${
                bookmarked ? 'text-blue-600' : ''
              }`}
            >
              <Bookmark className="w-4 h-4" />
              <span>Save</span>
            </button>
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>{post.readTime} min read</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
