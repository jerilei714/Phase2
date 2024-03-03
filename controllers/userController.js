const express = require('express');
const { getUser } = require('../models/labUsers');

const router = express.Router();

router.get('/:username', async (req, res) => {
  try {
    const user = await getUser(req.params.username);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error getting user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
