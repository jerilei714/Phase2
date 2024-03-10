const { connectToDB } = require('./labDatabase.js');

async function createUser(user) {
  const db = await connectToDB();
  const result = await db.collection('users').insertOne(user);
  return result.insertedId;
}

async function getUser(username) {
  const db = await connectToDB();
  const result = await db.collection('users').findOne({ username: username });
  return result;
}

async function addRememberMeToken(username, token) {
  const db = await connectToDB();
  const expiryDate = new Date(Date.now() + 1 * 60 * 1000); 
  const result = await db.collection('users').updateOne(
      { username: username },
      { $push: { rememberTokens: { token: token, expires: expiryDate } } }
  );
  return result.modifiedCount > 0;
}

async function removeRememberMeToken(username, token) {
  const db = await connectToDB();
  const result = await db.collection('users').updateOne(
    { username: username },
    { $pull: { rememberTokens: { token: token } } }
  );

  return result.modifiedCount > 0;
}
async function removeExpiredRememberMeTokens(username) {
  const db = await connectToDB();
  const currentDate = new Date();
  const result = await db.collection('users').updateOne(
    { username: username },
    { $pull: { rememberTokens: { expires: { $lt: currentDate } } } } 
  );
  return result.modifiedCount > 0;
}


async function getUserByToken(token) {
  const db = await connectToDB();
  return db.collection('users').findOne({ "rememberTokens.token": token });
}


async function updateUser(username, updatedUser) {
  const db = await connectToDB();
  const result = await db.collection('users').updateOne(
    { username: username },
    { $set: updatedUser }
  );
  return result.modifiedCount > 0;
}

async function deleteUser(userId) {
  const db = await connectToDB();
  const result = await db.collection('users').deleteOne({ _id: userId });
  return result.deletedCount > 0;
}

async function getUsersByAccountType(accountType) {
  const db = await connectToDB();
  const Students = db.collection('users').find({ accountType: accountType }).toArray();
  return Students;
}

module.exports = { removeRememberMeToken, createUser, getUser, updateUser, deleteUser, getUsersByAccountType, addRememberMeToken, removeExpiredRememberMeTokens, getUserByToken };
