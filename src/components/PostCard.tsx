
import { ArrowUp, ArrowDown, MessageSquare, Clock, Share2, Bookmark } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { categories } from "./CategoryFilter";
import { toast } from "@/hooks/use-toast";

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
  image?: string;
}

interface PostCardProps {
  post: Post;
}

export const PostCard = ({ post }: PostCardProps) => {
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [currentUpvotes, setCurrentUpvotes] = useState(post.upvotes);

  // Get the category color from the CategoryFilter
  const categoryData = categories.find(cat => cat.name === post.category);
  const categoryColor = categoryData?.color || "bg-gray-500";
  const categoryTextColor = categoryData?.textColor || "text-white";

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

  const handleShare = async () => {
    const shareData = {
      title: post.title,
      text: post.content.substring(0, 100) + '...',
      url: `${window.location.origin}/post/${post.id}`
    };

    try {
      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData);
        toast({
          title: "Shared successfully!",
          description: "Post shared via native share menu.",
        });
      } else {
        // Fallback to clipboard
        await navigator.clipboard.writeText(shareData.url);
        toast({
          title: "Link copied!",
          description: "Post link copied to clipboard.",
        });
      }
    } catch (error) {
      console.error('Error sharing:', error);
      toast({
        title: "Share failed",
        description: "Unable to share the post. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full">
      <div className="flex">
        {/* Vote Section */}
        <div className="flex flex-col items-center p-4 bg-bg-2 rounded-l-lg border-r border-border">
          <button
            onClick={handleUpvote}
            className={`p-1 rounded hover:bg-bg-1 transition-all duration-150 hover:scale-110 ${
              upvoted ? 'text-accent' : 'text-text-1'
            }`}
          >
            <ArrowUp className="w-5 h-5" />
          </button>
          <span className={`text-lg font-bold my-1 ${
            upvoted ? 'text-accent' : downvoted ? 'text-accent-2' : 'text-text-0'
          }`}>
            {currentUpvotes}
          </span>
          <button
            onClick={handleDownvote}
            className={`p-1 rounded hover:bg-bg-1 transition-all duration-150 hover:scale-110 ${
              downvoted ? 'text-accent-2' : 'text-text-1'
            }`}
          >
            <ArrowDown className="w-5 h-5" />
          </button>
        </div>

        {/* Content Section */}
        <div className="flex-1 p-4">
          {/* Post Meta */}
          <div className="flex items-center space-x-2 mb-3 text-sm text-text-dim">
            <span className={`tag ${categoryColor} ${categoryTextColor}`}>
              {post.category}
            </span>
            <span>•</span>
            <div className="flex items-center space-x-2">
              <img
                src={post.authorAvatar}
                alt={post.author}
                className="w-5 h-5 rounded-full"
              />
              <span className="text-text-1">{post.author}</span>
            </div>
            <span>•</span>
            <span>{post.timestamp}</span>
            <span>•</span>
            <span className="tag">{post.aiModel}</span>
          </div>

          {/* Post Title */}
          <Link to={`/post/${post.id}`} className="block">
            <h3 className="text-lg font-semibold text-text-0 mb-2 hover:text-accent transition-colors">
              {post.title}
            </h3>
          </Link>

          {/* Post Content */}
          <p className="text-text-1 text-sm mb-4 line-clamp-3">
            {post.content}
          </p>

          {/* Post Image (if exists) */}
          {post.image && (
            <div className="mb-4">
              <img
                src={post.image}
                alt="Post"
                className="w-full h-32 object-cover rounded-lg"
              />
            </div>
          )}

          {/* Post Actions */}
          <div className="flex items-center justify-between text-sm text-text-dim">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <MessageSquare className="w-4 h-4" />
                <span>{post.comments} comments</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>{post.readTime} min read</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={handleShare}
                className="flex items-center space-x-1 hover:text-accent transition-colors p-1 rounded hover:bg-bg-1"
              >
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
              <button
                onClick={() => setBookmarked(!bookmarked)}
                className={`flex items-center space-x-1 transition-colors p-1 rounded hover:bg-bg-1 ${
                  bookmarked ? 'text-accent' : 'hover:text-accent'
                }`}
              >
                <Bookmark className="w-4 h-4" />
                <span>Save</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
