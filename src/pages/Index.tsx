
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Header } from "@/components/Header";
import { BrowserWindow } from "@/components/BrowserWindow";
import { FeaturedConversation } from "@/components/FeaturedConversation";
import { ConversationCard } from "@/components/ConversationCard";
import { CategoryFilter } from "@/components/CategoryFilter";

const mockConversations = [
  {
    id: 1,
    title: "Exploring the Philosophy of Consciousness with GPT-4",
    excerpt: "A deep dive into what it means to be conscious, examining the hard problem of consciousness through the lens of artificial intelligence...",
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

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  const featuredConversation = mockConversations.find(conv => conv.featured);
  const regularConversations = mockConversations.filter(conv => !conv.featured);
  
  const filteredConversations = selectedCategory === "All" 
    ? regularConversations 
    : regularConversations.filter(conv => conv.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-200">
      <BrowserWindow />
      <Header />
      
      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero Section - Two Column Layout */}
        <div className="mb-16 grid md:grid-cols-2 gap-16">
          {/* Left Column - Dialogues with AI */}
          <div>
            <h1 className="text-4xl md:text-6xl font-thin text-black mb-6 tracking-tight">
              Dialogues with AI
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed font-thin">
              Discover and share fascinating conversations with artificial intelligence. 
              Join our community of AI enthusiasts exploring the future of human-machine dialogue.{" "}
              <Link to="/explore" className="text-blue-600 hover:text-blue-800 hover:underline inline-flex items-center gap-1">
                Explore <ArrowRight className="w-4 h-4" />
              </Link>
            </p>
          </div>

          {/* Right Column - Deep Research */}
          <div className="text-right">
            <h1 className="text-4xl md:text-6xl font-thin text-black mb-6 tracking-tight">
              Deep Research
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed font-thin">
              Share comprehensive research reports and in-depth analyses. 
              Engage with scholarly work and contribute to meaningful academic discussions through collaborative commentary.{" "}
              <Link to="/explore" className="text-blue-600 hover:text-blue-800 hover:underline inline-flex items-center gap-1">
                Explore <ArrowRight className="w-4 h-4" />
              </Link>
            </p>
          </div>
        </div>

        {/* Featured Conversation */}
        {featuredConversation && (
          <div className="mb-20">
            <h2 className="text-lg font-thin text-black mb-8 uppercase tracking-wider">Featured</h2>
            <FeaturedConversation conversation={featuredConversation} />
          </div>
        )}

        {/* Category Filter */}
        <CategoryFilter 
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* Conversations Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredConversations.map((conversation) => (
            <ConversationCard key={conversation.id} conversation={conversation} />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center">
          <button className="bg-black text-white px-8 py-3 font-thin text-sm tracking-wide uppercase hover:bg-gray-800 transition-colors">
            Load More
          </button>
        </div>
      </main>
    </div>
  );
};

export default Index;
