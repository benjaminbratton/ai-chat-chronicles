
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { AIModelSelect } from "@/components/AIModelSelect";

interface PostFormProps {
  onSubmit: (data: any) => void;
}

export const PostForm = ({ onSubmit }: PostFormProps) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    date: new Date().toISOString().split('T')[0],
    aiModel: "",
    content: "",
    excerpt: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-300 p-8 space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="title">Conversation Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder="Enter your conversation title..."
            required
            className="border-gray-300 focus:border-black focus:ring-black"
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
            className="border-gray-300 focus:border-black focus:ring-black"
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
            className="border-gray-300 focus:border-black focus:ring-black"
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
        <Label htmlFor="excerpt">Brief Summary</Label>
        <Textarea
          id="excerpt"
          value={formData.excerpt}
          onChange={(e) => handleChange("excerpt", e.target.value)}
          placeholder="Write a brief summary of your conversation..."
          rows={3}
          className="border-gray-300 focus:border-black focus:ring-black resize-none"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Full Conversation</Label>
        <Textarea
          id="content"
          value={formData.content}
          onChange={(e) => handleChange("content", e.target.value)}
          placeholder="Paste your full conversation here..."
          rows={15}
          required
          className="border-gray-300 focus:border-black focus:ring-black resize-none font-mono text-sm"
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
          className="bg-black text-white hover:bg-gray-800"
        >
          Preview & Share
        </Button>
      </div>
    </form>
  );
};
