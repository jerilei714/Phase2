const express = require('express');
const { ObjectId } = require('mongodb');
const { createReservation, getReservation, updateReservation, deleteReservation , getReservedSeatsByUsername, getReservationsByUsername } = require('../Model/labReserves');
const { updateSeatStatus } = require('../Model/labSeats');
const { createReservedSeat, checkSeatAvailability } = require('../Model/labReservedSeats');
const router = express.Router();


router.post('/', async (req, res) => {
    try {
        const { lab_id, lab_name, user_id, username, reserve_date, reserve_time, seat_number, tnd_requested, anonymous } = req.body;
        const reservationData = {
            lab_id,
            lab_name,
            user_id,
            username: anonymous ? 'Anonymous' : username,
            reserve_date,
            reserve_time,
            seat_number,
            anonymous
        };
        const reservationId = await createReservation(reservationData);
        const reservedSeatData = {
            lab_id,
            reservation_id: reservationId,
            seat_number,
            username: username,
            reserve_date,
            reserve_time,
            tnd_requested,
            anonymous
        };
        await createReservedSeat(reservedSeatData);

        await updateSeatStatus(lab_name, seat_number, 'Reserved');
        res.status(201).json({ reservationId });
    } catch (error) {
        console.error('Error creating reservation:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.get('/checkAvailability', async (req, res) => {
    const { date, labId, seatNumber } = req.query;
    const isAvailable = await checkSeatAvailability(labId, seatNumber, date);
    res.json({ isAvailable });
});

router.get('/:reservationId', async (req, res) => {
    try {
        const { reservationId } = req.params;
        const reservation = await getReservation(new ObjectId(reservationId));
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



router.get('/userReservations/:username', async (req, res) => {
    try {
        const { username } = req.params;
        const userReservations = await getReservedSeatsByUsername(username);
        res.json({ userReservations });
    } catch (error) {
        console.error('Error fetching user reservations:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/update/:reservationId', async (req, res) => {
    try {
        const { reservationId } = req.params;
        const updatedDetails = req.body;
        const success = await updateReservation(new ObjectId(reservationId), updatedDetails);
        if (success) {
            res.json({ success: true, message: 'Reservation updated successfully' });
        } else {
            res.status(404).json({ error: 'Failed to update reservation' });
        }
    } catch (error) {
        console.error('Error updating reservation:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/byUsername/:username', async (req, res) => {
    try {
        const { username } = req.params;
        const userReservations = await getReservationsByUsername(username);
        res.json({ userReservations });
    } catch (error) {
        console.error('Error fetching user reservations:', error);
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
