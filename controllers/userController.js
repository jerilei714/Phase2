const express = require('express');
const { getUser } = require('../models/labUsers');
const { getReservedSeatsByLab } = require('../models/labReservedSeats');
const { getReservation } = require('../models/labReserves');

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

router.get('/:username/reservations', async (req, res) => {
  try {
      const { username } = req.params;
      const labId = req.query.labId;
      const reservedSeats = await getReservedSeatsByLab(labId);
      const reservationIds = reservedSeats.map(seat => seat.reservation_id);
      const reservations = await Promise.all(reservationIds.map(id => getReservation(id)));
      res.json(reservations);
  } catch (error) {
      console.error('Error fetching user reservations:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
