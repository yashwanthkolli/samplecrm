require('dotenv').config({
    path:'./config/config.env'
});

const express = require('express');
const cors = require('cors');
const path = require('path');

const authRouter = require('./routes/auth.router');
const userRouter = require('./routes/user.router');
const leadRouter = require('./routes/lead.router');
const configurationRouter = require('./routes/configuration.router');

const { connection } = require('./config/db');
connection();

const app = express();

app.use(express.json())
app.use(express.static(path.join(__dirname, 'uploads')));
app.use(cors({
    origin: "http://localhost:3000"
}))

app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/lead', leadRouter);
app.use('/configuration', configurationRouter);

app.listen(process.env.PORT, (req, res) => {
    console.log("Server Listening At Port 3001");
})