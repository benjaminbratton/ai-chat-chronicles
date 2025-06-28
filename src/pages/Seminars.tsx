
import { useState } from 'react';
import { Header } from '@/components/Header';
import { BrowserWindow } from '@/components/BrowserWindow';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CategoryFilter } from '@/components/CategoryFilter';
import { Clock, Users, MessageSquare, Calendar } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

const Seminars = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Philosophy',
    duration: '',
    maxParticipants: ''
  });

  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch seminars from database
  const { data: seminars = [], isLoading } = useQuery({
    queryKey: ['seminars', selectedCategory],
    queryFn: async () => {
      let query = supabase
        .from('seminars')
        .select(`
          *,
          profiles:host_id (
            id,
            full_name,
            username,
            avatar_url
          )
        `)
        .order('created_at', { ascending: false });

      if (selectedCategory !== 'All') {
        query = query.eq('category', selectedCategory);
      }

      const { data, error } = await query;
      if (error) throw error;

      return data.map(seminar => ({
        id: seminar.id,
        title: seminar.title,
        description: seminar.description,
        category: seminar.category,
        duration: `${seminar.duration_minutes} minutes`,
        author: seminar.profiles?.username || seminar.profiles?.full_name || 'Anonymous',
        participants: seminar.participants_count || 0,
        maxParticipants: seminar.max_participants || 5,
        status: seminar.status,
        createdAt: new Date(seminar.created_at).toLocaleDateString()
      }));
    },
  });

  // Create seminar mutation
  const createSeminarMutation = useMutation({
    mutationFn: async (newSeminar: any) => {
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('seminars')
        .insert([
          {
            title: newSeminar.title,
            description: newSeminar.description,
            category: newSeminar.category,
            duration_minutes: parseInt(newSeminar.duration),
            max_participants: parseInt(newSeminar.maxParticipants),
            host_id: user.id,
            status: 'upcoming',
            scheduled_at: new Date().toISOString()
          },
        ])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['seminars'] });
      toast({
        title: 'Success',
        description: 'Seminar created successfully!',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: `Failed to create seminar: ${error.message}`,
        variant: 'destructive',
      });
    },
  });

  const handleCreateSeminar = (e: React.FormEvent) => {
    e.preventDefault();
    createSeminarMutation.mutate(formData);
    setShowCreateForm(false);
    setFormData({
      title: '',
      description: '',
      category: 'Philosophy',
      duration: '',
      maxParticipants: ''
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'text-green-600 bg-green-100';
      case 'live': return 'text-yellow-600 bg-yellow-100';
      case 'completed': return 'text-gray-600 bg-gray-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'upcoming': return 'Open';
      case 'live': return 'In Progress';
      case 'completed': return 'Completed';
      case 'cancelled': return 'Cancelled';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <BrowserWindow />
      <Header />
      
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-medium text-black mb-2">Conversation Seminars</h1>
            <p className="text-gray-600">Host or join focused conversations on topics that matter to you</p>
          </div>
          <Button 
            onClick={() => setShowCreateForm(true)}
            className="bg-black text-white hover:bg-gray-800"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Host Seminar
          </Button>
        </div>

        <CategoryFilter 
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {showCreateForm && (
          <Card className="mb-8 border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl text-black">Create New Seminar</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateSeminar} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="What topic do you want to discuss?"
                    className="border-gray-300 focus:border-black focus:ring-black"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Describe what you're looking for in this conversation..."
                    className="border-gray-300 focus:border-black focus:ring-black"
                    rows={3}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                      required
                    >
                      <option value="Philosophy">Philosophy</option>
                      <option value="Creative Writing">Creative Writing</option>
                      <option value="Programming">Programming</option>
                      <option value="Science">Science</option>
                      <option value="Education">Education</option>
                      <option value="Business">Business</option>
                      <option value="Personal">Personal</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
                    <Input
                      type="number"
                      value={formData.duration}
                      onChange={(e) => setFormData({...formData, duration: e.target.value})}
                      placeholder="120"
                      min="15"
                      max="480"
                      className="border-gray-300 focus:border-black focus:ring-black"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Max Participants</label>
                    <Input
                      type="number"
                      value={formData.maxParticipants}
                      onChange={(e) => setFormData({...formData, maxParticipants: e.target.value})}
                      placeholder="5"
                      min="1"
                      max="20"
                      className="border-gray-300 focus:border-black focus:ring-black"
                      required
                    />
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button 
                    type="submit" 
                    className="bg-black text-white hover:bg-gray-800"
                    disabled={createSeminarMutation.isPending}
                  >
                    {createSeminarMutation.isPending ? 'Creating...' : 'Create Seminar'}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowCreateForm(false)}
                    className="border-gray-300 hover:bg-gray-50"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-6">
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading seminars...</p>
            </div>
          ) : seminars.length > 0 ? (
            seminars.map((seminar) => (
              <Card key={seminar.id} className="border-gray-200 hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-medium text-black">{seminar.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(seminar.status)}`}>
                          {getStatusText(seminar.status)}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-3">{seminar.description}</p>
                      
                      <div className="flex items-center space-x-6 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{seminar.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{seminar.participants}/{seminar.maxParticipants} participants</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageSquare className="w-4 h-4" />
                          <span>by {seminar.author}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end space-y-2">
                      <span className="text-xs text-gray-500">{seminar.createdAt}</span>
                      {seminar.status === 'upcoming' && (
                        <Button 
                          className="bg-black text-white hover:bg-gray-800"
                          disabled={seminar.participants >= seminar.maxParticipants}
                        >
                          {seminar.participants >= seminar.maxParticipants ? 'Full' : 'Join Seminar'}
                        </Button>
                      )}
                      {seminar.status === 'live' && (
                        <Button variant="outline" className="border-gray-300 hover:bg-gray-50">
                          Join Live
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-200 text-gray-800">
                      {seminar.category}
                    </span>
                    <div className="w-full max-w-xs mx-4">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Participants</span>
                        <span>{seminar.participants}/{seminar.maxParticipants}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gray-400 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(seminar.participants / seminar.maxParticipants) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-12">
              <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-700 mb-2">No seminars found</h3>
              <p className="text-gray-500 mb-4">Be the first to host a seminar for this category!</p>
              <Button 
                onClick={() => setShowCreateForm(true)}
                className="bg-black text-white hover:bg-gray-800"
              >
                Host First Seminar
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Seminars;
