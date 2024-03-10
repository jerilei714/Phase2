require('dotenv').config();
const express = require('express');
const path = require('path');
const hbsCtrl = require('hbs')
const crypto = require('crypto');
const exphbs  = require('express-handlebars');
const cookieParser = require('cookie-parser')
const routes = require('./Routes/routes')
const { connectToDB } = require('./Model/labDatabase');
const registrationController = require('./Controller/regController');
const loginController = require('./Controller/loginController');
const userController = require('./Controller/userController');
const labController = require('./Controller/labController');
const reservationController = require('./Controller/reservationController');
const seatController = require('./Controller/seatController');
const redSeatsController = require('./Controller/redSeatsController');
const reserveSlotsController = require('./Controller/reserveSlotsController');
const { router, cookieAuth } = require('./Middleware/cookieAuth'); 
const Authenticated = require('./Middleware/authenticated'); 
const app = express();
app.use('/', express.static(path.join(__dirname, '/public')));
app.use(cookieParser());
app.use(cookieAuth); 
app.use(Authenticated);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



const hbs = exphbs.create({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'View', 'layouts'),
    partialsDir: path.join(__dirname, 'View', 'partials')
  });
  
hbsCtrl.registerPartials(path.join(__dirname, 'View', 'partials'))
app.engine('handlebars', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'View'));
app.use((req,res,next) =>{
    next()
})

app.use('/', routes)

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
    console.log("Connected!")
});
