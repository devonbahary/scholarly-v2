const isProd = process.env.NODE_ENV === 'production';

// let mongoUri;
// if (process.env.NODE_ENV === 'dev') {
//     mongoUri = 'mongodb://localhost:27017/scholarly';
// } else {
//     mongoUri = ''; // TODO
// }
// process.env.MONGO_URI = mongoUri;

export default {
    mongo: {
        database: 'scholarly',
        mongoUri: '',
    },
    mysql: {
        host: isProd ? process.env.CLEARDB_DATABASE_URL : 'localhost',
        user: isProd ? 'b35ab5cbb5c3d3' : 'root',
        password: isProd ? '957e1c98' : '',
        database: isProd ? 'heroku_23777d05b1260c2' : 'scholarly',
    },
}