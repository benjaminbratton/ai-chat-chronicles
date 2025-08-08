import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Simple in-memory admin storage
const ADMIN_CREDENTIALS = {
  email: 'admin@aichatchronicles.com',
  password: 'admin123',
  role: 'admin',
  id: 'admin-001',
  name: 'System Administrator'
};

// JWT Secret (in production, use environment variable)
const JWT_SECRET = 'your-secret-key-change-in-production';

// Generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { 
      id: user.id, 
      email: user.email, 
      role: user.role 
    },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
};

// Verify JWT token middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: 'Access token required' 
    });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ 
        success: false, 
        message: 'Invalid or expired token' 
      });
    }
    req.user = user;
    next();
  });
};

// Admin authentication middleware
const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ 
      success: false, 
      message: 'Admin access required' 
    });
  }
  next();
};

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: 'demo',
    version: '1.0.0'
  });
});

// Admin login endpoint
app.post('/api/v1/auth/admin/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email and password are required'
    });
  }

  if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
    const token = generateToken(ADMIN_CREDENTIALS);
    
    res.json({
      success: true,
      message: 'Admin login successful',
      data: {
        user: {
          id: ADMIN_CREDENTIALS.id,
          email: ADMIN_CREDENTIALS.email,
          name: ADMIN_CREDENTIALS.name,
          role: ADMIN_CREDENTIALS.role
        },
        token
      }
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Invalid admin credentials'
    });
  }
});

// Get current admin user
app.get('/api/v1/auth/admin/me', authenticateToken, requireAdmin, (req, res) => {
  res.json({
    success: true,
    data: {
      user: {
        id: req.user.id,
        email: req.user.email,
        role: req.user.role,
        name: ADMIN_CREDENTIALS.name
      }
    }
  });
});

// Mock conversations data
const mockConversations = [
  {
    id: "conv-1",
    title: "The Future of AI Consciousness",
    content: "A deep dive into the philosophical implications of artificial intelligence and consciousness...",
    excerpt: "Exploring the boundaries between human and artificial consciousness.",
    author: {
      id: "user-1",
      name: "Dr. Sarah Chen",
      username: "sarahchen",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    },
    category: "Philosophy",
    readTime: 8,
    published: true,
    featured: true,
    likes: 42,
    comments: 15,
    createdAt: "2024-01-15T10:30:00Z"
  },
  {
    id: "conv-2",
    title: "Quantum Computing and Cryptography",
    content: "How quantum computers will revolutionize cryptography and what it means for digital security...",
    excerpt: "The race between quantum computing and post-quantum cryptography.",
    author: {
      id: "user-2",
      name: "Prof. Michael Rodriguez",
      username: "mrodriguez",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    category: "Technology",
    readTime: 12,
    published: true,
    featured: true,
    likes: 38,
    comments: 22,
    createdAt: "2024-01-14T14:20:00Z"
  },
  {
    id: "conv-3",
    title: "AI in Healthcare: Revolutionizing Diagnosis",
    content: "Exploring how artificial intelligence is transforming medical diagnosis and patient care...",
    excerpt: "The intersection of AI and healthcare promises to save countless lives.",
    author: {
      id: "user-3",
      name: "Dr. Emily Watson",
      username: "ewatson",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face"
    },
    category: "Healthcare",
    readTime: 10,
    published: true,
    featured: false,
    likes: 29,
    comments: 18,
    createdAt: "2024-01-13T09:15:00Z"
  }
];

// Get all conversations
app.get('/api/v1/conversations', (req, res) => {
  res.json({
    success: true,
    data: mockConversations
  });
});

// Get featured conversations
app.get('/api/v1/conversations/featured', (req, res) => {
  const featured = mockConversations.filter(conv => conv.featured);
  res.json({
    success: true,
    data: featured
  });
});

// Get conversation by ID
app.get('/api/v1/conversations/:id', (req, res) => {
  const conversation = mockConversations.find(conv => conv.id === req.params.id);
  
  if (!conversation) {
    return res.status(404).json({
      success: false,
      message: 'Conversation not found'
    });
  }
  
  res.json({
    success: true,
    data: conversation
  });
});

// Admin: Create new conversation
app.post('/api/v1/conversations', authenticateToken, requireAdmin, (req, res) => {
  const { title, content, excerpt, category, author } = req.body;
  
  if (!title || !content || !excerpt || !category) {
    return res.status(400).json({
      success: false,
      message: 'Title, content, excerpt, and category are required'
    });
  }
  
  const newConversation = {
    id: `conv-${Date.now()}`,
    title,
    content,
    excerpt,
    author: author || {
      id: "admin-001",
      name: "System Administrator",
      username: "admin",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    category,
    readTime: Math.ceil(content.length / 200), // Rough estimate
    published: true,
    featured: false,
    likes: 0,
    comments: 0,
    createdAt: new Date().toISOString()
  };
  
  mockConversations.push(newConversation);
  
  res.status(201).json({
    success: true,
    message: 'Conversation created successfully',
    data: newConversation
  });
});

// Admin: Update conversation
app.put('/api/v1/conversations/:id', authenticateToken, requireAdmin, (req, res) => {
  const conversationIndex = mockConversations.findIndex(conv => conv.id === req.params.id);
  
  if (conversationIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Conversation not found'
    });
  }
  
  const updatedConversation = {
    ...mockConversations[conversationIndex],
    ...req.body,
    id: req.params.id // Ensure ID doesn't change
  };
  
  mockConversations[conversationIndex] = updatedConversation;
  
  res.json({
    success: true,
    message: 'Conversation updated successfully',
    data: updatedConversation
  });
});

// Admin: Delete conversation
app.delete('/api/v1/conversations/:id', authenticateToken, requireAdmin, (req, res) => {
  const conversationIndex = mockConversations.findIndex(conv => conv.id === req.params.id);
  
  if (conversationIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Conversation not found'
    });
  }
  
  mockConversations.splice(conversationIndex, 1);
  
  res.json({
    success: true,
    message: 'Conversation deleted successfully'
  });
});

// Admin: Toggle featured status
app.patch('/api/v1/conversations/:id/featured', authenticateToken, requireAdmin, (req, res) => {
  const { featured } = req.body;
  const conversation = mockConversations.find(conv => conv.id === req.params.id);
  
  if (!conversation) {
    return res.status(404).json({
      success: false,
      message: 'Conversation not found'
    });
  }
  
  conversation.featured = featured;
  
  res.json({
    success: true,
    message: `Conversation ${featured ? 'featured' : 'unfeatured'} successfully`,
    data: conversation
  });
});

// Get conversation statistics
app.get('/api/v1/conversations/stats', (req, res) => {
  const stats = {
    totalConversations: mockConversations.length,
    publishedConversations: mockConversations.filter(conv => conv.published).length,
    featuredConversations: mockConversations.filter(conv => conv.featured).length,
    totalLikes: mockConversations.reduce((sum, conv) => sum + conv.likes, 0),
    totalComments: mockConversations.reduce((sum, conv) => sum + conv.comments, 0),
    lastUpdated: new Date().toISOString()
  };
  
  res.json({
    success: true,
    data: stats
  });
});

// Get categories
app.get('/api/v1/conversations/categories', (req, res) => {
  const categories = [...new Set(mockConversations.map(conv => conv.category))];
  
  res.json({
    success: true,
    data: categories
  });
});

// Search conversations
app.get('/api/v1/conversations/search', (req, res) => {
  const { q } = req.query;
  
  if (!q) {
    return res.status(400).json({
      success: false,
      message: 'Search query is required'
    });
  }
  
  const searchResults = mockConversations.filter(conv => 
    conv.title.toLowerCase().includes(q.toLowerCase()) ||
    conv.content.toLowerCase().includes(q.toLowerCase()) ||
    conv.excerpt.toLowerCase().includes(q.toLowerCase())
  );
  
  res.json({
    success: true,
    data: searchResults
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'AI Chat Chronicles Backend API',
    version: '1.0.0',
    environment: 'demo',
    endpoints: {
      health: '/health',
      admin: {
        login: 'POST /api/v1/auth/admin/login',
        profile: 'GET /api/v1/auth/admin/me'
      },
      conversations: {
        list: 'GET /api/v1/conversations',
        featured: 'GET /api/v1/conversations/featured',
        stats: 'GET /api/v1/conversations/stats',
        categories: 'GET /api/v1/conversations/categories',
        search: 'GET /api/v1/conversations/search?q=query',
        create: 'POST /api/v1/conversations (admin only)',
        update: 'PUT /api/v1/conversations/:id (admin only)',
        delete: 'DELETE /api/v1/conversations/:id (admin only)',
        toggleFeatured: 'PATCH /api/v1/conversations/:id/featured (admin only)'
      }
    }
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 AI Chat Chronicles Backend Demo Server running on port ${PORT}`);
  console.log(`🏥 Health check: http://localhost:${PORT}/health`);
  console.log(`📊 API docs: http://localhost:${PORT}/`);
  console.log(`🔐 Admin login: POST http://localhost:${PORT}/api/v1/auth/admin/login`);
  console.log(`📊 Statistics: http://localhost:${PORT}/api/v1/conversations/stats`);
  console.log(`\n🔑 ADMIN CREDENTIALS:`);
  console.log(`   Email: admin@aichatchronicles.com`);
  console.log(`   Password: admin123`);
  console.log(`\n💡 Test with: curl -X POST http://localhost:${PORT}/api/v1/auth/admin/login \\`);
  console.log(`   -H "Content-Type: application/json" \\`);
  console.log(`   -d '{"email":"admin@aichatchronicles.com","password":"admin123"}'`);
});
