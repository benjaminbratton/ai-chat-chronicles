
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-zinc-100">
      <BrowserWindow />
      <Header />
      
      <main className="max-w-7xl mx-auto px-6 py-16 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-40 left-10 w-96 h-96 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-full blur-3xl opacity-20"></div>
        
        {/* Hero Section - Asymmetric Layout */}
        <div className="mb-24 relative">
          <div className="grid grid-cols-12 gap-8 items-start">
            {/* Left Column - Dialogues with AI */}
            <div className="col-span-12 md:col-span-7 relative z-10">
              <div className="mb-4 flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-emerald-500" />
                <span className="text-sm font-medium text-emerald-600 uppercase tracking-widest">Live Conversations</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-green-700 mb-8 tracking-tighter leading-tight">
                Dialogues<br />
                <span className="text-4xl md:text-6xl font-light italic">with AI</span>
              </h1>
              <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-xl">
                <p className="text-xl text-gray-700 leading-relaxed font-light mb-6">
                  Discover fascinating conversations with artificial intelligence. 
                  Join our community exploring the future of human-machine dialogue.
                </p>
                <Link 
                  to="/explore" 
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  Explore Now <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>

            {/* Right Column - Deep Research */}
            <div className="col-span-12 md:col-span-5 mt-16 md:mt-0">
              <div className="text-right mb-4 flex items-center justify-end gap-3">
                <span className="text-sm font-medium text-blue-600 uppercase tracking-widest">Academic Focus</span>
                <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 mb-8 tracking-tighter text-right">
                Deep<br />
                <span className="text-3xl md:text-4xl font-light italic">Research</span>
              </h1>
              <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-xl">
                <p className="text-lg text-gray-700 leading-relaxed font-light mb-6 text-right">
                  Comprehensive research reports and scholarly analyses. 
                  Engage with academic work through collaborative commentary.
                </p>
                <div className="text-right">
                  <Link 
                    to="/explore" 
                    className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    Dive Deep <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Section - Creative Layout */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-blue-500">Featured</span> Content
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-stretch">
            {/* Left - Featured Dialogue */}
            <div className="transform hover:rotate-1 transition-transform duration-500">
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-2 rounded-3xl">
                <div className="bg-white rounded-2xl p-1">
                  <h3 className="text-sm font-bold text-emerald-700 mb-4 uppercase tracking-wider text-center py-3">
                    ✨ Featured Dialogue
                  </h3>
                  <div className="flex-1">
                    {featuredConversation && (
                      <FeaturedConversation conversation={featuredConversation} bgColor="bg-gradient-to-br from-emerald-50 via-white to-teal-50" />
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right - Featured Deep Research */}
            <div className="transform hover:-rotate-1 transition-transform duration-500">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-2 rounded-3xl">
                <div className="bg-white rounded-2xl p-1">
                  <h3 className="text-sm font-bold text-blue-700 mb-4 uppercase tracking-wider text-center py-3">
                    🔬 Featured Research
                  </h3>
                  <div className="flex-1">
                    <FeaturedConversation conversation={featuredResearch} bgColor="bg-gradient-to-br from-blue-50 via-white to-indigo-50" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter - Modern Design */}
        <div className="mb-16">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-xl">
            <CategoryFilter 
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>
        </div>

        {/* Conversations Grid - Masonry-like Layout */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredConversations.map((conversation, index) => (
            <div 
              key={conversation.id} 
              className={`transform transition-all duration-500 hover:scale-105 ${
                index % 3 === 0 ? 'md:translate-y-8' : 
                index % 3 === 1 ? 'md:-translate-y-4' : ''
              }`}
            >
              <ConversationCard conversation={conversation} />
            </div>
          ))}
        </div>

        {/* Load More - Artistic Button */}
        <div className="text-center">
          <button className="group relative bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white px-12 py-4 rounded-full font-bold text-lg tracking-wide uppercase overflow-hidden hover:shadow-2xl transition-all duration-300">
            <span className="relative z-10">Load More Magic</span>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </main>
    </div>
  );
};

export default Index;
