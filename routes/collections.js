import express from "express";
import CollectionsRepository from "../repositories/CollectionsRepository";
import QuotesRepository from "../repositories/QuotesRepository";
import ApiUtil from "../ApiUtil";

const router = express.Router();

const USER_ID = 1; // TODO: replace with auth

router.get('/', async (req, res) => {
    const collectionsRepository = new CollectionsRepository();
    try {
        const results = await collectionsRepository.getCollectionsByUserId();
        res.send(results);
    } catch (err) {
        ApiUtil.errorResponse(res, err);
    }
});

router.post('/', async (req, res) => {
    const collectionsRepository = new CollectionsRepository();
    const { title } = req.body;
    try {
        await collectionsRepository.insertInto({ title, user_id: USER_ID });
        ApiUtil.successReponse(res);
    } catch (err) {
        ApiUtil.errorResponse(res, err);
    }
});

router.get('/quotes/:id', async (req, res) => {
    const quotesRepository = new QuotesRepository();
    const collectionId = req.params.id;
    try {
        const results = await quotesRepository.getByCollectionId(collectionId);
        res.send(results);
    } catch (err) {
        ApiUtil.errorResponse(res, err);
    }
});

export default router;