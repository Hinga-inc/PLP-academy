// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// middleware
app.use(bodyParser.json());

// connect to mongodb
mongoose.connect("mongodb://localhost:27017/products", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongodb connection error:'));

// routes
app.use("/products", require("./routes/products"));

// start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});