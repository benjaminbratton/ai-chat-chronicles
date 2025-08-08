#!/bin/bash

# Production deployment script for AI Chat Chronicles Backend

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
APP_NAME="ai-chat-chronicles-backend"
DOCKER_IMAGE="aichatchronicles/backend"
VERSION=$(node -p "require('./package.json').version")

echo -e "${GREEN}🚀 Starting deployment for ${APP_NAME} v${VERSION}${NC}"

# Check if required environment variables are set
if [ -z "$SUPABASE_URL" ] || [ -z "$SUPABASE_SERVICE_ROLE_KEY" ] || [ -z "$JWT_SECRET" ]; then
    echo -e "${RED}❌ Error: Required environment variables are not set${NC}"
    echo "Please set the following environment variables:"
    echo "- SUPABASE_URL"
    echo "- SUPABASE_SERVICE_ROLE_KEY"
    echo "- JWT_SECRET"
    exit 1
fi

# Build the application
echo -e "${YELLOW}📦 Building application...${NC}"
npm run build

# Build Docker image
echo -e "${YELLOW}🐳 Building Docker image...${NC}"
docker build -t ${DOCKER_IMAGE}:${VERSION} .
docker tag ${DOCKER_IMAGE}:${VERSION} ${DOCKER_IMAGE}:latest

# Run tests
echo -e "${YELLOW}🧪 Running tests...${NC}"
npm test

# Check if tests passed
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Tests passed${NC}"
else
    echo -e "${RED}❌ Tests failed. Aborting deployment.${NC}"
    exit 1
fi

# Push to Docker registry (if configured)
if [ ! -z "$DOCKER_REGISTRY" ]; then
    echo -e "${YELLOW}📤 Pushing to Docker registry...${NC}"
    docker push ${DOCKER_IMAGE}:${VERSION}
    docker push ${DOCKER_IMAGE}:latest
fi

# Deploy to production (example with Docker Compose)
if [ "$DEPLOY_METHOD" = "docker-compose" ]; then
    echo -e "${YELLOW}🚀 Deploying with Docker Compose...${NC}"
    
    # Stop existing containers
    docker-compose -f docker-compose.prod.yml down
    
    # Start new containers
    docker-compose -f docker-compose.prod.yml up -d
    
    # Wait for health check
    echo -e "${YELLOW}⏳ Waiting for application to be ready...${NC}"
    sleep 30
    
    # Check health
    if curl -f http://localhost:3001/health > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Application is healthy${NC}"
    else
        echo -e "${RED}❌ Application health check failed${NC}"
        exit 1
    fi
fi

# Deploy to Kubernetes (if configured)
if [ "$DEPLOY_METHOD" = "kubernetes" ]; then
    echo -e "${YELLOW}☸️  Deploying to Kubernetes...${NC}"
    
    # Update deployment
    kubectl set image deployment/${APP_NAME} ${APP_NAME}=${DOCKER_IMAGE}:${VERSION}
    
    # Wait for rollout
    kubectl rollout status deployment/${APP_NAME}
    
    # Check health
    if kubectl get pods -l app=${APP_NAME} | grep -q Running; then
        echo -e "${GREEN}✅ Kubernetes deployment successful${NC}"
    else
        echo -e "${RED}❌ Kubernetes deployment failed${NC}"
        exit 1
    fi
fi

# Deploy to cloud platform (example with Heroku)
if [ "$DEPLOY_METHOD" = "heroku" ]; then
    echo -e "${YELLOW}☁️  Deploying to Heroku...${NC}"
    
    # Set environment variables
    heroku config:set NODE_ENV=production
    heroku config:set SUPABASE_URL=$SUPABASE_URL
    heroku config:set SUPABASE_SERVICE_ROLE_KEY=$SUPABASE_SERVICE_ROLE_KEY
    heroku config:set JWT_SECRET=$JWT_SECRET
    
    # Deploy
    git push heroku main
    
    # Check health
    if curl -f https://${APP_NAME}.herokuapp.com/health > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Heroku deployment successful${NC}"
    else
        echo -e "${RED}❌ Heroku deployment failed${NC}"
        exit 1
    fi
fi

# Send notification (if configured)
if [ ! -z "$SLACK_WEBHOOK_URL" ]; then
    echo -e "${YELLOW}📢 Sending notification...${NC}"
    curl -X POST -H 'Content-type: application/json' \
        --data "{\"text\":\"✅ ${APP_NAME} v${VERSION} deployed successfully!\"}" \
        $SLACK_WEBHOOK_URL
fi

echo -e "${GREEN}🎉 Deployment completed successfully!${NC}"
echo -e "${GREEN}📊 Application is running at: http://localhost:3001${NC}"
echo -e "${GREEN}📚 API Documentation: http://localhost:3001/api-docs${NC}"
echo -e "${GREEN}🏥 Health Check: http://localhost:3001/health${NC}"
