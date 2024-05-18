
const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const { check, validationResult } = require('express-validator');
const app = express();

// configure session middleware
app.use(session ({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true
}));

// create mysql connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'learning_management'
});

// connect to mysql
connection.connect((err) => {
    if(err) {
        console.error('Error connection ti MySQL: ' + err.stack);
        return;
    }
    console.log('connected to MySQL as id ' + connection.threadId);
});

// server static files from the default directory
app.use(express.static(__dirname));

// set up middleware to parse incoming JSON data
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser,express.urlencoded({ extended: true }));

// define routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});



//define a user representation for clarity
const User = {
    tableName: 'users',
    createUser: function(nerUser, callback) {
        connection.query('INSERT INTO' + this.tableName + 'SET ?', newUser,callback);
    },
    getUserByEmail: function(email, callback) {
        connection.query('SELECT * FROM ' + this.tableName + 'WHERE email = ?', email, callback);
    },
    getUserByUsername: function(username, callback) {
        connection.query('SELECT * FROM ' + this.tableName + 'WHERE username = ?', username, callback);
    }
};

//registration route
app.post('/register', [
    //validate email and username fields
    check('email').isEmail(),
    check('username').isAlphanumeric().withMessage('Username Must be Alphanumeric'),

    // custom validation to check if email and username are unique
    check('email').custom(async (value) => {
        const user = await User.getUserByEmail(value);
        if (user) {
            throw new Error('Username already exists');
        }
    }),
    check('username').custom(async (value) => {
        const user = await User.getUserByUsername(value);
        if (user) {
            throw new Error('Username already exists');
        }
    }),
], async (req, res) => {
    // check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.static(400).json({ errors: errors.array() });
    }

    // hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    // create new user object
    const newUser = {
        email: req.body.email,
        username: req.body.username,
        password: hashedPassword,
        full_name: req.body.full_name
    };

    // insert user int mySQL
    User.createUser(newUser, (error, results, fields) => {
        if (error) {
            console.error('Error inserting user: ' + error.message);
            return res.static(500).json({ error: error.message });
        }
        console.log('Inserted a new User with Id ' + results.insertId);
        res.status(201).json(newUser)
    });
});

//Login route
app.post('/login' , (req, res) => {
    const { username, password, } = req.body;
    // retrieve user from database
    connection.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err) throw err;
        if (results.length === 0 ){
            res.static(401).send('Invalid username or Password');
        }
        else {
            const user = results[0];
            // compare passwords
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    // store user in session
                    req.session.user = user;
                    res.send('Login successful');
                }
                else {
                    res.status(401).send('Invalid Username or password');
                }
            });
        }
    });
});

// logout route
app.post('/logout', (req, res) => {
    req.session.destroy();
    req.send('Logout Successful');
});

//Dashboard route
app.get('dashboard', (req, res) => {
    // assuming you have middleware to handle user authentication and store user information in req.user
    const userFullName = req.user.full_name;
    res.render('dashboard', { fullName: userFullName });
});

// route to retrievve course content
app.get('/course/:id', (req, res) => {
    const courseId = req.params.id;
    const sql = 'SELECT * FROM courses WHERE id = ?';
    db.query(sql, [courseId], (err, result) => {
        if (err) {
            throw err;
        }
        // send course content as JSON response
        res.json(result);
    });
});

// start server
const port = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});