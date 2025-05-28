
import { useState } from 'react';
import { Header } from '@/components/Header';
import { BrowserWindow } from '@/components/BrowserWindow';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CategoryFilter } from '@/components/CategoryFilter';
import { Clock, Users, MessageSquare, Calendar } from 'lucide-react';

interface Seminar {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  author: string;
  participants: number;
  maxParticipants: number;
  status: 'open' | 'in-progress' | 'completed';
  createdAt: string;
}

const mockSeminars: Seminar[] = [
  {
    id: '1',
    title: 'Discuss the ethics of AI consciousness',
    description: 'Looking for thoughtful perspectives on whether AI can truly be conscious and the ethical implications if they can.',
    category: 'Philosophy',
    duration: '2 hours',
    author: 'Sarah M.',
    participants: 2,
    maxParticipants: 5,
    status: 'open',
    createdAt: '2 hours ago'
  },
  {
    id: '2',
    title: 'Climate change solutions for urban areas',
    description: 'Need innovative ideas for reducing carbon footprint in dense urban environments.',
    category: 'Science',
    duration: '3 hours',
    author: 'Alex K.',
    participants: 1,
    maxParticipants: 4,
    status: 'open',
    createdAt: '5 hours ago'
  },
  {
    id: '3',
    title: 'The future of remote work culture',
    description: 'Exploring how remote work is changing workplace dynamics and company culture.',
    category: 'Business',
    duration: '1 hour',
    author: 'Mike R.',
    participants: 3,
    maxParticipants: 3,
    status: 'in-progress',
    createdAt: '1 day ago'
  }
];

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

  const filteredSeminars = selectedCategory === 'All' 
    ? mockSeminars 
    : mockSeminars.filter(seminar => seminar.category === selectedCategory);

  const handleCreateSeminar = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating seminar:', formData);
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
      case 'open': return 'text-green-600 bg-green-100';
      case 'in-progress': return 'text-yellow-600 bg-yellow-100';
      case 'completed': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                    <Input
                      value={formData.duration}
                      onChange={(e) => setFormData({...formData, duration: e.target.value})}
                      placeholder="2 hours"
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
                  <Button type="submit" className="bg-black text-white hover:bg-gray-800">
                    Create Seminar
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
          {filteredSeminars.map((seminar) => (
            <Card key={seminar.id} className="border-gray-200 hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-medium text-black">{seminar.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(seminar.status)}`}>
                        {seminar.status === 'in-progress' ? 'In Progress' : seminar.status.charAt(0).toUpperCase() + seminar.status.slice(1)}
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
                    {seminar.status === 'open' && (
                      <Button 
                        className="bg-black text-white hover:bg-gray-800"
                        disabled={seminar.participants >= seminar.maxParticipants}
                      >
                        {seminar.participants >= seminar.maxParticipants ? 'Full' : 'Join Seminar'}
                      </Button>
                    )}
                    {seminar.status === 'in-progress' && (
                      <Button variant="outline" className="border-gray-300 hover:bg-gray-50">
                        View Progress
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
          ))}
        </div>

        {filteredSeminars.length === 0 && (
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
  );
};

export default Seminars;
