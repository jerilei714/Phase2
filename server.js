const express = require('express');
const path = require('path');
const exphbs  = require('express-handlebars');
const { connectToDB } = require('./Model/labDatabase');
const registrationController = require('./Controller/regController');
const loginController = require('./Controller/loginController');
const userController = require('./Controller/userController');
const labController = require('./Controller/labController');
const reservationController = require('./Controller/reservationController');
const seatController = require('./Controller/seatController');
const redSeatsController = require('./Controller/redSeatsController');
const reserveSlotsController = require('./Controller/reserveSlotsController');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/styles', express.static(path.join(__dirname, 'Styles')));
app.use('/scripts', express.static(path.join(__dirname, 'Scripts')));
app.use('/images', express.static(path.join(__dirname, 'Images')));

const hbs = exphbs.create({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'View', 'layouts')
  });
  
app.engine('handlebars', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'View'));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/viewSlots', (req, res) => {
    res.render('viewSlots');
});

app.get('/viewProfile', (req, res) => {
    res.render('viewProfile');
});

app.get('/resForStudent', (req, res) => {
    res.render('resForStudent');
});

app.get('/reserveSlots', (req, res) => {
    res.render('reserveSlots');
});

app.get('/reserveForStudent', (req, res) => {
    res.render('reserveForStudent');
});

app.get('/deleteReservations', (req, res) => {
    res.render('deleteReservations');
});

app.get('/reservations', (req, res) => {
    res.render('reservations');
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.get('/profile', (req, res) => {
    res.render('profile');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/editStudentReservations', (req, res) => {
    res.render('editStudentReservations');
});

app.get('/editReservationsContent', (req, res) => {
    res.render('editReservationsContent');
});

app.get('/editReservations', (req, res) => {
    res.render('editReservations');
});

app.use('/register', registrationController);
app.use('/login', loginController);
app.use('/users', userController);
app.use('/labs', labController);
app.use('/reservations', reservationController); 
app.use('/seats', seatController);
app.use('/reservedseats', redSeatsController);
app.use('/reserve-slots', reserveSlotsController);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectToDB();
});
