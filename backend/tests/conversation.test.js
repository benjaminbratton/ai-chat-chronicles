import request from 'supertest';
import app from '../src/server.js';
import { supabase } from '../src/config/database.js';

describe('Conversation API', () => {
  let authToken;
  let testUserId;
  let testConversationId;

  beforeAll(async () => {
    // Create test user and get auth token
    const testUser = {
      email: 'test@example.com',
      password: 'testpassword123',
      full_name: 'Test User',
      username: 'testuser'
    };

    // Register test user
    const registerResponse = await request(app)
      .post('/api/v1/auth/register')
      .send(testUser);

    authToken = registerResponse.body.token;
    testUserId = registerResponse.body.data.user.id;
  });

  afterAll(async () => {
    // Clean up test data
    if (testUserId) {
      await supabase.auth.admin.deleteUser(testUserId);
    }
  });

  describe('GET /api/v1/conversations', () => {
    it('should return conversations with pagination', async () => {
      const response = await request(app)
        .get('/api/v1/conversations')
        .query({ page: 1, limit: 10 });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeDefined();
      expect(response.body.pagination).toBeDefined();
      expect(response.body.pagination.page).toBe(1);
      expect(response.body.pagination.limit).toBe(10);
    });

    it('should filter conversations by category', async () => {
      const response = await request(app)
        .get('/api/v1/conversations')
        .query({ category: 'Philosophy' });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeDefined();
    });

    it('should search conversations', async () => {
      const response = await request(app)
        .get('/api/v1/conversations/search')
        .query({ q: 'test' });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeDefined();
    });
  });

  describe('POST /api/v1/conversations', () => {
    it('should create a new conversation', async () => {
      const conversationData = {
        title: 'Test Conversation',
        content: 'This is a test conversation content.',
        category: 'Philosophy',
        read_time: 5,
        published: true
      };

      const response = await request(app)
        .post('/api/v1/conversations')
        .set('Authorization', `Bearer ${authToken}`)
        .send(conversationData);

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data.title).toBe(conversationData.title);
      expect(response.body.data.author_id).toBe(testUserId);

      testConversationId = response.body.data.id;
    });

    it('should require authentication', async () => {
      const conversationData = {
        title: 'Test Conversation',
        content: 'This is a test conversation content.',
        category: 'Philosophy'
      };

      const response = await request(app)
        .post('/api/v1/conversations')
        .send(conversationData);

      expect(response.status).toBe(401);
    });

    it('should validate required fields', async () => {
      const invalidData = {
        title: '', // Empty title
        content: 'Test content'
      };

      const response = await request(app)
        .post('/api/v1/conversations')
        .set('Authorization', `Bearer ${authToken}`)
        .send(invalidData);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/v1/conversations/:id', () => {
    it('should return a specific conversation', async () => {
      const response = await request(app)
        .get(`/api/v1/conversations/${testConversationId}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.id).toBe(testConversationId);
    });

    it('should return 404 for non-existent conversation', async () => {
      const fakeId = '00000000-0000-0000-0000-000000000000';
      const response = await request(app)
        .get(`/api/v1/conversations/${fakeId}`);

      expect(response.status).toBe(404);
    });
  });

  describe('PUT /api/v1/conversations/:id', () => {
    it('should update a conversation', async () => {
      const updateData = {
        title: 'Updated Test Conversation',
        content: 'This is updated content.'
      };

      const response = await request(app)
        .put(`/api/v1/conversations/${testConversationId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.title).toBe(updateData.title);
    });

    it('should not allow updating other users conversations', async () => {
      // Create another user
      const otherUser = {
        email: 'other@example.com',
        password: 'otherpassword123',
        full_name: 'Other User',
        username: 'otheruser'
      };

      const registerResponse = await request(app)
        .post('/api/v1/auth/register')
        .send(otherUser);

      const otherAuthToken = registerResponse.body.token;

      const updateData = {
        title: 'Unauthorized Update'
      };

      const response = await request(app)
        .put(`/api/v1/conversations/${testConversationId}`)
        .set('Authorization', `Bearer ${otherAuthToken}`)
        .send(updateData);

      expect(response.status).toBe(403);

      // Clean up other user
      await supabase.auth.admin.deleteUser(registerResponse.body.data.user.id);
    });
  });

  describe('DELETE /api/v1/conversations/:id', () => {
    it('should delete a conversation', async () => {
      const response = await request(app)
        .delete(`/api/v1/conversations/${testConversationId}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
    });

    it('should not allow deleting other users conversations', async () => {
      // Create another user
      const otherUser = {
        email: 'other2@example.com',
        password: 'otherpassword123',
        full_name: 'Other User 2',
        username: 'otheruser2'
      };

      const registerResponse = await request(app)
        .post('/api/v1/auth/register')
        .send(otherUser);

      const otherAuthToken = registerResponse.body.token;

      // Create a conversation with the other user
      const conversationData = {
        title: 'Other User Conversation',
        content: 'This is another user conversation.',
        category: 'Technology',
        published: true
      };

      const createResponse = await request(app)
        .post('/api/v1/conversations')
        .set('Authorization', `Bearer ${otherAuthToken}`)
        .send(conversationData);

      const otherConversationId = createResponse.body.data.id;

      // Try to delete with original user
      const deleteResponse = await request(app)
        .delete(`/api/v1/conversations/${otherConversationId}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(deleteResponse.status).toBe(403);

      // Clean up
      await supabase.auth.admin.deleteUser(registerResponse.body.data.user.id);
    });
  });

  describe('GET /api/v1/conversations/featured', () => {
    it('should return featured conversations', async () => {
      const response = await request(app)
        .get('/api/v1/conversations/featured')
        .query({ limit: 5 });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeDefined();
    });
  });

  describe('GET /api/v1/conversations/categories', () => {
    it('should return available categories', async () => {
      const response = await request(app)
        .get('/api/v1/conversations/categories');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeDefined();
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });

  describe('GET /api/v1/conversations/stats', () => {
    it('should return conversation statistics', async () => {
      const response = await request(app)
        .get('/api/v1/conversations/stats');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeDefined();
      expect(response.body.data.totalConversations).toBeDefined();
      expect(response.body.data.publishedConversations).toBeDefined();
    });
  });

  describe('Rate Limiting', () => {
    it('should enforce rate limits', async () => {
      const requests = Array(105).fill().map(() => 
        request(app).get('/api/v1/conversations')
      );

      const responses = await Promise.all(requests);
      const rateLimitedResponses = responses.filter(r => r.status === 429);

      expect(rateLimitedResponses.length).toBeGreaterThan(0);
    });
  });
});
