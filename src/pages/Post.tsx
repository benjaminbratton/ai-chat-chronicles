
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { BrowserWindow } from "@/components/BrowserWindow";
import { ArrowUp, ArrowDown, MessageSquare, Share2, Bookmark, ArrowLeft, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useConversations } from "@/hooks/useConversationsSimple";

const Post = () => {
  const { id } = useParams();
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [currentUpvotes, setCurrentUpvotes] = useState(312);
  const [newComment, setNewComment] = useState({ author: "", content: "" });

  // Fetch post data from backend
  const { data: conversationsData, isLoading } = useConversations();
  const allConversations = conversationsData?.pages?.[0]?.conversations || [];
  
  // Find the specific post by ID (handle both string and numeric IDs)
  const backendPost = allConversations.find(conv => {
    // Handle different ID formats
    if (conv.id === id) return true;
    if (conv.id === `conv-${id}`) return true;
    if (conv.id.replace('conv-', '') === id) return true;
    return false;
  });
  
  // Use backend post data or fallback to mock data
  const post = backendPost ? {
    id: backendPost.id,
    title: backendPost.title,
    content: backendPost.content,
    author: backendPost.profiles?.full_name || "Anonymous",
    authorAvatar: backendPost.profiles?.avatar_url || "https://images.unsplash.com/photo-1507101105822-6e012b5bce0e?w=40&h=40&fit=crop&crop=face",
    category: backendPost.category,
    aiModel: "AI Assistant",
    upvotes: backendPost.likes_count || 0,
    comments: backendPost.comments_count || 0,
    timestamp: "Just now",
    readTime: backendPost.read_time || 5,
    fullContent: backendPost.content,
    dialogue: [] // We'll need to add dialogue support later
  } : {
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

The specific problem involved proving that for a fiber bundle F → E → B where F is connected and B is simply connected, the inclusion map F → E induces an isomorphism π₁(F) ≅ π₁(E) under certain conditions.

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
      content: "This is a classic result that I've been teaching for over fifteen years, and your experience perfectly captures why this particular theorem is so challenging for students. The key insight about using <span className=\"text-blue-600 underline cursor-pointer\">the long exact sequence</span> is absolutely spot on, and I'm impressed by how clearly GPT-4 explained the connection between the exactness conditions and the isomorphism. What's particularly noteworthy is how the AI guided you through <span className=\"text-blue-600 underline cursor-pointer\">mathematical intuition building</span> - this is typically where students get lost because the visualization can be quite abstract. Your conversation demonstrates that <span className=\"text-blue-600 underline cursor-pointer\">AI tools are becoming remarkably effective pedagogical partners</span>, especially for advanced mathematics where intuition building is crucial.",
      timestamp: "1 day ago",
      upvotes: 45,
      replies: 3
    },
    {
      id: 2, 
      author: "PhDStudent2024",
      content: "Reading through your conversation gives me genuine hope for my own dissertation struggles. I'm currently working on a related problem in <span className=\"text-blue-600 underline cursor-pointer\">differential topology</span>, dealing with vector bundles over manifolds, and I've been hesitant to use AI tools for fear of somehow 'cheating' or not developing proper mathematical intuition. Your experience shows that <span className=\"text-blue-600 underline cursor-pointer\">these tools can actually enhance understanding</span> rather than replace it. The way GPT-4 broke down <span className=\"text-blue-600 underline cursor-pointer\">the covering homotopy property</span> was incredibly illuminating - I've read Hatcher's explanation multiple times but never quite grasped the connection to injectivity until seeing it presented this way. What strikes me most is how the AI didn't just provide a solution but helped you develop <span className=\"text-blue-600 underline cursor-pointer\">mathematical maturity and confidence</span>.",
      timestamp: "1 day ago",
      upvotes: 28,
      replies: 1
    },
    {
      id: 3,
      author: "AlgebraicTopology_Fan",
      content: "The step-by-step breakdown of <span className=\"text-blue-600 underline cursor-pointer\">the exact sequence</span> is absolutely beautiful and represents everything I love about algebraic topology - the way seemingly abstract concepts suddenly crystallize into elegant solutions. I've been working through <span className=\"text-blue-600 underline cursor-pointer\">Hatcher's book</span> as an independent study project, and this conversation really helps clarify the relationship between <span className=\"text-blue-600 underline cursor-pointer\">fiber bundles and fundamental groups</span> that I've been struggling with. What's particularly valuable is seeing how the exactness conditions aren't just formal requirements but have deep geometric meaning. The way your AI explained how <span className=\"text-blue-600 underline cursor-pointer\">loops in the base space relate to the fiber structure</span> through <span className=\"text-blue-600 underline cursor-pointer\">the homotopy lifting property</span> is the kind of insight that usually takes months to develop.",
      timestamp: "18 hours ago", 
      upvotes: 19,
      replies: 0
    }
  ];

  const similarChats = [
    {
      id: 1,
      title: "Claude helped me prove the Poincaré conjecture application",
      author: "TopologyExplorer",
      authorAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face",
      category: "Mathematics",
      aiModel: "Claude",
      upvotes: 287,
      comments: 45,
      timestamp: "3 days ago",
      excerpt: "Working on manifold classification when Claude guided me through a complex proof involving fundamental groups..."
    },
    {
      id: 2,
      title: "GPT-4 solved my differential geometry problem in minutes",
      author: "GeometryStudent",
      authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
      category: "Mathematics", 
      aiModel: "GPT-4",
      upvotes: 156,
      comments: 23,
      timestamp: "1 week ago",
      excerpt: "Been stuck on Riemannian curvature calculations for my thesis. The AI's step-by-step approach was brilliant..."
    },
    {
      id: 3,
      title: "How ChatGPT taught me algebraic number theory",
      author: "NumberTheoryFan",
      authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
      category: "Mathematics",
      aiModel: "ChatGPT",
      upvotes: 203,
      comments: 31,
      timestamp: "5 days ago",
      excerpt: "Galois theory was completely abstract until ChatGPT helped me understand field extensions through concrete examples..."
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

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <BrowserWindow />
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-6">
          <div className="bg-white rounded-lg shadow-md p-8 animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4"></div>
            <div className="h-6 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-8"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </main>
      </div>
    );
  }

  // Show error state if post not found
  if (!backendPost && id) {
    return (
      <div className="min-h-screen bg-gray-100">
        <BrowserWindow />
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-6">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Post Not Found</h1>
            <p className="text-gray-600 mb-6">The post you're looking for doesn't exist or has been removed.</p>
            <Link to="/" className="text-blue-600 hover:text-blue-800 hover:underline">
              ← Back to Home
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <BrowserWindow />
      
      <main className="container">
        {/* Back Navigation */}
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center text-accent hover:text-accent-2 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Conversations
          </Link>
        </div>

        {isLoading ? (
          <div className="card animate-pulse">
            <div className="h-8 bg-white/20 rounded mb-4"></div>
            <div className="h-6 bg-white/20 rounded mb-2"></div>
            <div className="h-4 bg-white/20 rounded w-3/4 mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-white/20 rounded"></div>
              <div className="h-4 bg-white/20 rounded"></div>
              <div className="h-4 bg-white/20 rounded w-5/6"></div>
            </div>
          </div>
        ) : (
          <>
            {/* Post Header */}
            <div className="card mb-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
                  <div className="flex items-center space-x-4 text-text-1 mb-4">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{post.timestamp}</span>
                    </div>
                    <span className="tag accent">{post.category}</span>
                    <span className="tag">{post.aiModel}</span>
                  </div>
                  <p className="text-text-1 leading-relaxed">{post.content}</p>
                </div>
                
                {/* Vote and Action Buttons */}
                <div className="flex flex-col items-center space-y-2 ml-6">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleVote('up')}
                    className={`p-2 ${upvoted ? 'text-accent' : 'text-text-1'}`}
                  >
                    <ArrowUp className="w-5 h-5" />
                  </Button>
                  <span className="text-sm font-medium">{currentUpvotes}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleVote('down')}
                    className={`p-2 ${downvoted ? 'text-accent' : 'text-text-1'}`}
                  >
                    <ArrowDown className="w-5 h-5" />
                  </Button>
                  
                  <div className="flex flex-col space-y-2 mt-4">
                    <Button variant="ghost" size="sm" className="p-2 text-text-1">
                      <Share2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setBookmarked(!bookmarked)}
                      className={`p-2 ${bookmarked ? 'text-accent' : 'text-text-1'}`}
                    >
                      <Bookmark className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Full Content */}
            <div className="card mb-8">
              <h2 className="text-xl font-semibold mb-4">Full Conversation</h2>
              <div className="prose">
                <p className="text-text-1 leading-relaxed whitespace-pre-wrap">{post.fullContent}</p>
              </div>
            </div>

            {/* Dialogue Section */}
            {post.dialogue && post.dialogue.length > 0 && (
              <div className="card mb-8">
                <h2 className="text-xl font-semibold mb-6">Dialogue</h2>
                <div className="space-y-4">
                  {post.dialogue.map((message, index) => (
                    <div key={index} className={`p-4 rounded-lg ${
                      message.role === 'user' 
                        ? 'bg-bg-2 border border-border' 
                        : 'bubble'
                    }`}>
                      <div className="font-medium mb-2 text-sm uppercase tracking-wide">
                        {message.role === 'user' ? 'You' : 'AI Assistant'}
                      </div>
                      <div className="text-text-1 leading-relaxed whitespace-pre-wrap">
                        {message.content}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Comments Section */}
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Comments ({post.comments})</h2>
              </div>
              
              {/* Add Comment Form */}
              <div className="mb-8 p-4 border border-border rounded-lg">
                <h3 className="font-medium mb-4">Add a Comment</h3>
                <form onSubmit={handleSubmitComment} className="space-y-4">
                  <div>
                    <Label htmlFor="author">Name</Label>
                    <Input
                      id="author"
                      value={newComment.author}
                      onChange={(e) => setNewComment({...newComment, author: e.target.value})}
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="content">Comment</Label>
                    <Textarea
                      id="content"
                      value={newComment.content}
                      onChange={(e) => setNewComment({...newComment, content: e.target.value})}
                      placeholder="Share your thoughts..."
                      rows={4}
                      required
                    />
                  </div>
                  <Button type="submit" className="btn primary">
                    Post Comment
                  </Button>
                </form>
              </div>

              {/* Comments List */}
              <div className="space-y-6">
                {comments.map((comment) => (
                  <div key={comment.id} className="border-b border-border pb-6 last:border-b-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{comment.author}</span>
                        <span className="text-text-dim text-sm">{comment.timestamp}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-text-dim">
                        <button className="flex items-center space-x-1 hover:text-accent transition-colors">
                          <ArrowUp className="w-4 h-4" />
                          <span className="text-sm">{comment.upvotes}</span>
                        </button>
                      </div>
                    </div>
                    <div 
                      className="text-text-1 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: comment.content }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Post;
