const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const taskApi = require('./routes/taskApi')
const {errorHandler} = require('./middlewares/errorHandler')

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use('/api', taskApi);
app.use(errorHandler);

mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_OPTIONS}`
).then(() => {
    console.log('Connected to mongodb');
}).catch((error) => {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});
    