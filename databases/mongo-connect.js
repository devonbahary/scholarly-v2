import { MongoClient } from "mongodb";


const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const client = new MongoClient(process.env.MONGO_URI, options);


let db;
client.connect(err => {
    if (err) console.log(err);
    console.log(`MongoDB connected to ${process.env.MONGO_URI}`);
    db = client.db("scholarly");
});

export default {
    get: () => db,
};