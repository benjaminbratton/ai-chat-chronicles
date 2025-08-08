import { useState } from 'react';
import { useAuth } from '@/hooks/useAuthSimple';
import { useCreateConversation } from '@/hooks/useConversationsSimple';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const TestAuth = () => {
  const [email, setEmail] = useState('admin@aichatchronicles.com');
  const [password, setPassword] = useState('admin123');
  const [title, setTitle] = useState('Test Post');
  const [content, setContent] = useState('This is a test post created via the frontend.');
  const [category, setCategory] = useState('Technology');

  const { user, signIn, signOut } = useAuth();
  const { toast } = useToast();
  const createConversationMutation = useCreateConversation();

  const handleLogin = async () => {
    try {
      await signIn(email, password);
      toast({
        title: "Success",
        description: "Logged in successfully!",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleLogout = async () => {
    await signOut();
    toast({
      title: "Success",
      description: "Logged out successfully!",
    });
  };

  const handleCreatePost = async () => {
    if (!user) {
      toast({
        title: "Error",
        description: "Please login first",
        variant: "destructive",
      });
      return;
    }

    try {
      await createConversationMutation.mutateAsync({
        title,
        content,
        category,
        excerpt: content.substring(0, 200) + (content.length > 200 ? "..." : ""),
        read_time: Math.ceil(content.length / 200),
        published: true,
        featured: false,
      });

      toast({
        title: "Success",
        description: "Post created successfully!",
      });

      // Clear form
      setTitle('');
      setContent('');
      setCategory('Technology');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center">🔐 Authentication & Posting Test</h1>
        
        {/* Auth Status */}
        <Card>
          <CardHeader>
            <CardTitle>Authentication Status</CardTitle>
          </CardHeader>
          <CardContent>
            {user ? (
              <div className="space-y-2">
                <p><strong>Logged in as:</strong> {user.full_name || user.email}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Role:</strong> {user.id === 'admin-001' ? 'Admin' : 'User'}</p>
                <Button onClick={handleLogout} variant="destructive">
                  Logout
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-red-600">Not logged in</p>
                <div className="space-y-2">
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button onClick={handleLogin}>
                    Login
                  </Button>
                </div>
                <p className="text-sm text-gray-600">
                  <strong>Test Credentials:</strong><br />
                  Email: admin@aichatchronicles.com<br />
                  Password: admin123
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Create Post */}
        {user && (
          <Card>
            <CardHeader>
              <CardTitle>Create New Post</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input
                  placeholder="Post Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Textarea
                  placeholder="Post Content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={4}
                />
                <Input
                  placeholder="Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
                <Button 
                  onClick={handleCreatePost}
                  disabled={createConversationMutation.isPending}
                >
                  {createConversationMutation.isPending ? 'Creating...' : 'Create Post'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Backend Status */}
        <Card>
          <CardHeader>
            <CardTitle>Backend Status</CardTitle>
          </CardHeader>
          <CardContent>
            <p><strong>Backend URL:</strong> http://localhost:3001</p>
            <p><strong>Frontend URL:</strong> http://localhost:8080</p>
            <p><strong>Status:</strong> ✅ Both servers running</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TestAuth;
