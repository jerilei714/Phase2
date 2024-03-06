const express = require('express');
const path = require('path');
const exphbs  = require('express-handlebars');
const { connectToDB } = require('./labDatabase');
const registrationController = require('./controllers/regController');
const loginController = require('./controllers/loginController');
const userController = require('./controllers/userController');
const labController = require('./controllers/labController');
const reservationController = require('./controllers/reservationController');
const seatController = require('./controllers/seatController');
const redSeatsController = require('./controllers/redSeatsController');
const reserveSlotsController = require('./controllers/reserveSlotsController');

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

app.get('/deleteReservation', (req, res) => {
    res.render('deleteReservation');
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

app.get('/editReservationContent', (req, res) => {
    res.render('editReservationContent');
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
