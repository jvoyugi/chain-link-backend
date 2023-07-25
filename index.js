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
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: "GET,POST,PUT,DELETE,PATCH",
    credentials: true,
    maxAge: 86400,
    exposedHeaders: "Set-Cookie"
}))
app.use(
    cookieSession({
        name: "session-cookie",
        secret: process.env.PRIVATE_KEY,
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        domain: process.env.COOKIE_DOMAIN || "localhost",
        sameSite: 'none',
        maxAge: 86400
    })
);
app.use('/api', routes)

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
})