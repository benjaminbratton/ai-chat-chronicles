
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { AIModelSelect } from "@/components/AIModelSelect";
import { CategoryFilter } from "@/components/CategoryFilter";
import { Upload, X } from "lucide-react";

interface PostFormProps {
  onSubmit: (data: any) => void;
  postType: "dialogue" | "research";
}

export const PostForm = ({ onSubmit, postType }: PostFormProps) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    date: new Date().toISOString().split('T')[0],
    aiModel: "",
    content: "",
    excerpt: "",
    category: "Philosophy",
    postType: postType
  });

  const [uploadedImages, setUploadedImages] = useState<File[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...formData, images: uploadedImages, postType });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setUploadedImages(prev => [...prev, ...files]);
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const bgColor = postType === "research" ? "bg-blue-50" : "bg-green-50";
  const borderColor = postType === "research" ? "border-blue-200" : "border-green-200";

  return (
    <form onSubmit={handleSubmit} className={`${bgColor} ${borderColor} border p-8 space-y-6 rounded-2xl`}>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="title">
            {postType === "research" ? "Research Title" : "Conversation Title"}
          </Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder={postType === "research" ? "Enter your research title..." : "Enter your conversation title..."}
            required
            className="border-gray-300 focus:border-black focus:ring-black bg-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="author">Your Name</Label>
          <Input
            id="author"
            value={formData.author}
            onChange={(e) => handleChange("author", e.target.value)}
            placeholder="Enter your name..."
            required
            className="border-gray-300 focus:border-black focus:ring-black bg-white"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => handleChange("date", e.target.value)}
            required
            className="border-gray-300 focus:border-black focus:ring-black bg-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="aiModel">AI Model Used</Label>
          <AIModelSelect
            value={formData.aiModel}
            onValueChange={(value) => handleChange("aiModel", value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Category</Label>
        <CategoryFilter
          selectedCategory={formData.category}
          onCategoryChange={(category) => handleChange("category", category)}
          excludeAll={true}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt">Brief Summary</Label>
        <Textarea
          id="excerpt"
          value={formData.excerpt}
          onChange={(e) => handleChange("excerpt", e.target.value)}
          placeholder={postType === "research" ? "Write a brief summary of your research..." : "Write a brief summary of your conversation..."}
          rows={3}
          className="border-gray-300 focus:border-black focus:ring-black resize-none bg-white"
        />
      </div>

      {/* Image Upload Section */}
      <div className="space-y-2">
        <Label htmlFor="images">Upload Images</Label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-white">
          <div className="text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="mt-4">
              <label htmlFor="image-upload" className="cursor-pointer">
                <span className="mt-2 block text-sm font-medium text-gray-900">
                  Click to upload images
                </span>
                <span className="mt-1 block text-sm text-gray-500">
                  PNG, JPG, GIF up to 10MB each
                </span>
              </label>
              <input
                id="image-upload"
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="sr-only"
              />
            </div>
          </div>
        </div>

        {/* Image Previews */}
        {uploadedImages.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {uploadedImages.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Upload ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg border border-gray-300"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">
          {postType === "research" ? "Full Research Content" : "Full Conversation"}
        </Label>
        <Textarea
          id="content"
          value={formData.content}
          onChange={(e) => handleChange("content", e.target.value)}
          placeholder={postType === "research" ? "Paste your full research content here..." : "Paste your full conversation here..."}
          rows={15}
          required
          className="border-gray-300 focus:border-black focus:ring-black resize-none font-mono text-sm bg-white"
        />
      </div>

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          className="border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          Save Draft
        </Button>
        <Button
          type="submit"
          className={`text-white hover:opacity-90 ${
            postType === "research" ? "bg-blue-600" : "bg-green-600"
          }`}
        >
          Preview & Share
        </Button>
      </div>
    </form>
  );
};
