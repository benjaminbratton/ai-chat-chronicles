
import { useState } from "react";
import { Header } from "@/components/Header";
import { BrowserWindow } from "@/components/BrowserWindow";
import { CategoryFilter } from "@/components/CategoryFilter";
import { PostCard } from "@/components/PostCard";
import { SortOptions } from "@/components/SortOptions";
import { SyntheticDataGenerator } from "@/components/SyntheticDataGenerator";
import { Search } from "lucide-react";
import { useConversations } from "@/hooks/useConversations";
import { useAuth } from "@/hooks/useAuth";

const Explore = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("hot");
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useAuth();

  console.log('🔍 Explore page - Current filters:', { selectedCategory, sortBy, searchQuery, userLoggedIn: !!user });

  // Fetch conversations from Supabase
  const { data: conversations = [], isLoading, error, refetch } = useConversations(selectedCategory);

  console.log('📊 Database query results:', {
    conversationsCount: conversations.length,
    isLoading,
    hasError: !!error,
    errorMessage: error?.message
  });

  // Log first few conversations for debugging
  if (conversations.length > 0) {
    console.log('📝 Sample conversations:', conversations.slice(0, 3).map(c => ({
      id: c.id,
      title: c.title,
      category: c.category,
      published: c.published,
      author_id: c.author_id
    })));
  }

  // Transform Supabase data to match PostCard interface
  const transformedPosts = conversations.map(conversation => {
    console.log('🔄 Transforming conversation:', conversation.id, conversation.title);
    
    // Fix: Access profiles object correctly (it's a single object, not an array)
    const profile = conversation.profiles as any;
    
    return {
      id: parseInt(conversation.id),
      title: conversation.title,
      content: conversation.content,
      author: profile?.username || profile?.full_name || 'Anonymous',
      authorAvatar: profile?.avatar_url || `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face`,
      category: conversation.category,
      aiModel: "GPT-4", 
      upvotes: Math.floor(Math.random() * 50), // Generate random since these columns don't exist
      comments: Math.floor(Math.random() * 20), // Generate random since these columns don't exist
      timestamp: new Date(conversation.created_at).toLocaleDateString(),
      readTime: conversation.read_time || 5
    };
  });

  console.log('🎯 Transformed posts:', transformedPosts.length);

  // Apply filters
  const filteredPosts = transformedPosts.filter(post => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchQuery.toLowerCase());
    
    console.log(`🔍 Post "${post.title}": category match = ${matchesCategory}, search match = ${matchesSearch}`);
    return matchesCategory && matchesSearch;
  });

  console.log('📋 Filtered posts:', filteredPosts.length);

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

  console.log('📈 Final sorted posts to display:', sortedPosts.length);

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
    console.error('❌ Error loading conversations:', error);
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

        {/* Development Tool - Only show when user is logged in */}
        {user && (
          <div className="mb-6">
            <SyntheticDataGenerator />
          </div>
        )}

        {/* Enhanced Debug Info */}
        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded">
          <h3 className="font-semibold text-blue-800 mb-2">Debug Information</h3>
          <div className="text-sm text-blue-800 space-y-1">
            <p>• Database conversations: {conversations.length}</p>
            <p>• After filtering: {filteredPosts.length}</p>
            <p>• User logged in: {user ? '✅ Yes' : '❌ No'}</p>
            <p>• Selected category: {selectedCategory}</p>
            <p>• Sort by: {sortBy}</p>
          </div>
          <button 
            onClick={() => refetch()}
            className="mt-2 text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          >
            Refresh Data
          </button>
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
                  {user ? (
                    <p className="text-sm text-gray-500">
                      ⬆️ Try generating some synthetic posts using the tool above.
                    </p>
                  ) : (
                    <p className="text-sm text-gray-500">
                      Please log in to generate content and see conversations.
                    </p>
                  )}
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
