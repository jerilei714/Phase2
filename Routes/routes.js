const express = require('express');
const path = require('path'); 
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/viewSlots', (req, res) => {
    res.render('viewSlots');
});

router.get('/viewProfile', (req, res) => {
    res.render('viewProfile');
});

router.get('/resForStudent', (req, res) => {
    res.render('resForStudent');
});

router.get('/reserveSlots', (req, res) => {
    res.render('reserveSlots');
});

router.get('/reserveForStudent', (req, res) => {
    res.render('reserveForStudent');
});

router.get('/deleteReservations', (req, res) => {
    res.render('deleteReservations');
});

router.get('/reservations', (req, res) => {
    res.render('reservations');
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/profile', (req, res) => {
    res.render('profile');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/editStudentReservations', (req, res) => {
    res.render('editStudentReservations');
});

router.get('/editReservationsContent', (req, res) => {
    res.render('editReservationsContent');
});

router.get('/editReservations', (req, res) => {
    res.render('editReservations');
});

module.exports = router;
