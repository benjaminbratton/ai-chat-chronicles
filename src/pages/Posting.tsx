
import { useState } from "react";
import { Header } from "@/components/Header";
import { PostForm } from "@/components/PostForm";
import { CommentSection } from "@/components/CommentSection";

const Posting = () => {
  const [showComments, setShowComments] = useState(false);
  const [postData, setPostData] = useState(null);

  const handlePostSubmit = (data: any) => {
    setPostData(data);
    setShowComments(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-4xl mx-auto px-6 py-16">
        {!showComments ? (
          <div>
            <h1 className="text-5xl font-extralight text-foreground mb-12 tracking-tight">
              Share Your AI Conversation
            </h1>
            <PostForm onSubmit={handlePostSubmit} />
          </div>
        ) : (
          <div>
            <button 
              onClick={() => setShowComments(false)}
              className="mb-8 text-sm text-muted-foreground hover:text-foreground transition-colors tracking-wider mono"
            >
              ← Back to editing
            </button>
            
            {/* Post Preview */}
            <div className="industrial-surface p-12 mb-12">
              <div className="mb-8">
                <h1 className="text-4xl font-light text-foreground mb-4 tracking-tight">{postData?.title}</h1>
                <div className="flex items-center space-x-6 text-sm text-muted-foreground mono">
                  <span>By {postData?.author}</span>
                  <span>•</span>
                  <span>{new Date(postData?.date).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>AI Model: {postData?.aiModel}</span>
                </div>
              </div>
              <div className="prose prose-invert max-w-none">
                <p className="text-foreground/90 leading-relaxed whitespace-pre-wrap font-light text-lg">{postData?.content}</p>
              </div>
            </div>

            <CommentSection />
          </div>
        )}
      </main>
    </div>
  );
};

export default Posting;
