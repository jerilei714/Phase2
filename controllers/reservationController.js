const express = require('express');
const { createReservation, getReservation, updateReservation, deleteReservation } = require('../models/labReserves');
const { updateSeatStatus } = require('../models/labSeats');
const { createReservedSeat } = require('../models/labReservedSeats');
const router = express.Router();


router.post('/', async (req, res) => {
    try {
        const { lab_id, lab_name, user_id, username, reserve_date, reserve_time, seat_number } = req.body;
        const reservationData = {
            lab_id,
            lab_name,
            user_id,
            username,
            reserve_date,
            reserve_time,
            seat_number
        };
        const reservationId = await createReservation(reservationData);
        const reservedSeatData = {
            lab_id,
            reservation_id: reservationId,
            seat_number,
            username,
            reserve_date,
            reserve_time
        };
        await createReservedSeat(reservedSeatData);

        await updateSeatStatus(lab_name, seat_number, 'Reserved');
        res.status(201).json({ reservationId });
    } catch (error) {
        console.error('Error creating reservation:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/:reservationId', async (req, res) => {
    try {
        const { reservationId } = req.params;
        const reservation = await getReservation(reservationId);
        if (reservation) {
            res.json(reservation);
        } else {
            res.status(404).json({ error: 'Reservation not found' });
        }
    } catch (error) {
        console.error('Error getting reservation:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/:reservationId', async (req, res) => {
    try {
        const { reservationId } = req.params;
        const updatedReservationData = req.body;
        const success = await updateReservation(reservationId, updatedReservationData);
        if (success) {
            res.json({ success: true });
        } else {
            res.status(404).json({ error: 'Reservation not found' });
        }
    } catch (error) {
        console.error('Error updating reservation:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete('/:reservationId', async (req, res) => {
    try {
        const { reservationId } = req.params;
        const success = await deleteReservation(reservationId);
        if (success) {
            res.json({ success: true });
        } else {
            res.status(404).json({ error: 'Reservation not found' });
        }
    } catch (error) {
        console.error('Error deleting reservation:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
