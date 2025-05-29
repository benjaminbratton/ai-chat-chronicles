
import { useState } from "react";
import { Header } from "@/components/Header";
import { BrowserWindow } from "@/components/BrowserWindow";
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
    <div className="min-h-screen bg-gray-200">
      <BrowserWindow />
      <Header />
      
      <main className="max-w-4xl mx-auto px-6 py-12">
        {!showComments ? (
          <div>
            <h1 className="text-4xl font-thin text-black mb-8 tracking-tight">
              Share Your AI Conversation
            </h1>
            <PostForm onSubmit={handlePostSubmit} />
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
            <div className="bg-white border border-gray-300 p-8 mb-8">
              <div className="mb-4">
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
