const axios = require('axios'); //DELETE AFTER PHASE 2
const { MongoClient } = require('mongodb'); //DELETE AFTER PHASE 2


const generateRandomReservations = (labs, users, numberOfReservations) => {
    const reservations = [];
    const dates = ["2024-03-12", "2024-03-13", "2024-03-14", "2024-03-15", "2024-03-16", "2024-03-17", "2024-03-18", "2024-03-19", "2024-03-20"];
    const times = ["7:00 AM - 7:30 AM", "7:30 AM - 8:00 AM", "8:00 AM - 8:30 AM", "8:30 AM - 9:00 AM"];
    
    for (let i = 0; i < numberOfReservations; i++) {
        const lab = labs[Math.floor(Math.random() * (labs.length - 1 - 0 + 1)) + 0];
        const user = users[Math.floor(Math.random() * (users.length - 1 - 0 + 1)) + 0];
        const date = dates[Math.floor(Math.random() * (dates.length - 1 - 0 + 1)) + 0];
        const time = times[Math.floor(Math.random() * (times.length - 1 - 0 + 1)) + 0];
        const seatNumber = Math.floor(Math.random() * (lab.total_seats - 1 - 1 + 1)) + 1;
        const anonymous = Math.random() < 0.5;

        reservations.push({
            lab_id: lab.lab_name, 
            lab_name: lab.lab_name,
            user_id: user.username, 
            username: user.username,
            reserve_date: date,
            reserve_time: time,
            seat_number: seatNumber.toString(),
            anonymous,
            tnd_requested: new Date().toISOString()
        });
    }
    return reservations;
};

const dropAllCollections = async () => {
    const uri = process.env.MONGODB_URI; 
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();
        const database = client.db(); 
        const collections = await database.listCollections().toArray();
        for (const collection of collections) {
            await database.collection(collection.name).drop();
        }
    } catch (error) {
    } finally {
        await client.close();
    }
};

const initializeApplication = async () => {
    await dropAllCollections(); 
    await initializeSampleData(); 
};

const initializeSampleData = async () => {

    const sampleUsers = [
        { username: 'johndoe', name: 'John Doe', password: 'password123', email: 'johndoe@example.com', course: 'Computer Science', accountType: 'Student', profilePic: 'image/Default_pfp.jpg', description: 'Student Account' },
        { username: 'janedoe', name: 'Jane Doe', password: 'securepassword456', email: 'janedoe@example.com', accountType: 'Lab Facilitator',course: 'Computer Science', profilePic: 'image/Default_pfp.jpg', description: 'Lab Facilitator Account' },
        { username: 'mikebrown', name: 'Mike Brown', password: 'mike1234', email: 'mikebrown@example.com', course: 'Software Engineering', accountType: 'Student', profilePic: 'image/mike_pfp.jpg', description: 'Aspiring software engineer.' },
        { username: 'emilyclark', name: 'Emily Clark', password: 'emilysecure789', email: 'emilyclark@example.com', course: 'Information Technology', accountType: 'Student', profilePic: 'image/Default_pfp.jpg', description: 'IT enthusiast and cybersecurity hopeful.' },
        { username: 'davidsmith', name: 'David Smith', password: 'davidsmithpassword', email: 'davidsmith@example.com', accountType: 'Lab Facilitator', course: 'Software Engineering', profilePic: 'image/david_pfp.jpg', description: 'Dedicated to supporting the next generation of tech innovators.' },
        { username: 'lucygreen', name: 'Lucy Green', password: 'lucygreen88', email: 'lucygreen@example.com', course: 'Data Science', accountType: 'Student', profilePic: 'image/Default_pfp.jpg', description: 'Data Science enthusiast with a keen interest in machine learning.' },
        { username: 'alexreed', name: 'Alex Reed', password: 'alexpassword999', email: 'alexreed@example.com', accountType: 'Lab Facilitator', course: 'Information Technology', profilePic: 'image/Default_pfp.jpg', description: 'Passionate about teaching and technology. Specializes in cloud computing.' },
        { username: 'sarahmiller', name: 'Sarah Miller', password: 'sarahmillersafe', email: 'sarahmiller@example.com', course: 'Computer Engineering', accountType: 'Student', profilePic: 'image/Default_pfp.jpg', description: 'Future computer engineer, passionate about hardware design and IoT.' },
        { username: 'jameswilson', name: 'James Wilson', password: 'jameswilsonsecure', email: 'jameswilson@example.com', course: 'Cybersecurity', accountType: 'Student', profilePic: 'image/Default_pfp.jpg', description: 'Cybersecurity major focusing on ethical hacking and digital forensics.' },
        { username: 'emmawatson', name: 'Emma Watson', password: 'emma123456', email: 'emmawatson@example.com', course: 'Artificial Intelligence', accountType: 'Lab Facilitator', profilePic: 'image/Default_pfp.jpg', description: 'Dedicated to exploring the ethical implications of AI and supporting innovative projects in the field.' }
    ];

    const sampleLabs = [
        { lab_name: "GK304A", total_seats: 40, location: "John Gokongwei Sr. Hall" },
        { lab_name: "GK304B", total_seats: 35, location: "John Gokongwei Sr. Hall" },
        { lab_name: "GK305A", total_seats: 35, location: "John Gokongwei Sr. Hall" },
        { lab_name: "GK305B", total_seats: 40, location: "John Gokongwei Sr. Hall" },
        { lab_name: "GK306A", total_seats: 45, location: "John Gokongwei Sr. Hall" },
        { lab_name: "GK306B", total_seats: 40, location: "John Gokongwei Sr. Hall" },
        { lab_name: "GK307A", total_seats: 20, location: "John Gokongwei Sr. Hall" }
    ];
    const randomReservations = generateRandomReservations(sampleLabs, sampleUsers, 500);
    for (const user of sampleUsers) {
        try {
           await axios.post('http://localhost:3000/register', user);
        } catch (error) {
        }
    }
    for (const lab of sampleLabs) {
        try {
            await axios.post('http://localhost:3000/labs', lab);
        } catch{}
    }
    for (const reservation of randomReservations) {
        try {
            await axios.post('http://localhost:3000/reservations', reservation);
            console.log(`Reservation for ${reservation.username} on ${reservation.reserve_date} created successfully`);
        } catch (error) {
        }
    }
};

module.exports = {
    initializeApplication
};