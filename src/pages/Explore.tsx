import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { BrowserWindow } from "@/components/BrowserWindow";
import { CategoryFilter } from "@/components/CategoryFilter";
import { TopicFilter } from "@/components/TopicFilter";
import { PostCard } from "@/components/PostCard";
import { PostCardSkeleton } from "@/components/PostCardSkeleton";
import { SortOptions } from "@/components/SortOptions";
import { Search, Loader2 } from "lucide-react";
import { useConversations } from "@/hooks/useConversationsSimple";
import { useAuth } from "@/hooks/useAuthSimple";
import { useDebounce } from "@/hooks/useDebounce";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

const Explore = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [sortBy, setSortBy] = useState("hot");
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useAuth();

  const POSTS_PER_PAGE = 12;

  // Debounce search query to reduce API calls
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Master list of all unique images across all categories
  const allUniqueImages = [
    // Programming/Tech images
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1473091534298-04dcbce3278c?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1552664730-d307ca884978?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=center',
    
    // AI/Technology images
    'https://images.unsplash.com/photo-1518770660439-4636190af475?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1487887235947-a955ef187fcc?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1485833077593-4278bba3f11f?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1630794173899-4e4ab5e32153?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1559762384-3e8ea2e7b3e6?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1546776230-de10e3dfbe8e?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1564865878688-9a244444042a?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&h=100&fit=crop&crop=center',
    
    // Science/Research images
    'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1576319155264-99536e0be1ee?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1607414893350-ac57b8bc23d6?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1516796181074-bf453fbfa3e6?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1518152006812-edab29b069ac?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1541963463532-d68292c34d19?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1551818255-e6e10975cd17?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=100&h=100&fit=crop&crop=center',
    
    // Philosophy/Consciousness images
    'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1444927714506-8492d94b5ba0?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1458668383970-8ddd3927deed?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1440342359743-84fcb8c21f21?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1506768787310-42a4b1e89e51?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=100&h=100&fit=crop&crop=center',
    
    // Architecture/Building images
    'https://images.unsplash.com/photo-1527576539890-dfa815648363?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1496307653780-42ee777d4833?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1431576901776-e539bd916ba2?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1460574283810-2aab119d8511?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1486718448742-163732cd1544?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1439337153520-7082a56a81f4?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1497604401993-f2e922e5cb0a?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1473177104440-ffee2f376098?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1494891848038-7bd202a2afeb?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1551038247-3d9af20df552?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1524230572899-a752b3835840?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1433832597046-4f10e10ac764?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1493397212122-2b85dda8106b?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1466442929976-97f336a657be?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?w=100&h=100&fit=crop&crop=center',
    
    // Nature/General images for variety
    'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1504198458649-3128b932f49e?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1495555687398-3f50d6e79e1e?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1438565434616-3ef039228b15?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1501286353178-1ec881214838?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1469041797191-50ace28483c3?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1452378174528-3090a4bba7b2?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1487252665478-49b61b47f302?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1441057206919-63d19fac2369?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=100&h=100&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1517022812141-23620dba5c23?w=100&h=100&fit=crop&crop=center'
  ];

  // Function to assign unique images - no repeats allowed
  const getUniqueImage = (() => {
    const usedImages = new Set<string>();
    let imageIndex = 0;
    
    return (conversation: any, index: number) => {
      // If we've used all images, start over (shouldn't happen with 120+ images)
      if (imageIndex >= allUniqueImages.length) {
        imageIndex = 0;
        usedImages.clear();
      }
      
      // Get next available unique image
      let selectedImage = allUniqueImages[imageIndex];
      
      // Ensure this image hasn't been used
      while (usedImages.has(selectedImage) && imageIndex < allUniqueImages.length - 1) {
        imageIndex++;
        selectedImage = allUniqueImages[imageIndex];
      }
      
      // Mark as used and move to next
      usedImages.add(selectedImage);
      imageIndex++;
      
      return selectedImage;
    };
  })();

  // Use the selected category for filtering, but also apply topic filter if not "all"
  const effectiveCategory = selectedFilter !== "all" ? selectedFilter : selectedCategory;

  // Fetch conversations with infinite scroll and search
  const { 
    data, 
    isLoading, 
    error, 
    refetch, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage 
  } = useConversations(effectiveCategory, POSTS_PER_PAGE, debouncedSearchQuery);

  // Flatten all pages of data
  const allConversations = useMemo(() => {
    const conversations = data?.pages.flatMap(page => page.conversations) || [];
    console.log('Explore page - all conversations:', conversations);
    console.log('Explore page - effective category:', effectiveCategory);
    return conversations;
  }, [data, effectiveCategory]);

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
      id: typeof conversation.id === 'string' ? parseInt(conversation.id.replace(/\D/g, '')) || index : conversation.id,
      title: conversation.title,
      content: conversation.content,
      author: profile?.username || profile?.full_name || 'Anonymous',
      authorAvatar: profile?.avatar_url || `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face`,
      category: conversation.category,
      aiModel: "GPT-4", 
      upvotes: conversation.likes_count || Math.floor(Math.random() * 50) + 10,
      comments: conversation.comments_count || Math.floor(Math.random() * 20) + 2,
      timestamp: new Date(conversation.created_at).toLocaleDateString(),
      readTime: conversation.read_time || 5,
      image: getUniqueImage(conversation, index)
    };
  });
  
  console.log('Explore page - transformed posts:', transformedPosts);

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
    setSelectedFilter("all"); // Reset topic filter when category changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = () => {
    // This function is no longer needed as search is handled by debouncedSearchQuery
    // Keeping it for now, but it can be removed if not used elsewhere.
  };

  if (isLoading) {
    return (
      <div>
        <BrowserWindow />
        <Header 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <main className="container">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Explore Conversations</h1>
            <p className="text-lg text-text-1">
              Discover fascinating AI conversations across all categories and topics
            </p>
          </div>

          {/* Search and Filters Skeleton */}
          <div className="card mb-8">
            <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="h-10 bg-white/20 rounded animate-pulse"></div>
                <div className="h-10 bg-white/20 rounded animate-pulse"></div>
              </div>
              <div className="h-10 bg-white/20 rounded animate-pulse"></div>
            </div>
          </div>

          {/* Loading Skeletons */}
          <div className="card-grid">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="card animate-pulse">
                <div className="h-4 bg-white/20 rounded mb-2"></div>
                <div className="h-6 bg-white/20 rounded mb-4"></div>
                <div className="h-4 bg-white/20 rounded mb-2"></div>
                <div className="h-4 bg-white/20 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <BrowserWindow />
        <Header 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <main className="container">
          <div className="card text-center py-12">
            <div className="text-6xl mb-4">⚠️</div>
            <h3 className="text-xl font-semibold mb-2">Error loading conversations</h3>
            <p className="text-text-1 mb-6">{error.message}</p>
            <button 
              onClick={() => refetch()}
              className="btn primary"
            >
              Retry
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div>
      <BrowserWindow />
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} onSearchSubmit={handleSearch} />
      
      <main className="container">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Explore Conversations</h1>
          <p className="text-lg leading-relaxed max-w-none">
            Discover fascinating AI conversations across all categories and topics. 
            Browse through our curated collection of meaningful dialogues, research insights, 
            and thought-provoking exchanges that showcase the potential of human-AI collaboration.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="card mb-8">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <CategoryFilter 
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
              />
              <TopicFilter 
                selectedFilter={selectedFilter}
                onFilterChange={handleFilterChange}
              />
            </div>
            <SortOptions 
              selectedSort={sortBy}
              onSortChange={setSortBy}
            />
          </div>
        </div>

        {/* Search Results Info */}
        {searchQuery && (
          <div className="card mb-6">
            <div className="flex items-center justify-between">
              <p className="text-text-1">
                Search results for "<span className="font-semibold text-text-0">{searchQuery}</span>"
              </p>
              <button 
                onClick={() => setSearchQuery("")}
                className="text-accent hover:text-accent-2 transition-colors"
              >
                Clear search
              </button>
            </div>
          </div>
        )}

        {/* Posts Grid */}
        <div className="card-grid">
          {isLoading ? (
            // Loading skeletons
            Array.from({ length: POSTS_PER_PAGE }).map((_, index) => (
              <div key={index} className="card animate-pulse">
                <div className="h-4 bg-white/20 rounded mb-2"></div>
                <div className="h-6 bg-white/20 rounded mb-4"></div>
                <div className="h-4 bg-white/20 rounded mb-2"></div>
                <div className="h-4 bg-white/20 rounded w-3/4"></div>
              </div>
            ))
          ) : hasNextPage ? (
            // Posts with infinite scroll
            sortedPosts.map((post, index) => (
              <div key={post.id} className="card" ref={index === sortedPosts.length - 1 ? loadMoreRef : null}>
                <PostCard post={post} />
              </div>
            ))
          ) : (
            // All posts loaded
            sortedPosts.map((post) => (
              <div key={post.id} className="card">
                <PostCard post={post} />
              </div>
            ))
          )}
        </div>

        {/* Loading More Indicator */}
        {isFetchingNextPage && (
          <div className="flex justify-center mt-8">
            <div className="flex items-center space-x-2 text-text-1">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Loading more conversations...</span>
            </div>
          </div>
        )}

        {/* No Results */}
        {!isLoading && sortedPosts.length === 0 && (
          <div className="card text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No conversations found</h3>
            <p className="text-text-1 mb-6">
              {searchQuery 
                ? `No conversations match your search for "${searchQuery}"`
                : "Try adjusting your filters or search terms"
              }
            </p>
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="btn primary"
              >
                Clear search
              </button>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Explore;
