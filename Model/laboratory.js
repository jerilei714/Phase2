const { connectToDB } = require('./labDatabase.js');
const { ObjectId } = require('mongodb');

async function createLab(lab) {
  const db = await connectToDB();
  const result = await db.collection('laboratory').insertOne(lab);
  return result.insertedId;
}

async function getLab(labId) {
  const db = await connectToDB();
  return db.collection('laboratory').findOne({ _id: new ObjectId(labId) });
}

async function updateLab(labId, updatedLab) {
  const db = await connectToDB();
  const result = await db.collection('laboratory').updateOne(
    { _id: new ObjectId(labId) },
    { $set: updatedLab }
  );
  return result.modifiedCount > 0;
}

async function deleteLab(labId) {
  const db = await connectToDB();
  const result = await db.collection('laboratory').deleteOne({ _id: new ObjectId(labId) });
  return result.deletedCount > 0;
}

module.exports = { createLab, getLab, updateLab, deleteLab };
