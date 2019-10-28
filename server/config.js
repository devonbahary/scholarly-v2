let mongoUri;
if (process.env.NODE_ENV === 'dev') {
    mongoUri = 'mongodb://localhost:27017/scholarly';
} else {
    mongoUri = ''; // TODO
}

process.env.MONGO_URI = mongoUri;


export default {
    mongo: {
        database: 'scholarly',
        mongoUri,
    },
    mysql: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'scholarly',
    },
}