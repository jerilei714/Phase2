const express = require('express');
const { getUser } = require('../Model/labUsers');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await getUser(username);
        if (user && user.password === password) {
            res.status(200).json({ username: username, accountType: user.accountType });
        } else {
            res.status(401).json({ error: 'Invalid username or password' });
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
