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

  // Function to assign unique images based on content, category, and variety
  const getRelevantImage = (conversation: any, index: number) => {
    const title = conversation.title?.toLowerCase() || '';
    const content = conversation.content?.toLowerCase() || '';
    const category = conversation.category?.toLowerCase() || '';
    
    // Create a hash from the conversation ID to ensure consistency
    const idHash = parseInt(conversation.id) || index;
    
    // Programming/Coding themed images
    if (category.includes('programming') || category.includes('coding') || title.includes('code') || content.includes('programming')) {
      const programmingImages = [
        'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=100&h=100&fit=crop&crop=center', // Java code
        'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=100&h=100&fit=crop&crop=center', // Colorful code
        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=100&h=100&fit=crop&crop=center', // MacBook code
        'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=100&h=100&fit=crop&crop=center', // Matrix code
      ];
      return programmingImages[idHash % programmingImages.length];
    }
    
    // AI/Technology themed images
    if (category.includes('technology') || title.includes('ai') || title.includes('artificial intelligence') || content.includes('machine learning')) {
      const techImages = [
        'https://images.unsplash.com/photo-1518770660439-4636190af475?w=100&h=100&fit=crop&crop=center', // Circuit board
        'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=100&h=100&fit=crop&crop=center', // AI robot
        'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=100&h=100&fit=crop&crop=center', // Tech background
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=center', // Data visualization
      ];
      return techImages[idHash % techImages.length];
    }
    
    // Philosophy/Consciousness themed images
    if (category.includes('philosophy') || title.includes('consciousness') || title.includes('thinking') || content.includes('philosophy')) {
      const philosophyImages = [
        'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=100&h=100&fit=crop&crop=center', // Starry night
        'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=100&h=100&fit=crop&crop=center', // Thinking statue
        'https://images.unsplash.com/photo-1444927714506-8492d94b5ba0?w=100&h=100&fit=crop&crop=center', // Brain/mind
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&h=100&fit=crop&crop=center', // Mountain reflection
      ];
      return philosophyImages[idHash % philosophyImages.length];
    }
    
    // Science/Research themed images
    if (category.includes('science') || title.includes('research') || content.includes('study') || content.includes('experiment')) {
      const scienceImages = [
        'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=100&h=100&fit=crop&crop=center', // Laboratory
        'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=100&h=100&fit=crop&crop=center', // Microscope
        'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=100&h=100&fit=crop&crop=center', // DNA/molecules
        'https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=100&h=100&fit=crop&crop=center', // Scientific equipment
      ];
      return scienceImages[idHash % scienceImages.length];
    }
    
    // Computer/Laptop themed images
    if (title.includes('laptop') || title.includes('computer') || content.includes('desktop') || content.includes('macbook')) {
      const computerImages = [
        'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=100&h=100&fit=crop&crop=center', // MacBook
        'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=100&h=100&fit=crop&crop=center', // Woman with laptop
        'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100&h=100&fit=crop&crop=center', // Workspace
        'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=100&h=100&fit=crop&crop=center', // Modern setup
      ];
      return computerImages[idHash % computerImages.length];
    }
    
    // Business/Work themed images
    if (title.includes('work') || content.includes('productivity') || content.includes('business') || category.includes('business')) {
      const businessImages = [
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=center', // Charts/data
        'https://images.unsplash.com/photo-1552664730-d307ca884978?w=100&h=100&fit=crop&crop=center', // Team meeting
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=100&h=100&fit=crop&crop=center', // Business analytics
        'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=100&h=100&fit=crop&crop=center', // Office space
      ];
      return businessImages[idHash % businessImages.length];
    }
    
    // Nature/Abstract themed images for general content
    const generalImages = [
      'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=100&h=100&fit=crop&crop=center', // Forest lights
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=100&h=100&fit=crop&crop=center', // Mountain lake
      'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=100&h=100&fit=crop&crop=center', // Green mountains
      'https://images.unsplash.com/photo-1493397212122-2b85dda8106b?w=100&h=100&fit=crop&crop=center', // Abstract architecture
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&h=100&fit=crop&crop=center', // Sunset landscape
      'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=100&h=100&fit=crop&crop=center', // Ocean waves
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=100&h=100&fit=crop&crop=center', // Forest path
      'https://images.unsplash.com/photo-1504198458649-3128b932f49e?w=100&h=100&fit=crop&crop=center', // City skyline
    ];
    
    return generalImages[idHash % generalImages.length];
  };

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
  const transformedPosts = allConversations.map((conversation, index) => {
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
      readTime: conversation.read_time || 5,
      image: getRelevantImage(conversation, index)
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
        <Header 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
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
        <Header 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
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
      <Header 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      
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
