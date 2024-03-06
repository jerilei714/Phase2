const { connectToDB } = require('./labDatabase.js');

async function createLab(lab) {
  const db = await connectToDB();
  const result = await db.collection('laboratory').insertOne(lab);
  return result.insertedId;
}

async function getLab(labId) {
  const db = await connectToDB();
  return db.collection('laboratory').findOne({ _id: labId });
}

async function updateLab(labId, updatedLab) {
  const db = await connectToDB();
  const result = await db.collection('laboratory').updateOne(
    { _id: labId },
    { $set: updatedLab }
  );
  return result.modifiedCount > 0;
}

async function deleteLab(labId) {
  const db = await connectToDB();
  const result = await db.collection('laboratory').deleteOne({ _id: labId });
  return result.deletedCount > 0;
}

module.exports = { createLab, getLab, updateLab, deleteLab };
