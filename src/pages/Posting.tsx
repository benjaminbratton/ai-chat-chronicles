
import { useState } from "react";
import { Header } from "@/components/Header";
import { BrowserWindow } from "@/components/BrowserWindow";
import { PostForm } from "@/components/PostForm";
import { CommentSection } from "@/components/CommentSection";

const Posting = () => {
  const [showComments, setShowComments] = useState(false);
  const [postData, setPostData] = useState(null);
  const [postType, setPostType] = useState<"dialogue" | "research">("dialogue");

  const handlePostSubmit = (data: any) => {
    setPostData(data);
    setShowComments(true);
  };

  return (
    <div className="min-h-screen bg-gray-200">
      <BrowserWindow />
      <Header />
      
      <main className="max-w-6xl mx-auto px-6 py-12">
        {!showComments ? (
          <div>
            {/* Hero Section - Two Column Layout */}
            <div className="mb-16 grid md:grid-cols-2 gap-16">
              {/* Left Column - Dialogues with AI */}
              <div 
                className={`cursor-pointer p-8 rounded-2xl transition-all duration-300 ${
                  postType === "dialogue" 
                    ? "bg-green-50 ring-2 ring-green-200 shadow-lg" 
                    : "bg-white hover:bg-green-25 hover:shadow-md"
                }`}
                onClick={() => setPostType("dialogue")}
              >
                <h1 className="text-4xl md:text-5xl font-thin text-green-800 mb-6 tracking-tight">
                  Share Dialogues with AI
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed font-thin">
                  Share your fascinating conversations with artificial intelligence. 
                  Post dialogues, chat transcripts, and collaborative discussions with AI models.
                </p>
              </div>

              {/* Right Column - Deep Research */}
              <div 
                className={`cursor-pointer p-8 rounded-2xl transition-all duration-300 ${
                  postType === "research" 
                    ? "bg-blue-50 ring-2 ring-blue-200 shadow-lg" 
                    : "bg-white hover:bg-blue-25 hover:shadow-md"
                }`}
                onClick={() => setPostType("research")}
              >
                <h1 className="text-4xl md:text-5xl font-thin text-blue-800 mb-6 tracking-tight">
                  Share Deep Research
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed font-thin">
                  Share comprehensive research reports and in-depth analyses. 
                  Post scholarly work, detailed studies, and academic investigations.
                </p>
              </div>
            </div>

            <PostForm onSubmit={handlePostSubmit} postType={postType} />
          </div>
        ) : (
          <div>
            <button 
              onClick={() => setShowComments(false)}
              className="mb-6 text-sm text-gray-600 hover:text-black transition-colors"
            >
              ← Back to editing
            </button>
            
            {/* Post Preview */}
            <div className={`border border-gray-300 p-8 mb-8 rounded-2xl ${
              postData?.postType === "research" ? "bg-blue-50" : "bg-green-50"
            }`}>
              <div className="mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                    postData?.postType === "research" 
                      ? "bg-blue-500 text-white" 
                      : "bg-green-500 text-white"
                  }`}>
                    {postData?.postType === "research" ? "Deep Research" : "AI Dialogue"}
                  </span>
                </div>
                <h1 className="text-3xl font-thin text-black mb-2">{postData?.title}</h1>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>By {postData?.author}</span>
                  <span>•</span>
                  <span>{new Date(postData?.date).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>AI Model: {postData?.aiModel}</span>
                </div>
              </div>

              {/* Display uploaded images */}
              {postData?.images && postData.images.length > 0 && (
                <div className="mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {postData.images.map((image: File, index: number) => (
                      <img
                        key={index}
                        src={URL.createObjectURL(image)}
                        alt={`Uploaded image ${index + 1}`}
                        className="w-full h-64 object-cover rounded-lg border border-gray-300"
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{postData?.content}</p>
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
