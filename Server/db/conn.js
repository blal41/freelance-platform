const mongoose = require('mongoose');

// const DB = process.env.DATABASE;

mongoose.connect("mongodb+srv://babulalseervi2003:NsbEELSQ2F8Jw8kU@cluster0.mbunh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(() => {
    console.log('connection successful');
}).catch((err) => console.log('Connection Unsuccessful :('));
