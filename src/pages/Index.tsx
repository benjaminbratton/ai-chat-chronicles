
import { Header } from "@/components/Header";
import { FeaturedConversation } from "@/components/FeaturedConversation";
import { ConversationCard } from "@/components/ConversationCard";
import { CategoryFilter } from "@/components/CategoryFilter";
import { ArrowRight, TrendingUp, Users, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const featuredConversations = [
    {
      id: 1,
      title: "The Future of AI Consciousness",
      excerpt: "A deep dive into whether artificial intelligence can truly achieve consciousness, exploring philosophical implications and technical possibilities.",
      author: "Dr. Sarah Chen",
      date: "2024-01-15",
      readTime: "12 min",
      category: "Philosophy",
      upvotes: 234,
      comments: 56,
      aiModel: "GPT-4"
    },
    {
      id: 2,
      title: "Climate Solutions Through Technology",
      excerpt: "Examining how emerging technologies can address climate change, from carbon capture to renewable energy innovations.",
      author: "Marcus Rodriguez",
      date: "2024-01-14",
      readTime: "8 min",
      category: "Environment",
      upvotes: 189,
      comments: 43,
      aiModel: "Claude"
    }
  ];

  const recentConversations = [
    {
      id: 3,
      title: "Understanding Quantum Computing",
      excerpt: "Breaking down complex quantum computing concepts...",
      author: "Alex Kim",
      date: "2024-01-13",
      readTime: "6 min",
      category: "Technology",
      upvotes: 145,
      comments: 32,
      aiModel: "GPT-4"
    },
    {
      id: 4,
      title: "The Ethics of Gene Editing",
      excerpt: "Exploring the moral implications of CRISPR...",
      author: "Dr. Maria Santos",
      date: "2024-01-12",
      readTime: "10 min",
      category: "Ethics",
      upvotes: 167,
      comments: 28,
      aiModel: "Claude"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-24 px-6">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-card/20"></div>
          <div className="relative max-w-4xl mx-auto text-center">
            <h1 className="text-6xl font-extralight text-foreground mb-8 tracking-tight leading-tight">
              Where AI Conversations
              <br />
              <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                Become Knowledge
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed max-w-2xl mx-auto font-light">
              Discover, share, and explore meaningful conversations with AI. 
              Join a community building the future of human-AI dialogue.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/explore">
                <button className="group flex items-center space-x-3 bg-foreground text-background px-8 py-4 font-medium text-sm tracking-wider hover:bg-foreground/90 transition-all duration-300 industrial-border">
                  <span className="mono uppercase">Explore Conversations</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link to="/posting">
                <button className="flex items-center space-x-3 bg-transparent text-foreground px-8 py-4 font-medium text-sm tracking-wider hover:bg-card/20 transition-all duration-300 industrial-border">
                  <span className="mono uppercase">Share Your Story</span>
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-6 border-y border-border/30">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-8 industrial-surface">
                <TrendingUp className="w-8 h-8 text-foreground mx-auto mb-4" />
                <div className="text-3xl font-light text-foreground mb-2 mono">10.2k</div>
                <div className="text-sm text-muted-foreground tracking-wider uppercase">Conversations Shared</div>
              </div>
              <div className="text-center p-8 industrial-surface">
                <Users className="w-8 h-8 text-foreground mx-auto mb-4" />
                <div className="text-3xl font-light text-foreground mb-2 mono">2.4k</div>
                <div className="text-sm text-muted-foreground tracking-wider uppercase">Active Contributors</div>
              </div>
              <div className="text-center p-8 industrial-surface">
                <MessageSquare className="w-8 h-8 text-foreground mx-auto mb-4" />
                <div className="text-3xl font-light text-foreground mb-2 mono">45.7k</div>
                <div className="text-sm text-muted-foreground tracking-wider uppercase">Total Interactions</div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Conversations */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12">
              <h2 className="text-3xl font-light text-foreground mb-4 tracking-tight">
                Featured Conversations
              </h2>
              <p className="text-muted-foreground leading-relaxed max-w-2xl">
                Curated discussions that showcase the depth and breadth of human-AI collaboration.
              </p>
            </div>
            
            <div className="grid gap-8">
              {featuredConversations.map((conversation) => (
                <FeaturedConversation key={conversation.id} conversation={conversation} />
              ))}
            </div>
          </div>
        </section>

        {/* Category Filter & Recent */}
        <section className="py-20 px-6 bg-card/10">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12">
              <h2 className="text-3xl font-light text-foreground mb-4 tracking-tight">
                Recent Conversations
              </h2>
              <CategoryFilter />
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {recentConversations.map((conversation) => (
                <ConversationCard key={conversation.id} conversation={conversation} />
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link to="/explore">
                <button className="group flex items-center space-x-3 bg-transparent text-foreground px-8 py-4 font-medium text-sm tracking-wider hover:bg-card/20 transition-all duration-300 industrial-border mx-auto">
                  <span className="mono uppercase">View All Conversations</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
