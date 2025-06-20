
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
  },
  {
    id: 7,
    title: "The Ethics of AI Decision Making",
    excerpt: "A comprehensive dialogue exploring moral frameworks for artificial intelligence and algorithmic accountability...",
    author: "Dr. Robert Kim",
    authorImage: "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=150&h=150&fit=crop&crop=face",
    readTime: 9,
    publishDate: "2024-01-10",
    category: "Philosophy",
    likes: 167,
    comments: 28,
    featured: false
  },
  {
    id: 8,
    title: "Building Interactive Stories with ChatGPT",
    excerpt: "Exploring collaborative storytelling techniques and character development through AI-human creative partnerships...",
    author: "Luna Martinez",
    authorImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    readTime: 6,
    publishDate: "2024-01-09",
    category: "Creative Writing",
    likes: 124,
    comments: 15,
    featured: false
  },
  {
    id: 9,
    title: "Machine Learning Model Optimization Strategies",
    excerpt: "Deep dive into hyperparameter tuning and architectural decisions through collaborative AI problem-solving...",
    author: "David Park",
    authorImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    readTime: 14,
    publishDate: "2024-01-08",
    category: "Programming",
    likes: 201,
    comments: 52,
    featured: false
  },
  {
    id: 10,
    title: "Climate Science and AI Modeling",
    excerpt: "How artificial intelligence is helping researchers understand complex climate patterns and predict environmental changes...",
    author: "Dr. Maria Santos",
    authorImage: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=150&h=150&fit=crop&crop=face",
    readTime: 11,
    publishDate: "2024-01-07",
    category: "Science",
    likes: 178,
    comments: 34,
    featured: false
  },
  {
    id: 11,
    title: "Personalized Learning with AI Tutors",
    excerpt: "Examining how artificial intelligence adapts to individual learning styles and creates customized educational experiences...",
    author: "Professor James Wilson",
    authorImage: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=150&h=150&fit=crop&crop=face",
    readTime: 8,
    publishDate: "2024-01-06",
    category: "Education",
    likes: 143,
    comments: 21,
    featured: false
  },
  {
    id: 12,
    title: "AI in Business Strategy and Decision Making",
    excerpt: "How executives are leveraging AI conversations to analyze market trends and develop strategic initiatives...",
    author: "Sarah Johnson",
    authorImage: "https://images.unsplash.com/photo-1594736797933-d0d00f23a26c?w=150&h=150&fit=crop&crop=face",
    readTime: 10,
    publishDate: "2024-01-05",
    category: "Business",
    likes: 189,
    comments: 41,
    featured: false
  },
  {
    id: 13,
    title: "Personal Growth Through AI Reflection",
    excerpt: "Using AI as a mirror for self-discovery and personal development through thoughtful dialogue and introspection...",
    author: "Michael Chen",
    authorImage: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face",
    readTime: 7,
    publishDate: "2024-01-04",
    category: "Personal",
    likes: 112,
    comments: 19,
    featured: false
  },
  {
    id: 14,
    title: "The Nature of Language and Communication",
    excerpt: "Philosophical exploration of how AI and humans understand and generate language, questioning the nature of meaning itself...",
    author: "Dr. Elena Rodriguez",
    authorImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
    readTime: 13,
    publishDate: "2024-01-03",
    category: "Philosophy",
    likes: 156,
    comments: 29,
    featured: false
  },
  {
    id: 15,
    title: "Poetry Generation and Literary Analysis",
    excerpt: "Collaborative exploration of poetic forms, metaphor creation, and literary interpretation with AI assistance...",
    author: "Amanda Foster",
    authorImage: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150&h=150&fit=crop&crop=face",
    readTime: 9,
    publishDate: "2024-01-02",
    category: "Creative Writing",
    likes: 94,
    comments: 16,
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
  const [displayCount, setDisplayCount] = useState(9);
  
  const featuredConversation = mockConversations.find(conv => conv.featured);
  const regularConversations = mockConversations.filter(conv => !conv.featured);
  
  const filteredConversations = selectedCategory === "All" 
    ? regularConversations 
    : regularConversations.filter(conv => conv.category === selectedCategory);

  const displayedConversations = filteredConversations.slice(0, displayCount);
  const hasMore = filteredConversations.length > displayCount;

  const handleLoadMore = () => {
    setDisplayCount(prev => Math.min(prev + 9, filteredConversations.length));
  };

  return (
    <div className="min-h-screen bg-gray-200">
      <BrowserWindow />
      <Header />
      
      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Main Site Explanation */}
        <div className="mb-16 text-center">
          <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto font-light">
            Polylogos is a forum for the socialization and analysis of human-machine communication, 
            and thereby a way for collective intelligence crossing the boundary between the two 
            to understand itself as it emerges.
          </p>
        </div>

        {/* Hero Section - Two Column Layout */}
        <div className="mb-16 grid md:grid-cols-2 gap-16">
          {/* Left Column - Dialogues with AI */}
          <div>
            <h1 className="text-4xl md:text-6xl font-thin text-green-800 mb-6 tracking-tight">
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
            <h1 className="text-4xl md:text-6xl font-thin text-blue-800 mb-6 tracking-tight">
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

        {/* Featured Section - Two Column Layout with Equal Heights */}
        <div className="mb-20">
          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            {/* Left - Featured Dialogue */}
            <div className="flex flex-col">
              <h3 className="text-sm font-thin text-gray-600 mb-4 uppercase tracking-wider">Featured Dialogue</h3>
              <div className="flex-1">
                {featuredConversation && (
                  <FeaturedConversation conversation={featuredConversation} bgColor="bg-green-50" />
                )}
              </div>
            </div>
            
            {/* Right - Featured Deep Research */}
            <div className="flex flex-col">
              <h3 className="text-sm font-thin text-gray-600 mb-4 uppercase tracking-wider">Featured Deep Research</h3>
              <div className="flex-1">
                <FeaturedConversation conversation={featuredResearch} bgColor="bg-blue-50" />
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <CategoryFilter 
          selectedCategory={selectedCategory}
          onCategoryChange={(category) => {
            setSelectedCategory(category);
            setDisplayCount(9); // Reset display count when changing categories
          }}
        />

        {/* Conversations Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {displayedConversations.map((conversation) => (
            <ConversationCard key={conversation.id} conversation={conversation} />
          ))}
        </div>

        {/* Load More / See More */}
        {hasMore && (
          <div className="text-center">
            <button 
              onClick={handleLoadMore}
              className="bg-black text-white px-8 py-3 font-thin text-sm tracking-wide uppercase hover:bg-gray-800 transition-colors"
            >
              See More
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
