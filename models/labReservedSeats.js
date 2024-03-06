const { connectToDB } = require('../labDatabase');
const { ObjectId } = require('mongodb');

async function createReservedSeat(seat) {
  const db = await connectToDB();
  const result = await db.collection('reserved_seats').insertOne(seat);
  return result.insertedId;
}

async function getReservedSeat(seatId) {
  const db = await connectToDB();
  return db.collection('reserved_seats').findOne({ _id: seatId });
}

async function updateReservedSeat(seatId, updatedSeat) {
  const db = await connectToDB();
  const result = await db.collection('reserved_seats').updateOne(
    { _id: seatId },
    { $set: updatedSeat }
  );
  return result.modifiedCount > 0;
}

async function deleteReservedSeat(seatId) {
  const db = await connectToDB();
  const result = await db.collection('reserved_seats').deleteOne({ _id: seatId });
  return result.deletedCount > 0;
}

async function getReservedSeatsByLab(labId) {
    const db = await connectToDB();
    return db.collection('reserved_seats').find({ lab_id: labId }).toArray();
}

async function updateReservedSeatByReservationId(reservationId, updatedSeat) {
  const db = await connectToDB();
  const result = await db.collection('reserved_seats').updateOne(
    { "reservation_id": new ObjectId(reservationId) },
    { $set: updatedSeat }
  );
  return result.modifiedCount > 0;
}

module.exports = { createReservedSeat, getReservedSeat, updateReservedSeat, deleteReservedSeat, getReservedSeatsByLab, updateReservedSeatByReservationId };


