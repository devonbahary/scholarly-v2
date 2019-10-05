import express from "express";
import MongoRepository from "../repositories/MongoRepository";

const router = express.Router();

router.get('/', async (req, res) => {
    const collectionsRepository = new MongoRepository('collections');
    const docs = await collectionsRepository.find({});
    res.send(docs);
});

export default router;