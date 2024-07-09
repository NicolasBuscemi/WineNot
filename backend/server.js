const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB (replace 'your_mongodb_connection_string' with your actual connection string)
mongoose.connect('mongodb+srv://busceminicolassa:in78W2Mn0otRFWda@cluster0.zhnqvsy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

// Basic route for testing
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});