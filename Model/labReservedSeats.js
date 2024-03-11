const { connectToDB } = require('./labDatabase');
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

async function getReservedSeatsByLab(labId, date) {
  const db = await connectToDB();
  console.log(labId + date)
  let query = { lab_id: labId };
  if (date) {
      query.reserve_date = date;
  }
  return db.collection('reserved_seats').find(query).toArray();
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


