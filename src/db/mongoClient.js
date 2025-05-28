const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.77gimyx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Connection caching
let cachedClient = null;
let cachedDb = null;

// Connection options
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  maxPoolSize: 10, // Adjust based on your expected load
  connectTimeoutMS: 5000, // Connection timeout
  socketTimeoutMS: 30000, // Socket timeout
};

async function connectToDatabase() {
  // If we already have a connected client, return it
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  // Create a new client if none exists
  if (!cachedClient) {
    cachedClient = new MongoClient(uri, options);
  }

  try {
    // Connect to the client
    await cachedClient.connect();
    const db = cachedClient.db('taskfolio');
    
    // Cache the database connection
    cachedDb = db;
    
    // Clean up function for serverless environments
    // This ensures proper cleanup when the function terminates
    const cleanup = async () => {
      try {
        if (cachedClient) {
          await cachedClient.close();
          cachedClient = null;
          cachedDb = null;
        }
      } catch (err) {
        console.error('Error closing MongoDB connection:', err);
      }
    };

    // Only in production environment - Serverless cleanup
    if (process.env.NODE_ENV === 'production') {
      process.on('SIGTERM', cleanup);
      process.on('SIGINT', cleanup);
    }
    
    return { client: cachedClient, db: cachedDb };
  } catch (error) {
    console.error('MongoDB connection error:', error);
    // Reset the client so we can retry next time
    cachedClient = null;
    cachedDb = null;
    throw error;
  }
}

// For backwards compatibility with existing code
const client = {
  db: (dbName) => {
    if (!cachedDb) {
      // Connect immediately for the first request
      connectToDatabase().catch(console.error);
    }
    return {
      collection: (collectionName) => {
        // Return a proxy object that will connect when methods are called
        return new Proxy({}, {
          get: (target, prop) => {
            return async (...args) => {
              const { db } = await connectToDatabase();
              const collection = db.collection(collectionName);
              return collection[prop](...args);
            };
          }
        });
      }
    };
  }
};

module.exports = client;
