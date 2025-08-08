import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Header } from "@/components/Header";
import { BrowserWindow } from "@/components/BrowserWindow";
import { useToast } from "@/hooks/use-toast";

const SimplePosting = () => {
  const [formData, setFormData] = useState({
    title: "",
    authorName: "",
    date: new Date().toLocaleDateString('en-US', { 
      month: '2-digit', 
      day: '2-digit', 
      year: 'numeric' 
    }),
    aiModel: "",
    category: "Philosophy",
    summary: "",
    fullConversation: "",
    images: [] as File[]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const aiModels = [
    "GPT-4",
    "GPT-3.5",
    "Claude 3",
    "Claude 2",
    "Gemini Pro",
    "Llama 2",
    "Other"
  ];

  // Exact colors from the image
  const categories = [
    { name: "Philosophy", color: "backdrop-blur-md bg-gradient-to-r from-purple-600/30 to-purple-700/30 border border-purple-500/30", textColor: "text-white" },
    { name: "Creative Writing", color: "backdrop-blur-md bg-gradient-to-r from-pink-600/30 to-pink-700/30 border border-pink-500/30", textColor: "text-white" },
    { name: "Programming", color: "backdrop-blur-md bg-gradient-to-r from-blue-600/30 to-blue-700/30 border border-blue-500/30", textColor: "text-white" },
    { name: "Technology", color: "backdrop-blur-md bg-gradient-to-r from-cyan-600/30 to-cyan-700/30 border border-cyan-500/30", textColor: "text-white" },
    { name: "Science", color: "backdrop-blur-md bg-gradient-to-r from-green-600/30 to-green-700/30 border border-green-500/30", textColor: "text-white" },
    { name: "Education", color: "backdrop-blur-md bg-gradient-to-r from-yellow-600/30 to-yellow-700/30 border border-yellow-500/30", textColor: "text-black" },
    { name: "Business", color: "backdrop-blur-md bg-gradient-to-r from-orange-600/30 to-orange-700/30 border border-orange-500/30", textColor: "text-white" },
    { name: "Personal", color: "backdrop-blur-md bg-gradient-to-r from-indigo-600/30 to-indigo-700/30 border border-indigo-500/30", textColor: "text-white" },
    { name: "Research", color: "backdrop-blur-md bg-gradient-to-r from-teal-600/30 to-teal-700/30 border border-teal-500/30", textColor: "text-white" },
    { name: "Healthcare", color: "backdrop-blur-md bg-gradient-to-r from-red-600/30 to-red-700/30 border border-red-500/30", textColor: "text-white" }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log('Submitting post:', formData);

      // Get admin token
      const loginResponse = await fetch('http://localhost:3001/api/v1/auth/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'admin@aichatchronicles.com',
          password: 'admin123'
        })
      });

      const loginResult = await loginResponse.json();
      if (!loginResult.success) {
        throw new Error('Failed to get admin token');
      }

      const token = loginResult.data.token;
      console.log('Got admin token:', token);

      // Create the post
      const postResponse = await fetch('http://localhost:3001/api/v1/conversations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: formData.title,
          content: formData.fullConversation,
          excerpt: formData.summary,
          category: formData.category,
          author: formData.authorName,
          ai_model: formData.aiModel,
          date: formData.date
        })
      });

      const postResult = await postResponse.json();
      console.log('Post result:', postResult);

      if (!postResult.success) {
        throw new Error(postResult.message || 'Failed to create post');
      }

      toast({
        title: "Success!",
        description: "Your conversation has been published.",
      });

      // Redirect to the post page
      const postId = postResult.data.id.replace('conv-', '');
      setTimeout(() => {
        navigate(`/post/${postId}`);
      }, 1000);

    } catch (error) {
      console.error('Error creating post:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to publish your conversation.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData(prev => ({ ...prev, images: [...prev.images, ...files] }));
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({ 
      ...prev, 
      images: prev.images.filter((_, i) => i !== index) 
    }));
  };

  return (
    <div>
      <BrowserWindow />
      <Header />
      
      <main className="container">
        <div className="card">
          <h1 className="text-3xl font-bold mb-8">Share Your Conversation</h1>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Conversation Title */}
            <div>
              <Label htmlFor="title" className="text-lg font-semibold">Conversation Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="Enter your conversation title..."
                required
                className="mt-2 text-lg"
              />
            </div>

            {/* Author Name and Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="authorName" className="text-lg font-semibold">Your Name</Label>
                <Input
                  id="authorName"
                  value={formData.authorName}
                  onChange={(e) => handleChange("authorName", e.target.value)}
                  placeholder="Enter your name..."
                  required
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="date" className="text-lg font-semibold">Date</Label>
                <Input
                  id="date"
                  type="text"
                  value={formData.date}
                  onChange={(e) => handleChange("date", e.target.value)}
                  className="mt-2"
                />
              </div>
            </div>

            {/* AI Model */}
            <div>
              <Label htmlFor="aiModel" className="text-lg font-semibold">AI Model Used</Label>
              <select
                id="aiModel"
                value={formData.aiModel}
                onChange={(e) => handleChange("aiModel", e.target.value)}
                className="mt-2 block w-full rounded-md shadow-sm"
              >
                <option value="">Select AI model...</option>
                {aiModels.map(model => (
                  <option key={model} value={model}>{model}</option>
                ))}
              </select>
            </div>

            {/* Category Selection */}
            <div>
              <Label className="text-lg font-semibold">Category</Label>
              <div className="mt-3 flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category.name}
                    type="button"
                    onClick={() => handleChange("category", category.name)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${category.color} ${category.textColor} hover:opacity-80 ${
                      formData.category === category.name ? 'ring-2 ring-black ring-offset-2' : ''
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Brief Summary */}
            <div>
              <Label htmlFor="summary" className="text-lg font-semibold">Brief Summary</Label>
              <Textarea
                id="summary"
                value={formData.summary}
                onChange={(e) => handleChange("summary", e.target.value)}
                placeholder="Write a brief summary of your conversation..."
                rows={4}
                required
                className="mt-2"
              />
            </div>

            {/* Image Upload */}
            <div>
              <Label className="text-lg font-semibold">Upload Images</Label>
              <div className="mt-2 border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-accent transition-colors">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <div className="text-4xl mb-2">📤</div>
                  <p className="text-text-1">Click to upload images</p>
                  <p className="text-sm text-text-dim mt-1">PNG, JPG, GIF up to 10MB each</p>
                </label>
              </div>
              {formData.images.length > 0 && (
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {formData.images.map((file, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-error text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Full Conversation */}
            <div>
              <Label htmlFor="fullConversation" className="text-lg font-semibold">Full Conversation</Label>
              <Textarea
                id="fullConversation"
                value={formData.fullConversation}
                onChange={(e) => handleChange("fullConversation", e.target.value)}
                placeholder="Paste your full conversation here..."
                rows={12}
                required
                className="mt-2"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/')}
                className="btn"
              >
                Save Draft
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="btn primary"
              >
                {isSubmitting ? "Publishing..." : "Preview & Share"}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default SimplePosting;
