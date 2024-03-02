const { MongoClient } = require('mongodb');
const uri = 'mongodb+srv://masterUser122:Y6SDtkXn09rMDZTO@cluster0.req0igx.mongodb.net/lab_reserve?retryWrites=true&w=majority';

const client = new MongoClient(uri);

async function connectToDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas :)');
    return client.db();
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
    throw error;
  }
}

module.exports = { connectToDB };
