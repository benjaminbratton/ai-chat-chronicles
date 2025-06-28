import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { BrowserWindow } from "@/components/BrowserWindow";
import { CategoryFilter } from "@/components/CategoryFilter";
import { PostCard } from "@/components/PostCard";
import { PostCardSkeleton } from "@/components/PostCardSkeleton";
import { SortOptions } from "@/components/SortOptions";
import { Search, Loader2 } from "lucide-react";
import { useConversations } from "@/hooks/useConversations";
import { useAuth } from "@/hooks/useAuth";
import { useDebounce } from "@/hooks/useDebounce";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

const Explore = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("hot");
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useAuth();

  const POSTS_PER_PAGE = 12;

  // Debounce search query to reduce API calls
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Fetch conversations with infinite scroll and search
  const { 
    data, 
    isLoading, 
    error, 
    refetch, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage 
  } = useConversations(selectedCategory, POSTS_PER_PAGE, debouncedSearchQuery);

  // Flatten all pages of data
  const allConversations = useMemo(() => {
    return data?.pages.flatMap(page => page.conversations) || [];
  }, [data]);

  const totalCount = data?.pages[0]?.total || 0;

  // Set up infinite scroll
  const loadMoreRef = useInfiniteScroll({
    hasMore: hasNextPage || false,
    isLoading: isFetchingNextPage,
    onLoadMore: fetchNextPage,
  });

  // Transform data to match PostCard interface
  const transformedPosts = allConversations.map(conversation => {
    // Handle profiles - it might be an array or single object depending on Supabase query
    const profile = Array.isArray(conversation.profiles) 
      ? conversation.profiles[0] 
      : conversation.profiles;
    
    return {
      id: parseInt(conversation.id),
      title: conversation.title,
      content: conversation.content,
      author: profile?.username || profile?.full_name || 'Anonymous',
      authorAvatar: profile?.avatar_url || `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face`,
      category: conversation.category,
      aiModel: "GPT-4", 
      upvotes: Math.floor(Math.random() * 50) + 10,
      comments: Math.floor(Math.random() * 20) + 2,
      timestamp: new Date(conversation.created_at).toLocaleDateString(),
      readTime: conversation.read_time || 5
    };
  });

  // Sort posts (search filtering is now done server-side)
  const sortedPosts = [...transformedPosts].sort((a, b) => {
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

  // Reset to top when category or search changes
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <BrowserWindow />
        <Header />
        <main className="max-w-5xl mx-auto px-4 py-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-thin text-black mb-2">Explore AI Conversations</h1>
            <p className="text-gray-600">
              Discover the latest conversations and insights from our community
            </p>
          </div>

          {/* Search and Filters Skeleton */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search posts, authors, topics..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-black focus:border-black text-sm"
                  disabled
                />
              </div>
              <SortOptions selectedSort={sortBy} onSortChange={setSortBy} />
            </div>
          </div>

          <CategoryFilter 
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />

          {/* Loading Skeletons */}
          <div className="space-y-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <PostCardSkeleton key={index} />
            ))}
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
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200"
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
          <p className="text-gray-600">
            Discover the latest conversations and insights from our community ({totalCount} total conversations)
          </p>
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
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-black focus:border-black text-sm transition-all duration-200"
              />
              {searchQuery !== debouncedSearchQuery && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                </div>
              )}
            </div>

            {/* Sort Options */}
            <SortOptions selectedSort={sortBy} onSortChange={setSortBy} />
          </div>
        </div>

        {/* Category Filter */}
        <CategoryFilter 
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />

        {/* Posts Feed */}
        <div className="space-y-4">
          {sortedPosts.length > 0 ? (
            <>
              {sortedPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
              
              {/* Infinite Scroll Trigger */}
              <div ref={loadMoreRef} className="py-8">
                {isFetchingNextPage && (
                  <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <PostCardSkeleton key={`loading-${index}`} />
                    ))}
                  </div>
                )}
                
                {!hasNextPage && sortedPosts.length > 0 && (
                  <div className="text-center">
                    <p className="text-gray-600">You've reached the end!</p>
                    <p className="text-sm text-gray-500 mt-2">
                      {sortedPosts.length} conversations loaded
                    </p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600">No conversations found matching your criteria.</p>
              <p className="text-sm text-gray-500 mt-2">
                Try adjusting your filters or search terms.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Explore;
