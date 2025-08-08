# AI Chat Chronicles Backend

A production-ready Node.js backend API for the AI Chat Chronicles application, built with Express.js, Supabase, and Redis.

## 🚀 Features

- **RESTful API** with comprehensive CRUD operations
- **Authentication & Authorization** with JWT tokens
- **Rate Limiting** with Redis-based storage
- **Request Validation** using Joi schemas
- **Caching** with Redis for improved performance
- **Logging** with Winston for production monitoring
- **API Documentation** with Swagger/OpenAPI
- **Security** with Helmet, CORS, and input sanitization
- **Error Handling** with centralized error management
- **Health Checks** for monitoring
- **Graceful Shutdown** handling

## 📋 Prerequisites

- Node.js 18+ 
- Redis server
- Supabase account and project
- npm or yarn package manager

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-chat-chronicles/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` with your configuration:
   ```env
   NODE_ENV=development
   PORT=3001
   SUPABASE_URL=your_supabase_url
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   JWT_SECRET=your_jwt_secret
   REDIS_URL=redis://localhost:6379
   ```

4. **Start Redis server**
   ```bash
   # On macOS with Homebrew
   brew install redis
   brew services start redis
   
   # On Ubuntu/Debian
   sudo apt-get install redis-server
   sudo systemctl start redis
   
   # On Windows
   # Download and install Redis from https://redis.io/download
   ```

## 🚀 Development

### Start development server
```bash
npm run dev
```

The server will start on `http://localhost:3001`

### Available scripts
- `npm run dev` - Start development server with nodemon
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues

## 📚 API Documentation

Once the server is running, visit:
- **Swagger UI**: `http://localhost:3001/api-docs`
- **Health Check**: `http://localhost:3001/health`

## 🏗️ Architecture

```
backend/
├── src/
│   ├── config/          # Configuration files
│   │   ├── database.js  # Supabase configuration
│   │   └── redis.js     # Redis configuration
│   ├── controllers/     # Request handlers
│   │   └── conversationController.js
│   ├── middleware/      # Express middleware
│   │   ├── auth.js      # Authentication
│   │   ├── validation.js # Request validation
│   │   └── rateLimit.js # Rate limiting
│   ├── routes/          # API routes
│   │   └── conversations.js
│   ├── services/        # Business logic
│   │   └── conversationService.js
│   ├── utils/           # Utility functions
│   │   └── logger.js    # Winston logger
│   └── server.js        # Main server file
├── logs/                # Log files
├── package.json
└── README.md
```

## 🔐 Authentication

The API uses JWT tokens for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## 📊 Rate Limiting

The API implements rate limiting to prevent abuse:

- **General API**: 100 requests per 15 minutes per IP
- **Authentication**: 5 requests per 15 minutes per IP
- **Search**: 30 requests per minute per IP
- **File Uploads**: 10 requests per hour per IP

## 🗄️ Database

The backend uses Supabase (PostgreSQL) as the primary database with the following main tables:

- `profiles` - User profiles
- `conversations` - Main content
- `comments` - User comments
- `likes` - User likes/reactions
- `follows` - User relationships
- `seminars` - Event management

## 🔄 Caching

Redis is used for:
- API response caching
- Rate limiting storage
- Session management
- Real-time features

## 📝 Logging

The application uses Winston for logging with:
- Console output for development
- File rotation for production
- Error tracking
- Request/response logging

## 🚀 Production Deployment

### Environment Variables
Set the following environment variables in production:

```env
NODE_ENV=production
PORT=3001
SUPABASE_URL=your_production_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_production_service_role_key
JWT_SECRET=your_secure_jwt_secret
REDIS_URL=your_production_redis_url
ALLOWED_ORIGINS=https://yourdomain.com
LOG_LEVEL=warn
```

### Build and Deploy
```bash
npm run build
npm start
```

### Docker Deployment
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3001
CMD ["npm", "start"]
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- --grep "conversation"
```

## 📈 Monitoring

### Health Check
Monitor the application health:
```bash
curl http://localhost:3001/health
```

### Metrics
The API provides basic metrics:
- Request count
- Response times
- Error rates
- Cache hit rates

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` |
| `PORT` | Server port | `3001` |
| `SUPABASE_URL` | Supabase project URL | Required |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | Required |
| `JWT_SECRET` | JWT signing secret | Required |
| `REDIS_URL` | Redis connection URL | `redis://localhost:6379` |
| `ALLOWED_ORIGINS` | CORS allowed origins | `http://localhost:3000` |
| `LOG_LEVEL` | Logging level | `info` |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Run linting and tests
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact: support@aichatchronicles.com
- Documentation: `/api-docs` when server is running
