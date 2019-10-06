import { MongoClient } from "mongodb";
import config from "../config";

const mongoUri = config.mongo.mongoUri;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const client = new MongoClient(mongoUri, options);


let db;
client.connect(err => {
    if (err) console.log(err);
    console.log(`MongoDB connected to ${mongoUri}`);
    db = client.db(config.mongo.database);
});

export default {
    get: () => db,
};