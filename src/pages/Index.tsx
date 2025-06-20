
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Zap, Globe, Eye } from "lucide-react";
import { Header } from "@/components/Header";
import { BrowserWindow } from "@/components/BrowserWindow";
import { FeaturedConversation } from "@/components/FeaturedConversation";
import { ConversationCard } from "@/components/ConversationCard";
import { CategoryFilter } from "@/components/CategoryFilter";

const mockConversations = [
  {
    id: 1,
    title: "Exploring the Philosophy of Consciousness with GPT-4",
    excerpt: "A deep dive into what it means to be conscious, examining the hard problem of consciousness through the lens of artificial intelligence. This conversation explores fundamental questions about subjective experience, qualia, and the nature of awareness itself. We delve into philosophical frameworks from Chalmers to Dennett, questioning whether machines can truly experience consciousness or merely simulate it convincingly...",
    author: "Dr. Sarah Chen",
    authorImage: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=150&h=150&fit=crop&crop=face",
    readTime: 8,
    publishDate: "2024-01-15",
    category: "Philosophy",
    likes: 142,
    comments: 23,
    featured: true
  },
  {
    id: 2,
    title: "Claude's Take on Creative Writing Techniques",
    excerpt: "Discovering unexpected insights about narrative structure and character development through AI collaboration...",
    author: "Marcus Rivera",
    authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    readTime: 5,
    publishDate: "2024-01-14",
    category: "Creative Writing",
    likes: 89,
    comments: 12,
    featured: false
  },
  {
    id: 3,
    title: "Debugging Complex Code with AI: A Developer's Journey",
    excerpt: "How AI assistance transformed my approach to solving challenging programming problems and improved my coding workflow...",
    author: "Alex Thompson",
    authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    readTime: 12,
    publishDate: "2024-01-13",
    category: "Programming",
    likes: 234,
    comments: 45,
    featured: false
  },
  {
    id: 4,
    title: "AI and the Future of Scientific Discovery",
    excerpt: "Exploring how conversations with AI models are accelerating hypothesis generation and research methodologies...",
    author: "Dr. Emily Watson",
    authorImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
    readTime: 10,
    publishDate: "2024-01-12",
    category: "Science",
    likes: 156,
    comments: 31,
    featured: false
  },
  {
    id: 5,
    title: "Teaching Kids Programming Through AI Conversations",
    excerpt: "How AI tutoring is revolutionizing computer science education and making programming accessible to young learners...",
    author: "Jennifer Liu",
    authorImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    readTime: 7,
    publishDate: "2024-01-11",
    category: "Education",
    likes: 98,
    comments: 18,
    featured: false
  }
];

const featuredResearch = {
  id: 6,
  title: "Artificial Evolution in Context",
  excerpt: "Comprehensive analysis of evolutionary algorithms and their applications in modern AI systems, exploring how computational evolution mirrors biological processes and drives innovation in machine learning architectures. This research examines the fundamental principles of genetic algorithms, evolutionary strategies, and their role in optimizing neural network architectures and hyperparameters...",
  author: "Dr. Michael Harrison",
  authorImage: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face",
  readTime: 15,
  publishDate: "2024-01-16",
  category: "Research",
  likes: 87,
  comments: 19,
  featured: true
};

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  const featuredConversation = mockConversations.find(conv => conv.featured);
  const regularConversations = mockConversations.filter(conv => !conv.featured);
  
  const filteredConversations = selectedCategory === "All" 
    ? regularConversations 
    : regularConversations.filter(conv => conv.category === selectedCategory);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      <BrowserWindow />
      <Header />
      
      {/* Radical Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-red-500/20 to-pink-500/20 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-gradient-to-bl from-cyan-400/30 to-blue-600/30 blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-gradient-to-r from-yellow-400/25 to-orange-500/25 blur-2xl animate-pulse delay-500"></div>
        
        {/* Geometric Overlays */}
        <div className="absolute top-20 right-20 w-32 h-32 border-2 border-red-500/50 rotate-45 animate-spin-slow"></div>
        <div className="absolute bottom-40 left-32 w-24 h-24 bg-cyan-400/20 blur-sm animate-bounce"></div>
        <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-yellow-400/30 rotate-12 animate-pulse"></div>
      </div>
      
      <main className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        {/* Deconstructed Hero Section */}
        <div className="mb-32 relative">
          <div className="grid grid-cols-12 gap-4 min-h-screen">
            
            {/* Fragmented Title Treatment */}
            <div className="col-span-12 md:col-span-8 relative">
              <div className="absolute -top-16 -left-8 text-red-500/30 text-8xl font-black rotate-12 select-none">
                POLY
              </div>
              <div className="relative z-10 pt-20">
                <h1 className="text-6xl md:text-8xl font-black leading-none mb-8">
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-pink-500 to-yellow-400 transform -skew-x-12">
                    DIALOGUES
                  </span>
                  <span className="block text-cyan-400 italic font-light text-4xl md:text-6xl ml-16 transform skew-x-6">
                    ↗ with machines
                  </span>
                </h1>
                
                <div className="flex items-center gap-8 mt-12 mb-8">
                  <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-transparent"></div>
                  <Eye className="w-8 h-8 text-cyan-400 animate-pulse" />
                  <div className="w-16 h-1 bg-gradient-to-l from-yellow-400 to-transparent"></div>
                </div>
              </div>
            </div>

            {/* Experimental Research Block */}
            <div className="col-span-12 md:col-span-4 relative">
              <div className="bg-white/5 backdrop-blur-sm border border-cyan-400/30 p-8 transform rotate-2 hover:rotate-0 transition-transform duration-700">
                <div className="text-cyan-400 text-xs uppercase tracking-[0.3em] mb-4 font-mono">
                  /// DEEP_RESEARCH.EXE
                </div>
                <h2 className="text-2xl font-bold mb-4 text-white">
                  Academic<br/>
                  <span className="text-cyan-400 italic">Synthesis</span>
                </h2>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  Comprehensive research reports through collaborative commentary systems
                </p>
                <Link 
                  to="/explore" 
                  className="inline-flex items-center gap-2 bg-cyan-400 text-black px-6 py-3 text-sm font-bold hover:bg-cyan-300 transition-colors"
                >
                  ACCESS <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Floating Action Elements */}
            <div className="col-span-12 md:col-span-6 relative mt-16">
              <div className="bg-red-500/10 border-l-4 border-red-500 p-8 backdrop-blur-sm transform -skew-x-3">
                <div className="transform skew-x-3">
                  <Zap className="w-12 h-12 text-red-400 mb-4" />
                  <h3 className="text-xl font-bold text-white mb-3">
                    LIVE DISCOURSE
                  </h3>
                  <p className="text-gray-300 text-sm mb-6">
                    Real-time conversations exploring the boundaries of artificial intelligence and human creativity
                  </p>
                  <Link 
                    to="/explore" 
                    className="inline-flex items-center gap-3 bg-gradient-to-r from-red-500 to-pink-500 text-white px-8 py-4 font-bold hover:shadow-lg transition-all duration-300 hover:scale-105 transform -skew-x-12"
                  >
                    <span className="transform skew-x-12">ENGAGE</span>
                    <ArrowRight className="w-5 h-5 transform skew-x-12" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-span-12 md:col-span-6 relative mt-8">
              <div className="bg-yellow-400/10 border border-yellow-400/30 p-8 backdrop-blur-sm transform rotate-1">
                <Globe className="w-12 h-12 text-yellow-400 mb-4" />
                <div className="text-yellow-400 text-xs uppercase tracking-widest mb-2 font-mono">
                  NETWORK_STATUS: ACTIVE
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  GLOBAL SYNTHESIS
                </h3>
                <p className="text-gray-300 text-sm">
                  Distributed intelligence networks forming new paradigms of collaborative knowledge creation
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Radical Featured Section */}
        <div className="mb-32 relative">
          <div className="text-center mb-20 relative">
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-6xl font-black text-white/5 select-none">
              FEATURED
            </div>
            <h2 className="text-4xl font-black text-white relative z-10 mb-4">
              <span className="text-red-400">[</span>
              CURATED
              <span className="text-cyan-400">]</span>
            </h2>
            <div className="flex justify-center gap-4">
              <div className="w-16 h-0.5 bg-red-400"></div>
              <div className="w-8 h-0.5 bg-yellow-400"></div>
              <div className="w-12 h-0.5 bg-cyan-400"></div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div className="transform hover:scale-105 transition-transform duration-500">
              <div className="bg-gradient-to-br from-red-500/20 to-pink-500/20 p-1 backdrop-blur-sm">
                <div className="bg-black/80 p-1">
                  <div className="text-red-400 text-xs font-mono uppercase tracking-wider text-center py-3 bg-black/50">
                    /// FEATURED_DIALOGUE.AI
                  </div>
                  {featuredConversation && (
                    <FeaturedConversation conversation={featuredConversation} bgColor="bg-black/90 border border-red-500/30" />
                  )}
                </div>
              </div>
            </div>
            
            <div className="transform hover:scale-105 transition-transform duration-500">
              <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 p-1 backdrop-blur-sm">
                <div className="bg-black/80 p-1">
                  <div className="text-cyan-400 text-xs font-mono uppercase tracking-wider text-center py-3 bg-black/50">
                    /// DEEP_RESEARCH.REPORT
                  </div>
                  <FeaturedConversation conversation={featuredResearch} bgColor="bg-black/90 border border-cyan-500/30" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Experimental Category Filter */}
        <div className="mb-20">
          <div className="bg-black/50 backdrop-blur-xl border border-white/10 p-8 transform -skew-x-1">
            <div className="transform skew-x-1">
              <CategoryFilter 
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
            </div>
          </div>
        </div>

        {/* Deconstructed Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {filteredConversations.map((conversation, index) => (
            <div 
              key={conversation.id} 
              className={`transform transition-all duration-700 hover:scale-105 ${
                index % 4 === 0 ? 'md:translate-y-12 rotate-1' : 
                index % 4 === 1 ? 'md:-translate-y-8 -rotate-1' : 
                index % 4 === 2 ? 'md:translate-y-4 rotate-0.5' : 'rotate-0'
              }`}
              style={{
                animationDelay: `${index * 0.2}s`
              }}
            >
              <ConversationCard conversation={conversation} />
            </div>
          ))}
        </div>

        {/* Radical Load More */}
        <div className="text-center relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
          <button className="relative group bg-black border-2 border-white text-white px-16 py-6 font-black text-lg tracking-wider uppercase overflow-hidden hover:border-red-400 transition-all duration-500 transform hover:skew-x-12">
            <span className="relative z-10 transform group-hover:-skew-x-12 transition-transform duration-500">
              LOAD_MORE.EXE
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <Sparkles className="absolute top-2 right-2 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>
      </main>
    </div>
  );
};

export default Index;
