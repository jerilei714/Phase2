const { connectToDB } = require('../labDatabase.js');

async function createReservation(reservation) {
  const db = await connectToDB();
  const result = await db.collection('reservations').insertOne(reservation);
  return result.insertedId;
}

async function getReservation(reservationId) {
  const db = await connectToDB();
  return db.collection('reservations').findOne({ _id: reservationId });
}

async function updateReservation(reservationId, updatedReservation) {
  const db = await connectToDB();
  const result = await db.collection('reservations').updateOne(
    { _id: reservationId },
    { $set: updatedReservation }
  );
  return result.modifiedCount > 0;
}

async function deleteReservation(reservationId) {
  const db = await connectToDB();
  const result = await db.collection('reservations').deleteOne({ _id: reservationId });
  return result.deletedCount > 0;
}

module.exports = { createReservation, getReservation, updateReservation, deleteReservation };
