const { connectToDB } = require('../labDatabase.js');

async function createUserStudent(user_id, username, course) {
    const db = await connectToDB();
    const description = `${course} student`;
    const result = await db.collection('student').insertOne({
        user_id,
        username,
        course,
        description
    });
    return result.insertedId;
}

async function getStudent(studentId) {
    const db = await connectToDB();
    return db.collection('student').findOne({ _id: studentId });
}

async function updateStudent(studentId, updatedStudent) {
    const db = await connectToDB();
    const result = await db.collection('student').updateOne(
        { _id: studentId },
        { $set: updatedStudent }
    );
    return result.modifiedCount > 0;
}

async function deleteStudent(studentId) {
    const db = await connectToDB();
    const result = await db.collection('student').deleteOne({ _id: studentId });
    return result.deletedCount > 0;
}

module.exports = { createUserStudent, getStudent, updateStudent, deleteStudent };