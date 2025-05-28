require('dotenv').config();
const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);

module.exports = app;
