const { connectToDB } = require('../labDatabase.js');
const { ObjectId } = require('mongodb');


async function createSeat(seat) {
  const db = await connectToDB();
  const result = await db.collection('seat').insertOne(seat);
  return result.insertedId;
}

async function getSeat(seatId) {
  const db = await connectToDB();
  return db.collection('seat').findOne({ _id: seatId });
}

async function updateSeat(seatId, updatedSeat) {
  const db = await connectToDB();
  const result = await db.collection('seat').updateOne(
    { _id: seatId },
    { $set: updatedSeat }
  );
  return result.modifiedCount > 0;
}

async function deleteSeat(seatId) {
  const db = await connectToDB();
  const result = await db.collection('seat').deleteOne({ _id: seatId });
  return result.deletedCount > 0;
}

async function getAvailableSeatCount(labName) {
    const db = await connectToDB();
    const totalSeats = await db.collection('seat').countDocuments({ lab_name: labName });
    const reservedSeats = await db.collection('seat').countDocuments({ lab_name: labName, seat_status: 'Reserved' });

    return totalSeats - reservedSeats;
}

async function getSeatsByLabName(labName) {
    const db = await connectToDB();
    return db.collection('seat').find({ lab_name: labName }).toArray();
}

async function updateSeatStatus(labName, seatNumber, status) {
    const db = await connectToDB();
    const result = await db.collection('seat').updateOne(
        { lab_name: labName, seat_number: seatNumber },
        { $set: { seat_status: status } }
    );
    return result.modifiedCount > 0;
}

module.exports = { createSeat, getSeat, updateSeat, deleteSeat, getAvailableSeatCount, getSeatsByLabName, updateSeatStatus };

