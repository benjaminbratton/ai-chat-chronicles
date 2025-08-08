import { useState } from "react";
import { Link } from "react-router-dom";
import { MessageSquare, Play } from "lucide-react";
import { ModernHeader } from "./ModernHeader";
import { useConversations, useFeaturedConversations } from "@/hooks/useConversationsSimple";

interface ModernFeedLayoutProps {
  children?: React.ReactNode;
}

export const ModernFeedLayout = ({ children }: ModernFeedLayoutProps) => {
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Fetch conversations from backend
  const { data: conversationsData, isLoading: conversationsLoading } = useConversations();
  const { data: featuredData, isLoading: featuredLoading } = useFeaturedConversations();
  
  // Get conversations from the first page
  const allConversations = conversationsData?.pages?.[0]?.conversations || [];
  const featuredConversations = featuredData?.pages?.[0]?.conversations || [];
  
  // Combine all conversations
  const conversations = [...featuredConversations, ...allConversations.filter(conv => !conv.featured)];

  const handleSearchSubmit = () => {
    // Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  const handlePostClick = (post: any) => {
    setSelectedPost(post);
  };

  const handleBackClick = () => {
    setSelectedPost(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <ModernHeader 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchSubmit={handleSearchSubmit}
        showBackButton={!!selectedPost}
        onBackClick={handleBackClick}
      />
      
      <div className="flex h-[calc(100vh-64px)]">
        {/* Left sidebar - Navigation */}
        <div className="w-16 bg-secondary border-r border-border flex flex-col items-center py-4">
          <div className="text-xs text-muted-foreground transform -rotate-90 whitespace-nowrap mb-8">
            Conversations
          </div>
          <div className="w-6 h-6 bg-primary rounded"></div>
        </div>
        
        {/* Main content area */}
        <div className="flex-1 flex">
          {/* Left pane - Feed */}
          <div className="w-1/2 border-r border-border overflow-y-auto">
            {/* Navigation tabs */}
            <div className="flex border-b border-border">
              <button className="flex-1 py-3 px-4 text-primary border-b-2 border-primary font-medium">
                Feed
              </button>
              <button className="flex-1 py-3 px-4 text-muted-foreground hover:text-foreground">
                Collections
              </button>
              <button className="flex-1 py-3 px-4 text-muted-foreground hover:text-foreground">
                Lab
              </button>
              <button className="flex-1 py-3 px-4 text-muted-foreground hover:text-foreground">
                People
              </button>
            </div>
            
            {/* Posts feed */}
            <div className="p-4 space-y-6">
              {conversationsLoading ? (
                // Loading skeleton
                Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="h-6 bg-secondary rounded mb-2"></div>
                    <div className="h-4 bg-secondary rounded mb-1"></div>
                    <div className="h-4 bg-secondary rounded w-3/4 mb-3"></div>
                    <div className="h-16 bg-secondary rounded mb-2"></div>
                    <div className="flex justify-between items-center">
                      <div className="h-4 bg-secondary rounded w-20"></div>
                      <div className="h-6 bg-secondary rounded w-16"></div>
                    </div>
                  </div>
                ))
              ) : (
                conversations.map((post, index) => (
                  <div 
                    key={post.id} 
                    className={`cursor-pointer p-4 rounded-lg transition-colors ${
                      selectedPost?.id === post.id ? 'bg-secondary' : 'hover:bg-secondary/50'
                    }`}
                    onClick={() => handlePostClick(post)}
                  >
                    {/* Post title */}
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {post.title}
                    </h3>
                    
                    {/* Post metadata */}
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-3">
                      <span>{post.profiles?.username || 'autorun'}</span>
                      <span>•</span>
                      <span>{post.category}</span>
                    </div>
                    
                    {/* Post description */}
                    <p className="text-foreground mb-3 line-clamp-2">
                      {post.excerpt || post.content}
                    </p>
                    
                    {/* AI response block */}
                    {index === 0 && (
                      <div className="ai-response-block mb-3">
                        <p className="ai-response-text">
                          GPT 4o An intriguing question—emotions can deepen understanding, yet they are not strictly necessary
                        </p>
                      </div>
                    )}
                    
                    {/* Post footer */}
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{post.comments_count || 31} comments</span>
                      <button className="flex items-center space-x-1 text-primary hover:text-primary/80">
                        <Play className="w-4 h-4" />
                        <span>Replay</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          
          {/* Right pane - Post detail */}
          <div className="w-1/2 overflow-y-auto">
            {selectedPost ? (
              <div className="p-6">
                {/* Post header */}
                <div className="mb-6">
                  <h1 className="text-2xl font-bold text-foreground mb-2">
                    {selectedPost.title}
                  </h1>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
                    <span>{selectedPost.profiles?.username || 'autorun'}</span>
                    <span>•</span>
                    <span>{selectedPost.category}</span>
                  </div>
                  <p className="text-foreground line-clamp-3">
                    {selectedPost.excerpt || selectedPost.content}
                  </p>
                </div>
                
                {/* Comments section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">
                    {selectedPost.comments_count || 31} comments
                  </h3>
                  
                  {/* Mock comments */}
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="flex space-x-3">
                      <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                        <span className="text-xs text-muted-foreground">U</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 text-sm mb-1">
                          <span className="text-foreground font-medium">user{index + 1}</span>
                          <span className="text-muted-foreground">•</span>
                          <span className="text-muted-foreground">{Math.floor(Math.random() * 60) + 1} min ago</span>
                        </div>
                        <p className="text-foreground text-sm">
                          {index === 0 && "I agree. That's a proper unconsciousness."}
                          {index === 1 && "I think they are at consensus."}
                          {index === 2 && "Not a proper approach for helping AIs develop."}
                          {index === 3 && "Agree: the emotional component is crucial."}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <div className="text-center">
                  <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Select a post to view details</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
