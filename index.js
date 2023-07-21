const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const cors = require('cors')
require('dotenv').config();
const routes = require('./routes/routes');

const DATABASE_URL = process.env.DATABASE_URL;
const PORT = process.env.PORT || 8000;


mongoose.connect(DATABASE_URL);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error);
});
database.once('connected', () => {
    console.log('Database connected');
});

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors())
app.use(
    cookieSession({
        name: "token",
        secureProxy: process.env.SECURE_PROXY ==="true",
        secret: process.env.PRIVATE_KEY,
        httpOnly: process.env.COOKIE_HTTP_ONLY ==="true",
        secure: process.env.COOKIE_SECURE === "true"
    })
);
app.use('/api', routes)

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
})