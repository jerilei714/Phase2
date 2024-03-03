const express = require('express');
const path = require('path');
const { connectToDB } = require('./labDatabase');
const registrationController = require('./controllers/regController');
const loginController = require('./controllers/loginController');
const userController = require('./controllers/userController');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/styles', express.static(path.join(__dirname, 'Styles')));
app.use('/scripts', express.static(path.join(__dirname, 'Scripts')));
app.use('/view', express.static(path.join(__dirname, 'View')));
app.use('/images', express.static(path.join(__dirname, 'Images')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'), (err) => {
        if (err) {
            res.status(500).send('Server Error: ' + err.code);
        }
    });
});

app.use('/register', registrationController);
app.use('/login', loginController);
app.use('/users', userController);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectToDB();
});
