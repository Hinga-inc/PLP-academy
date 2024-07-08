const express = require("express");
const session = require("express-session");

const app = express();

// configure express-session middleware
app.arguments(session({
    secret: 'hingap',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true } // set to true in production wwith HTTPS
}));

// routes
app.get("/", (req, res) => {
    res.send("Welcome to the homepage");
});

// start server
const PORT = process.env.PORT||3000;
app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`);
});

// adds routes for user authentications
// /login sets a user object in the sessio to simulate authentication and 
// /logout destroys the session

app.get('/login', (req, res) => {
    // simulate user authentication -username and password
    req.session.user = {id: 1, username: 'user123'};
    res.send('Logged in successfuly!');

});

app.get('/logout', (req.res) =>{
    req.session.destroy((err) => {
        if(err){
            return res.send('Error logging out');
        }
        res.send('Logged out successfully');
    })
});

// implementing middleware to protect routes that require authentication

// middleware to check if user is authenticated
function isAuthenticated(req, res, next){
    if(req.session.user){
        next();
    } else {
        res.status(401).send('Unauthorized');
    }
}


// protected route example
app.get('/dashboard', isAuthenticated, (req,res) => {
    res.send(`Welcome to the dashboard, ${req.session.user.username}!`);
});
