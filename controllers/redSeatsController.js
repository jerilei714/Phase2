const express = require('express');
const router = express.Router();
const { createReservedSeat, getReservedSeat, updateReservedSeat, deleteReservedSeat, getReservedSeatsByLab } = require('../models/labReservedSeats');

router.post('/', async (req, res) => {
    try {
        const { lab_id, lab_name, seat_id, seat_number, user_id, user_name, date_reserved, reservation_id, time_reserved } = req.body;
        const reservedSeat = {
            lab_id,
            lab_name,
            seat_id,
            seat_number,
            user_id,
            user_name,
            reservation_id,
            date_reserved,
            time_reserved
        };
        const reservedSeatId = await createReservedSeat(reservedSeat);
        res.status(201).json({ reservedSeatId });
    } catch (error) {
        console.error('Error creating reserved seat:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/:seatId', async (req, res) => {
    try {
        const { seatId } = req.params;
        const seat = await getReservedSeat(seatId);
        if (seat) {
            res.json(seat);
        } else {
            res.status(404).json({ error: 'Reserved seat not found' });
        }
    } catch (error) {
        console.error('Error getting reserved seat:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/:seatId', async (req, res) => {
    try {
        const { seatId } = req.params;
        const updatedSeatData = req.body;
        const success = await updateReservedSeat(seatId, updatedSeatData);
        if (success) {
            res.json({ success: true });
        } else {
            res.status(404).json({ error: 'Reserved seat not found' });
        }
    } catch (error) {
        console.error('Error updating reserved seat:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete('/:seatId', async (req, res) => {
    try {
        const { seatId } = req.params;
        const success = await deleteReservedSeat(seatId);
        if (success) {
            res.json({ success: true });
        } else {
            res.status(404).json({ error: 'Reserved seat not found' });
        }
    } catch (error) {
        console.error('Error deleting reserved seat:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/lab/:labId', async (req, res) => {
    try {
        const { labId } = req.params;
        const reservedSeats = await getReservedSeatsByLab(labId);
        res.json(reservedSeats);
    } catch (error) {
        console.error('Error fetching reserved seats:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
