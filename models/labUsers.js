const { connectToDB } = require('../labDatabase.js');

async function createUser(user) {
  const db = await connectToDB();
  const result = await db.collection('users').insertOne(user);
  return result.insertedId;
}

async function getUser(username) {
  const db = await connectToDB();
  return db.collection('users').findOne({ username: username });
}

async function updateUser(userId, updatedUser) {
  const db = await connectToDB();
  const result = await db.collection('users').updateOne(
    { _id: userId },
    { $set: updatedUser }
  );
  return result.modifiedCount > 0;
}

async function deleteUser(userId) {
  const db = await connectToDB();
  const result = await db.collection('users').deleteOne({ _id: userId });
  return result.deletedCount > 0;
}

module.exports = { createUser, getUser, updateUser, deleteUser };
