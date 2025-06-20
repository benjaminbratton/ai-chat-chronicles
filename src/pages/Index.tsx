
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Header } from "@/components/Header";
import { FeaturedConversation } from "@/components/FeaturedConversation";
import { ConversationCard } from "@/components/ConversationCard";
import { CategoryFilter } from "@/components/CategoryFilter";

const mockConversations = [
  {
    id: 1,
    title: "Exploring the Philosophy of Consciousness with GPT-4",
    excerpt: "A deep dive into what it means to be conscious, examining the hard problem of consciousness through the lens of artificial intelligence. This conversation explores fundamental questions about subjective experience, qualia, and the nature of awareness itself.",
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
  excerpt: "Comprehensive analysis of evolutionary algorithms and their applications in modern AI systems, exploring how computational evolution mirrors biological processes and drives innovation in machine learning architectures.",
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
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Hero Section - Clean and Minimal */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 leading-tight">
              Dialogues with AI
            </h1>
            <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed">
              A curated collection of conversations exploring the intersection of human thought 
              and artificial intelligence. Join researchers, writers, and thinkers in examining 
              the future of human-machine dialogue.
            </p>
          </div>
          
          <div className="flex justify-center">
            <Link 
              to="/explore" 
              className="inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-800 transition-colors border-b border-blue-200 hover:border-blue-400 pb-1"
            >
              Browse All Conversations <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Featured Content */}
        <div className="mb-16">
          <h2 className="text-2xl font-light text-gray-900 mb-8 text-center">Featured</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {featuredConversation && (
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-4">Dialogue</h3>
                <FeaturedConversation conversation={featuredConversation} />
              </div>
            )}
            
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-4">Research</h3>
              <FeaturedConversation conversation={featuredResearch} />
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-12">
          <CategoryFilter 
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        {/* Conversations Grid */}
        <div className="space-y-8">
          {filteredConversations.map((conversation) => (
            <ConversationCard key={conversation.id} conversation={conversation} />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="text-blue-600 font-medium hover:text-blue-800 transition-colors border-b border-blue-200 hover:border-blue-400 pb-1">
            Load More
          </button>
        </div>
      </main>
    </div>
  );
};

export default Index;
