require('dotenv').config({
    path:'./config/config.env'
});

const express = require('express');
const cors = require('cors');

const authRouter = require('./routes/auth.router');

const connector = require('./config/db');
connector();

const app = express();

app.use(express.json())
app.use(cors({
    origin: "http://localhost:3000"
}))

app.use('/auth', authRouter);

app.listen(process.env.PORT, (req, res) => {
    console.log("Server Listening At Port 3001");
})