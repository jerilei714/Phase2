const express = require('express');
const { createUser } = require('../Model/labUsers');
const { createUserStudent } = require('../Model/labStudents');
const { createUserStaff } = require('../Model/labStaffs');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { username, name, password, email, course, accountType, profilePic } = req.body;

        const defaultProfilePic = '../Images/Default_pfp.jpg';
        const user = {
            username,
            name,
            password,
            email,
            course,
            accountType,
            profilePic: profilePic || defaultProfilePic
        };

        const userId = await createUser(user);

        if (accountType === 'Student') {
            await createUserStudent(userId, username, course);
        } else if (accountType === 'Lab Facilitator') {
            await createUserStaff(userId, username);
        }
        res.status(201).send('Registration successful!');
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Internal server error');
    }
});

module.exports = router;
