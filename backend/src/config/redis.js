import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

class RedisClient {
  constructor() {
    this.client = null;
    this.isConnected = false;
    this.memoryStore = new Map(); // Fallback to in-memory storage
  }

  async connect() {
    try {
      // Try to connect to Redis
      this.client = createClient({
        url: redisUrl,
        socket: {
          reconnectStrategy: (retries) => {
            if (retries > 3) {
              console.log('Redis connection failed, using in-memory storage');
              return false;
            }
            return Math.min(retries * 100, 3000);
          }
        }
      });

      this.client.on('error', (err) => {
        console.log('Redis Client Error, using in-memory storage:', err.message);
        this.isConnected = false;
      });

      this.client.on('connect', () => {
        console.log('Redis Client Connected');
        this.isConnected = true;
      });

      this.client.on('ready', () => {
        console.log('Redis Client Ready');
      });

      this.client.on('end', () => {
        console.log('Redis Client Disconnected');
        this.isConnected = false;
      });

      await this.client.connect();
    } catch (error) {
      console.log('Failed to connect to Redis, using in-memory storage:', error.message);
      this.isConnected = false;
    }
  }

  async disconnect() {
    if (this.client && this.isConnected) {
      await this.client.quit();
      this.isConnected = false;
    }
  }

  async get(key) {
    if (this.client && this.isConnected) {
      try {
        const value = await this.client.get(key);
        return value ? JSON.parse(value) : null;
      } catch (error) {
        console.error('Redis GET error:', error);
        return this.memoryStore.get(key) || null;
      }
    }
    return this.memoryStore.get(key) || null;
  }

  async set(key, value, expireSeconds = 3600) {
    if (this.client && this.isConnected) {
      try {
        await this.client.setEx(key, expireSeconds, JSON.stringify(value));
        return true;
      } catch (error) {
        console.error('Redis SET error:', error);
        this.memoryStore.set(key, value);
        return true;
      }
    }
    this.memoryStore.set(key, value);
    return true;
  }

  async del(key) {
    if (this.client && this.isConnected) {
      try {
        await this.client.del(key);
        return true;
      } catch (error) {
        console.error('Redis DEL error:', error);
        this.memoryStore.delete(key);
        return true;
      }
    }
    this.memoryStore.delete(key);
    return true;
  }

  async exists(key) {
    if (this.client && this.isConnected) {
      try {
        const result = await this.client.exists(key);
        return result === 1;
      } catch (error) {
        console.error('Redis EXISTS error:', error);
        return this.memoryStore.has(key);
      }
    }
    return this.memoryStore.has(key);
  }

  async incr(key) {
    if (this.client && this.isConnected) {
      try {
        return await this.client.incr(key);
      } catch (error) {
        console.error('Redis INCR error:', error);
        const current = this.memoryStore.get(key) || 0;
        const newValue = current + 1;
        this.memoryStore.set(key, newValue);
        return newValue;
      }
    }
    const current = this.memoryStore.get(key) || 0;
    const newValue = current + 1;
    this.memoryStore.set(key, newValue);
    return newValue;
  }

  async expire(key, seconds) {
    if (this.client && this.isConnected) {
      try {
        await this.client.expire(key, seconds);
        return true;
      } catch (error) {
        console.error('Redis EXPIRE error:', error);
        return true;
      }
    }
    return true;
  }
}

const redisClient = new RedisClient();

export default redisClient;
