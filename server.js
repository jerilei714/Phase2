const express = require('express');
const path = require('path');
const { connectToDB } = require('./labDatabase');
const { createUser } = require('./models/labUsers');

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

app.get('/view/:page', (req, res) => {
    const page = req.params.page;
    res.sendFile(path.join(__dirname, 'View', `${page}.html`), (err) => {
        if (err) {
            res.status(500).send('Server Error: ' + err.code);
        }
    });
});

app.post('/register', async (req, res) => {
    try {

        const { username, name, password, email, course, accountType } = req.body;

        const user = {
            username,
            name,
            password,
            email,
            course,
            accountType
        };

        const userId = await createUser(user);

        res.status(201).send('Registration successful!');
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Internal server error');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectToDB(); 
});
