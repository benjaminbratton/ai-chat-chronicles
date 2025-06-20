
import { useState } from "react";
import { Header } from "@/components/Header";
import { BrowserWindow } from "@/components/BrowserWindow";
import { CategoryFilter } from "@/components/CategoryFilter";
import { PostCard } from "@/components/PostCard";
import { SortOptions } from "@/components/SortOptions";
import { Search, Filter } from "lucide-react";

const mockPosts = [
  {
    id: 1,
    title: "Deep dive into consciousness with Claude - exploring the nature of subjective experience",
    content: "Had an fascinating 2-hour conversation with Claude about consciousness, qualia, and what it means to experience...",
    author: "PhilosophyMind",
    authorAvatar: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=40&h=40&fit=crop&crop=face",
    category: "Philosophy",
    aiModel: "Claude 3",
    upvotes: 245,
    comments: 67,
    timestamp: "3 hours ago",
    readTime: 8
  },
  {
    id: 2,
    title: "ChatGPT helped me debug a complex React performance issue",
    content: "Was stuck on a memory leak for days. ChatGPT walked me through profiling and identified the issue...",
    author: "DevCoder92",
    authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    category: "Programming",
    aiModel: "GPT-4",
    upvotes: 189,
    comments: 34,
    timestamp: "5 hours ago",
    readTime: 6
  },
  {
    id: 3,
    title: "Teaching my 8-year-old Python with AI assistance - amazing results!",
    content: "Used GPT-4 to create interactive coding lessons for my daughter. She's already building simple games...",
    author: "TechParent",
    authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face",
    category: "Education",
    aiModel: "GPT-4",
    upvotes: 156,
    comments: 28,
    timestamp: "8 hours ago",
    readTime: 5
  },
  {
    id: 4,
    title: "Claude's insights on quantum computing fundamentals blew my mind",
    content: "Asked Claude to explain quantum entanglement in simple terms. The explanation was better than most textbooks...",
    author: "QuantumCurious",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    category: "Science",
    aiModel: "Claude 3",
    upvotes: 203,
    comments: 45,
    timestamp: "12 hours ago",
    readTime: 7
  },
  {
    id: 5,
    title: "AI helped me write a short story that got published!",
    content: "Collaborated with ChatGPT on character development and plot structure. Just got accepted to a literary magazine...",
    author: "WordSmith88",
    authorAvatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=40&h=40&fit=crop&crop=face",
    category: "Creative Writing",
    aiModel: "GPT-4",
    upvotes: 134,
    comments: 19,
    timestamp: "1 day ago",
    readTime: 4
  },
  {
    id: 6,
    title: "Business strategy session with AI: doubled my startup's efficiency",
    content: "Used AI to analyze market data and optimize our workflow. Revenue increased 40% in just 2 months...",
    author: "StartupFounder",
    authorAvatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=40&h=40&fit=crop&crop=face",
    category: "Business",
    aiModel: "GPT-4",
    upvotes: 278,
    comments: 52,
    timestamp: "1 day ago",
    readTime: 9
  },
  {
    id: 7,
    title: "AI therapy session helped me process childhood trauma",
    content: "Had a breakthrough conversation about family dynamics. Obviously not a replacement for real therapy, but...",
    author: "HealingJourney",
    authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
    category: "Personal",
    aiModel: "Claude 3",
    upvotes: 167,
    comments: 41,
    timestamp: "2 days ago",
    readTime: 6
  },
  {
    id: 8,
    title: "GPT-4 solved a mathematical proof I've been stuck on for weeks",
    content: "Working on my dissertation and hit a wall with a complex topology proof. AI guided me through the solution...",
    author: "MathGrad",
    authorAvatar: "https://images.unsplash.com/photo-1507101105822-7472b28e22ac?w=40&h=40&fit=crop&crop=face",
    category: "Science",
    aiModel: "GPT-4",
    upvotes: 312,
    comments: 73,
    timestamp: "2 days ago",
    readTime: 11
  }
];

const Explore = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("hot");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = mockPosts.filter(post => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case "hot":
        return b.upvotes - a.upvotes;
      case "new":
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      case "top":
        return b.upvotes - a.upvotes;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-200">
      <BrowserWindow />
      <Header />
      
      <main className="max-w-5xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-thin text-black mb-2">Explore AI Conversations</h1>
          <p className="text-gray-600 font-light">Discover the latest conversations and insights from our community</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search posts, authors, topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-black focus:border-black text-sm font-light"
              />
            </div>

            {/* Sort Options */}
            <SortOptions selectedSort={sortBy} onSortChange={setSortBy} />
          </div>
        </div>

        {/* Category Filter */}
        <CategoryFilter 
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* Posts Feed */}
        <div className="space-y-4">
          {sortedPosts.map((post, index) => (
            <PostCard 
              key={post.id} 
              post={post} 
              bgColor={index % 2 === 0 ? "bg-green-50" : "bg-blue-50"}
            />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <button className="bg-black text-white px-8 py-3 font-thin text-sm tracking-wide uppercase hover:bg-gray-800 transition-colors">
            Load More Posts
          </button>
        </div>
      </main>
    </div>
  );
};

export default Explore;
