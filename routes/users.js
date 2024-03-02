const express = require('express');
const { createUser, getUser, updateUser, deleteUser } = require('../models/users');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const userId = await createUser(req.body);
    res.status(201).json({ userId });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:userId', async (req, res) => {
  try {
    const user = await getUser(req.params.userId);
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

router.put('/:userId', async (req, res) => {
  try {
    const updated = await updateUser(req.params.userId, req.body);
    if (updated) {
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:userId', async (req, res) => {
  try {
    const deleted = await deleteUser(req.params.userId);
    if (deleted) {
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
