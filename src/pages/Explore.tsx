
import { useState } from "react";
import { Header } from "@/components/Header";
import { BrowserWindow } from "@/components/BrowserWindow";
import { CategoryFilter } from "@/components/CategoryFilter";
import { PostCard } from "@/components/PostCard";
import { SortOptions } from "@/components/SortOptions";
import { Search } from "lucide-react";
import { useConversations } from "@/hooks/useConversations";
import { useAuth } from "@/hooks/useAuth";

const Explore = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("hot");
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useAuth();

  // Fetch conversations from Supabase
  const { data: conversations = [], isLoading, error, refetch } = useConversations(selectedCategory);

  // Transform Supabase data to match PostCard interface
  const transformedPosts = conversations.map(conversation => {
    return {
      id: parseInt(conversation.id),
      title: conversation.title,
      content: conversation.content,
      author: 'Anonymous', // Default since we're not fetching profile data yet
      authorAvatar: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face`,
      category: conversation.category,
      aiModel: "GPT-4", 
      upvotes: Math.floor(Math.random() * 50),
      comments: Math.floor(Math.random() * 20),
      timestamp: new Date(conversation.created_at).toLocaleDateString(),
      readTime: conversation.read_time || 5
    };
  });

  // Apply filters
  const filteredPosts = transformedPosts.filter(post => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  // Sort posts
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case "hot":
        const aScore = a.upvotes + (new Date(a.timestamp).getTime() / 1000000000);
        const bScore = b.upvotes + (new Date(b.timestamp).getTime() / 1000000000);
        return bScore - aScore;
      case "new":
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      case "top":
        return b.upvotes - a.upvotes;
      default:
        return 0;
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <BrowserWindow />
        <Header />
        <main className="max-w-5xl mx-auto px-4 py-6">
          <div className="text-center py-8">
            <p className="text-gray-600">Loading conversations...</p>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100">
        <BrowserWindow />
        <Header />
        <main className="max-w-5xl mx-auto px-4 py-6">
          <div className="text-center py-8">
            <p className="text-red-600">Error loading conversations: {error.message}</p>
            <button 
              onClick={() => refetch()}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Retry
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <BrowserWindow />
      <Header />
      
      <main className="max-w-5xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-thin text-black mb-2">Explore AI Conversations</h1>
          <p className="text-gray-600">Discover the latest conversations and insights from our community</p>
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
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-black focus:border-black text-sm"
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
          {sortedPosts.length > 0 ? (
            sortedPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600">No conversations found matching your criteria.</p>
              {conversations.length === 0 && (
                <div className="mt-4 space-y-2">
                  <p className="text-sm text-gray-500">
                    Please log in to generate content and see conversations.
                  </p>
                </div>
              )}
              {conversations.length > 0 && (
                <p className="text-sm text-gray-500 mt-2">
                  Try adjusting your filters or search terms.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Load More - You can implement pagination later */}
        {sortedPosts.length > 0 && (
          <div className="text-center mt-8">
            <button className="bg-white text-gray-700 border border-gray-300 px-6 py-2 rounded-md hover:bg-gray-50 transition-colors text-sm">
              Load More Posts
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Explore;
