const { connectToDB } = require('./labDatabase.js');
const { ObjectId } = require('mongodb');

async function createReservation(reservation) {
  const db = await connectToDB();
  const result = await db.collection('reservations').insertOne({
    ...reservation,
    tnd_requested: new Date().toISOString()
  });
  return result.insertedId;
}

async function getReservation(reservationId) {
  const db = await connectToDB();
  return db.collection('reservations').findOne({ _id: new ObjectId(reservationId) });
}

async function updateReservation(reservationId, updatedDetails) {
  const db = await connectToDB();
  const result = await db.collection('reservations').updateOne(
      { _id: new ObjectId(reservationId) },
      { $set: updatedDetails }
  );
  return result.modifiedCount > 0;
}

async function deleteReservation(reservationId) {
  const db = await connectToDB();
  const result = await db.collection('reservations').deleteOne({ _id: new ObjectId(reservationId) });
  return result.deletedCount > 0;
}

async function getReservedSeatsByUsername(username) {
  const db = await connectToDB();
  const userReservations = await db.collection('reserved_seats').find({ username: username }).toArray();
  return userReservations;
}

module.exports = { createReservation, getReservation, updateReservation, deleteReservation , getReservedSeatsByUsername };
