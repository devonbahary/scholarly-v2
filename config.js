if (process.env.NODE_ENV === 'dev') {
    process.env.MONGO_URI = 'mongodb://localhost:27017/scholarly';
} else {
    process.env.MONGODB_URI = ''; // TODO
}