import db from "../server/databases/mongo-connect";

export default class MongoRepository {
    constructor(collectionName) {
        this.collection = db.get().collection(collectionName);
    };

    find(query = {}) {
        return new Promise((resolve, reject) => {
            this.collection.find(query).toArray((err, docs) => {
                if (err) return reject(err);
                resolve(docs);
            });
        });
    };

    insertOne(document) {
        return this.collection.insertOne(document);
    };
}