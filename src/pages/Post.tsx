
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { BrowserWindow } from "@/components/BrowserWindow";
import { ArrowUp, ArrowDown, MessageSquare, Share2, Bookmark, ArrowLeft, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Post = () => {
  const { id } = useParams();
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [currentUpvotes, setCurrentUpvotes] = useState(312);
  const [newComment, setNewComment] = useState({ author: "", content: "" });

  // Mock post data - in a real app, this would be fetched based on the ID
  const post = {
    id: 8,
    title: "GPT-4 solved a mathematical proof I've been stuck on for weeks",
    content: "Working on my dissertation and hit a wall with a complex topology proof. AI guided me through the solution step by step.",
    author: "MathGrad",
    authorAvatar: "https://images.unsplash.com/photo-1507101105822-7472b28e22ac?w=40&h=40&fit=crop&crop=face",
    category: "Science",
    aiModel: "GPT-4",
    upvotes: 312,
    comments: 73,
    timestamp: "2 days ago",
    readTime: 11,
    fullContent: `I've been working on my mathematics PhD dissertation focusing on algebraic topology, and I encountered a particularly challenging proof regarding the fundamental group of certain fiber bundles. After weeks of trying different approaches and consulting various textbooks and papers, I was completely stuck.

The specific problem involved proving that for a fiber bundle F → E → B where F is a connected space and B is simply connected, the inclusion map F → E induces an isomorphism on fundamental groups under certain conditions.

I decided to try GPT-4 as a last resort before reaching out to my advisor. What happened next completely blew my mind.`,
    dialogue: [
      {
        role: "user",
        content: "I'm working on a proof in algebraic topology about fiber bundles. I need to show that for a fiber bundle F → E → B where F is connected and B is simply connected, the inclusion F → E induces an isomorphism π₁(F) ≅ π₁(E) under certain conditions. Can you help me think through this?"
      },
      {
        role: "assistant", 
        content: "This is a beautiful problem in algebraic topology! Let me help you work through this step by step.\n\nFirst, let's recall the long exact sequence of homotopy groups for a fiber bundle:\n\n... → π₁(F) → π₁(E) → π₁(B) → π₀(F) → π₀(E) → π₀(B)\n\nSince B is simply connected, we have π₁(B) = 0. Also, since F is connected, π₀(F) has only one element.\n\nThis gives us the short exact sequence:\n0 → π₁(F) → π₁(E) → 0\n\nWhich immediately tells us that the inclusion map F → E induces an isomorphism π₁(F) ≅ π₁(E).\n\nWould you like me to elaborate on any of these steps?"
      },
      {
        role: "user",
        content: "Wait, I think I'm missing something fundamental about the long exact sequence. Can you explain how we get from the fiber bundle to this exact sequence?"
      },
      {
        role: "assistant",
        content: "Absolutely! The long exact sequence comes from the fact that we can view our fiber bundle as a fibration. Let me break this down:\n\n1) For any fibration F → E → B, there's a natural long exact sequence in homotopy groups.\n\n2) The key insight is that we can choose a basepoint b₀ ∈ B, and then F ≅ p⁻¹(b₀) where p: E → B is the projection map.\n\n3) The connecting homomorphism ∂: π₁(B, b₀) → π₀(F) is what makes this sequence exact.\n\n4) Since loops in B can be lifted to paths in E (this is the homotopy lifting property), the image of π₁(E) → π₁(B) captures exactly those loops in B that can be 'trivialized' by the fiber structure.\n\nThe exactness at π₁(E) means:\nker(π₁(E) → π₁(B)) = im(π₁(F) → π₁(E))\n\nSince π₁(B) = 0, this kernel is all of π₁(E), so the map π₁(F) → π₁(E) is surjective."
      },
      {
        role: "user",
        content: "That makes sense! But I need to also show it's injective. How do I prove that?"
      },
      {
        role: "assistant",
        content: "Excellent question! For injectivity, we need to show that if a loop in F becomes null-homotopic when viewed as a loop in E, then it was already null-homotopic in F.\n\nThis follows from the covering homotopy property of fiber bundles:\n\n1) Suppose we have a loop γ in F (based at some point f₀ ∈ F) that becomes null-homotopic in E.\n\n2) This means there exists a homotopy H: I × I → E with:\n   - H(s,0) = γ(s) for all s ∈ I\n   - H(s,1) = f₀ for all s ∈ I  \n   - H(0,t) = H(1,t) = f₀ for all t ∈ I\n\n3) Now, composing with the projection p: E → B gives us a homotopy p∘H: I × I → B.\n\n4) Since γ lies entirely in the fiber F = p⁻¹(b₀), we have (p∘H)(s,0) = b₀ for all s.\n\n5) Also, (p∘H)(s,1) = p(f₀) = b₀.\n\n6) Since p∘H maps the entire square I × I to the single point b₀ ∈ B, and B is simply connected, this homotopy can be lifted back to a homotopy entirely within the fiber F.\n\n7) This lifted homotopy shows that γ is null-homotopic in F.\n\nTherefore, the map π₁(F) → π₁(E) is injective!"
      }
    ]
  };

  const comments = [
    {
      id: 1,
      author: "TopologyProf",
      content: "This is a classic result! The key insight about using the long exact sequence is spot on. I teach this in my graduate topology course and students often get stuck on exactly the same point about injectivity.",
      timestamp: "1 day ago",
      upvotes: 45,
      replies: 3
    },
    {
      id: 2, 
      author: "PhDStudent2024",
      content: "Wow, this gives me hope for my own dissertation struggles. The way GPT-4 broke down the covering homotopy property explanation was incredibly clear. Did you end up using this approach in your final proof?",
      timestamp: "1 day ago",
      upvotes: 28,
      replies: 1
    },
    {
      id: 3,
      author: "AlgebraicTopology_Fan",
      content: "The step-by-step breakdown of the exact sequence is beautiful. I've been working through Hatcher's book and this really helps clarify the relationship between fiber bundles and fundamental groups.",
      timestamp: "18 hours ago", 
      upvotes: 19,
      replies: 0
    },
    {
      id: 4,
      author: "MathResearcher",
      content: "Question: does this result generalize to higher homotopy groups? I'm wondering about πₙ(F) → πₙ(E) for n > 1.",
      timestamp: "12 hours ago",
      upvotes: 15,
      replies: 2
    },
    {
      id: 5,
      author: "GradStudent_Struggling",
      content: "This is exactly what I needed! I'm working on a similar problem with principal bundles. The covering homotopy property explanation finally made it click for me.",
      timestamp: "8 hours ago",
      upvotes: 12,
      replies: 0
    }
  ];

  const handleVote = (type: 'up' | 'down') => {
    if (type === 'up') {
      if (upvoted) {
        setCurrentUpvotes(prev => prev - 1);
        setUpvoted(false);
      } else {
        setCurrentUpvotes(prev => prev + (downvoted ? 2 : 1));
        setUpvoted(true);
        setDownvoted(false);
      }
    } else {
      if (downvoted) {
        setCurrentUpvotes(prev => prev + 1);
        setDownvoted(false);
      } else {
        setCurrentUpvotes(prev => prev - (upvoted ? 2 : 1));
        setDownvoted(true);
        setUpvoted(false);
      }
    }
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.author.trim() || !newComment.content.trim()) return;
    setNewComment({ author: "", content: "" });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <BrowserWindow />
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Back Button */}
        <Link 
          to="/explore" 
          className="inline-flex items-center text-sm text-gray-600 hover:text-black mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Explore
        </Link>

        {/* Post Header */}
        <div className="bg-white rounded-lg border border-gray-200 mb-6">
          <div className="flex">
            {/* Vote Section */}
            <div className="flex flex-col items-center p-4 bg-gray-50 rounded-l-lg">
              <button
                onClick={() => handleVote('up')}
                className={`p-2 rounded hover:bg-gray-200 transition-colors ${
                  upvoted ? 'text-orange-500' : 'text-gray-400'
                }`}
              >
                <ArrowUp className="w-6 h-6" />
              </button>
              <span className={`text-lg font-bold ${upvoted ? 'text-orange-500' : downvoted ? 'text-blue-500' : 'text-gray-600'}`}>
                {currentUpvotes}
              </span>
              <button
                onClick={() => handleVote('down')}
                className={`p-2 rounded hover:bg-gray-200 transition-colors ${
                  downvoted ? 'text-blue-500' : 'text-gray-400'
                }`}
              >
                <ArrowDown className="w-6 h-6" />
              </button>
            </div>

            {/* Content Section */}
            <div className="flex-1 p-6">
              {/* Post Meta */}
              <div className="flex items-center space-x-2 mb-4 text-sm text-gray-500">
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-medium">
                  r/{post.category}
                </span>
                <span>•</span>
                <div className="flex items-center space-x-2">
                  <img
                    src={post.authorAvatar}
                    alt={post.author}
                    className="w-6 h-6 rounded-full"
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
              <h1 className="text-2xl font-bold text-gray-900 mb-4">{post.title}</h1>

              {/* Post Content */}
              <div className="prose max-w-none mb-6">
                <p className="text-gray-700 leading-relaxed mb-4">{post.fullContent}</p>
              </div>

              {/* Post Actions */}
              <div className="flex items-center space-x-4 text-sm text-gray-500 border-t pt-4">
                <div className="flex items-center space-x-1">
                  <MessageSquare className="w-4 h-4" />
                  <span>{post.comments} comments</span>
                </div>
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

        {/* AI Dialogue Section */}
        <div className="bg-white rounded-lg border border-gray-200 mb-6">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">AI Conversation</h2>
            <p className="text-sm text-gray-600 mt-1">Full dialogue with {post.aiModel}</p>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              {post.dialogue.map((message, index) => (
                <div key={index} className={`flex space-x-4 ${message.role === 'assistant' ? 'bg-gray-50 -mx-6 px-6 py-4' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.role === 'user' ? 'bg-blue-500' : 'bg-green-500'
                  }`}>
                    {message.role === 'user' ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <span className="text-white text-xs font-bold">AI</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-medium text-sm">
                        {message.role === 'user' ? post.author : post.aiModel}
                      </span>
                    </div>
                    <div className="prose prose-sm max-w-none">
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {message.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900">
              Comments ({comments.length})
            </h3>
          </div>
          
          {/* New Comment Form */}
          <form onSubmit={handleSubmitComment} className="p-6 border-b border-gray-200 bg-gray-50">
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
                  rows={3}
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
          <div className="divide-y divide-gray-200">
            {comments.map(comment => (
              <div key={comment.id} className="p-6">
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
                    
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <button className="flex items-center space-x-1 hover:bg-gray-100 px-2 py-1 rounded transition-colors">
                        <ArrowUp className="w-3 h-3" />
                        <span>{comment.upvotes}</span>
                      </button>
                      <button className="flex items-center space-x-1 hover:bg-gray-100 px-2 py-1 rounded transition-colors">
                        <ArrowDown className="w-3 h-3" />
                      </button>
                      <button className="flex items-center space-x-1 hover:bg-gray-100 px-2 py-1 rounded transition-colors">
                        <MessageSquare className="w-3 h-3" />
                        <span>Reply ({comment.replies})</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Post;
