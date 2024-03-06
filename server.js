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
app.engine('handlebars', exphbs());

app.use('/styles', express.static(path.join(__dirname, 'Styles')));
app.use('/scripts', express.static(path.join(__dirname, 'Scripts')));
app.use('/images', express.static(path.join(__dirname, 'Images')));

app.engine('.hbs', exphbs({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'View', 'layouts')
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'View'));

app.get('/', (req, res) => {
    res.render('index');
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
