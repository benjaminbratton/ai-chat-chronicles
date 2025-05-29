
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

  return (
    <div className="min-h-screen bg-gray-100">
      <BrowserWindow />
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content Column */}
          <div className="lg:col-span-3">
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
                    
                    {/* Whiteboard Image */}
                    <div className="my-6">
                      <img
                        src="/lovable-uploads/19072d55-9403-4faa-a62a-31d65d88d230.png"
                        alt="Mathematical equations on classroom whiteboard"
                        className="w-full rounded-lg border border-gray-200"
                      />
                      <p className="text-sm text-gray-600 mt-2 italic text-center">
                        The whiteboard after my breakthrough session with GPT-4
                      </p>
                    </div>
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

            {/* Analysis Section */}
            <div className="bg-white rounded-lg border border-gray-200 mb-6">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Author's Analysis</h2>
                <p className="text-sm text-gray-600 mt-1">Reflection on the AI interaction by {post.author}</p>
              </div>
              <div className="p-6">
                <div className="flex space-x-4">
                  <div className="w-8 h-8 rounded-full">
                    <img
                      src={post.authorAvatar}
                      alt={post.author}
                      className="w-8 h-8 rounded-full"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-4">
                      <span className="font-medium text-sm">{post.author}</span>
                      <span className="text-xs text-gray-500">Posted 1 day ago</span>
                    </div>
                    <div className="prose max-w-none">
                      <p className="text-gray-700 leading-relaxed mb-4">
                        Looking back at this conversation, I'm struck by how effectively GPT-4 guided me through what felt like an insurmountable mathematical obstacle. The key breakthrough came when it helped me visualize <span className="text-blue-600 underline cursor-pointer">the long exact sequence of homotopy groups</span> as more than just abstract symbols on a page.
                      </p>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        What impressed me most was the AI's pedagogical approach. Rather than simply providing the answer, it walked me through each conceptual step, ensuring I understood the underlying topology before moving forward. The explanation of <span className="text-blue-600 underline cursor-pointer">the covering homotopy property</span> was particularly illuminating – I'd read about it countless times in textbooks, but the way GPT-4 connected it to the injectivity proof finally made everything click.
                      </p>
                      <p className="text-gray-700 leading-relaxed">
                        This experience has fundamentally changed how I approach mathematical problem-solving. While I was initially skeptical about using AI for rigorous mathematical work, this conversation demonstrated that these tools can serve as sophisticated thinking partners. The AI didn't just solve the problem; it helped me develop a deeper intuition for <span className="text-blue-600 underline cursor-pointer">fiber bundles and their relationship to fundamental groups</span>.
                      </p>
                    </div>
                  </div>
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
                {comments.map((comment) => (
                  <div key={comment.id} className="p-6">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-gray-600">{comment.author[0]}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="font-medium text-sm text-black">{comment.author}</span>
                          <span className="text-xs text-gray-500">{comment.timestamp}</span>
                        </div>
                        <p className="text-gray-700 text-sm mb-3 leading-relaxed" dangerouslySetInnerHTML={{ __html: comment.content }} />
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
          </div>

          {/* Similar Chats Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Similar Conversations</h3>
                <div className="space-y-4">
                  {similarChats.map((chat) => (
                    <div key={chat.id} className="group cursor-pointer">
                      <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 hover:shadow-sm transition-all">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">
                            {chat.aiModel}
                          </span>
                          <span className="text-xs text-gray-500">{chat.timestamp}</span>
                        </div>
                        
                        <h4 className="font-medium text-sm text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {chat.title}
                        </h4>
                        
                        <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                          {chat.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <img
                              src={chat.authorAvatar}
                              alt={chat.author}
                              className="w-5 h-5 rounded-full"
                            />
                            <span className="text-xs text-gray-500">{chat.author}</span>
                          </div>
                          
                          <div className="flex items-center space-x-3 text-xs text-gray-500">
                            <div className="flex items-center space-x-1">
                              <ArrowUp className="w-3 h-3" />
                              <span>{chat.upvotes}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MessageSquare className="w-3 h-3" />
                              <span>{chat.comments}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors">
                  View More Similar Chats
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Post;
