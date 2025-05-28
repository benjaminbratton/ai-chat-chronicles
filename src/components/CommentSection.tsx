
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ThumbsUp, ThumbsDown, MessageSquare, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Comment {
  id: number;
  author: string;
  content: string;
  timestamp: string;
  upvotes: number;
  downvotes: number;
  replies: Comment[];
  userVote?: 'up' | 'down' | null;
}

export const CommentSection = () => {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: "AI_Enthusiast_42",
      content: "This is fascinating! I've had similar conversations with GPT-4 about consciousness. The way it approaches philosophical questions is really thought-provoking.",
      timestamp: "2 hours ago",
      upvotes: 15,
      downvotes: 2,
      userVote: null,
      replies: [
        {
          id: 2,
          author: "PhilosophyStudent",
          content: "I agree! Though I wonder how much of it is pattern matching vs genuine understanding.",
          timestamp: "1 hour ago",
          upvotes: 8,
          downvotes: 1,
          userVote: null,
          replies: []
        }
      ]
    }
  ]);

  const [newComment, setNewComment] = useState({ author: "", content: "" });
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState("");

  const handleVote = (commentId: number, voteType: 'up' | 'down') => {
    setComments(prev => prev.map(comment => {
      if (comment.id === commentId) {
        const currentVote = comment.userVote;
        let newUpvotes = comment.upvotes;
        let newDownvotes = comment.downvotes;
        let newUserVote: 'up' | 'down' | null = voteType;

        if (currentVote === voteType) {
          // Remove vote
          newUserVote = null;
          if (voteType === 'up') newUpvotes--;
          else newDownvotes--;
        } else {
          // Change or add vote
          if (currentVote === 'up') newUpvotes--;
          if (currentVote === 'down') newDownvotes--;
          if (voteType === 'up') newUpvotes++;
          else newDownvotes++;
        }

        return {
          ...comment,
          upvotes: newUpvotes,
          downvotes: newDownvotes,
          userVote: newUserVote
        };
      }
      return comment;
    }));
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.author.trim() || !newComment.content.trim()) return;

    const comment: Comment = {
      id: Date.now(),
      author: newComment.author,
      content: newComment.content,
      timestamp: "just now",
      upvotes: 0,
      downvotes: 0,
      userVote: null,
      replies: []
    };

    setComments(prev => [...prev, comment]);
    setNewComment({ author: "", content: "" });
  };

  const handleSubmitReply = (parentId: number) => {
    if (!replyContent.trim()) return;

    const reply: Comment = {
      id: Date.now(),
      author: "You",
      content: replyContent,
      timestamp: "just now",
      upvotes: 0,
      downvotes: 0,
      userVote: null,
      replies: []
    };

    setComments(prev => prev.map(comment => {
      if (comment.id === parentId) {
        return { ...comment, replies: [...comment.replies, reply] };
      }
      return comment;
    }));

    setReplyContent("");
    setReplyingTo(null);
  };

  const CommentItem = ({ comment, isReply = false }: { comment: Comment; isReply?: boolean }) => (
    <div className={`${isReply ? 'ml-8 border-l-2 border-gray-200 pl-4' : ''} py-4`}>
      <div className="flex items-start space-x-3">
        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
          <span className="text-xs font-medium text-gray-600">
            {comment.author.charAt(0).toUpperCase()}
          </span>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <span className="font-medium text-sm text-black">{comment.author}</span>
            <span className="text-xs text-gray-500">{comment.timestamp}</span>
          </div>
          
          <p className="text-gray-700 text-sm mb-3 leading-relaxed">{comment.content}</p>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <button
                onClick={() => handleVote(comment.id, 'up')}
                className={`p-1 rounded hover:bg-gray-100 ${
                  comment.userVote === 'up' ? 'text-green-600' : 'text-gray-500'
                }`}
              >
                <ThumbsUp className="w-4 h-4" />
              </button>
              <span className="text-xs text-gray-600">{comment.upvotes}</span>
            </div>
            
            <div className="flex items-center space-x-1">
              <button
                onClick={() => handleVote(comment.id, 'down')}
                className={`p-1 rounded hover:bg-gray-100 ${
                  comment.userVote === 'down' ? 'text-red-600' : 'text-gray-500'
                }`}
              >
                <ThumbsDown className="w-4 h-4" />
              </button>
              <span className="text-xs text-gray-600">{comment.downvotes}</span>
            </div>
            
            {!isReply && (
              <button
                onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                className="flex items-center space-x-1 text-gray-500 hover:text-black text-xs"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Reply</span>
              </button>
            )}
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-1 rounded hover:bg-gray-100 text-gray-500">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white border border-gray-300 shadow-lg">
                <DropdownMenuItem className="hover:bg-gray-100">Report</DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-gray-100">Share</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          {replyingTo === comment.id && (
            <div className="mt-4 p-4 bg-gray-50 border border-gray-200">
              <Textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Write a reply..."
                rows={3}
                className="mb-3 border-gray-300 focus:border-black focus:ring-black resize-none"
              />
              <div className="flex space-x-2">
                <Button
                  onClick={() => handleSubmitReply(comment.id)}
                  size="sm"
                  className="bg-black text-white hover:bg-gray-800"
                >
                  Reply
                </Button>
                <Button
                  onClick={() => setReplyingTo(null)}
                  variant="outline"
                  size="sm"
                  className="border-gray-300"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
          
          {comment.replies.length > 0 && (
            <div className="mt-4">
              {comment.replies.map(reply => (
                <CommentItem key={reply.id} comment={reply} isReply={true} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white border border-gray-300 p-8">
      <h3 className="text-xl font-thin text-black mb-6">Discussion ({comments.length})</h3>
      
      {/* New Comment Form */}
      <form onSubmit={handleSubmitComment} className="mb-8 p-6 bg-gray-50 border border-gray-200">
        <div className="space-y-4">
          <div>
            <Label htmlFor="commentAuthor">Name</Label>
            <Input
              id="commentAuthor"
              value={newComment.author}
              onChange={(e) => setNewComment(prev => ({ ...prev, author: e.target.value }))}
              placeholder="Enter your name..."
              className="border-gray-300 focus:border-black focus:ring-black"
              required
            />
          </div>
          <div>
            <Label htmlFor="commentContent">Comment</Label>
            <Textarea
              id="commentContent"
              value={newComment.content}
              onChange={(e) => setNewComment(prev => ({ ...prev, content: e.target.value }))}
              placeholder="Share your thoughts..."
              rows={4}
              className="border-gray-300 focus:border-black focus:ring-black resize-none"
              required
            />
          </div>
          <Button
            type="submit"
            className="bg-black text-white hover:bg-gray-800"
          >
            Post Comment
          </Button>
        </div>
      </form>
      
      {/* Comments List */}
      <div className="space-y-4">
        {comments.map(comment => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};
