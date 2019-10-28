import express from "express";
import CollectionsRepository from "../../repositories/CollectionsRepository";
import QuotesRepository from "../../repositories/QuotesRepository";
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

router.get('/:id', async (req, res) => {
    const collectionsRepository = new CollectionsRepository();
    const quotesRepository = new QuotesRepository();
    const collectionId = req.params.id;

    try {
        const collection = await collectionsRepository.findById(collectionId);
        const quotes = await quotesRepository.getByCollectionId(collectionId);
        res.send({
            collection,
            quotes,
        });
    } catch (err) {
        ApiUtil.errorResponse(res, err);
    }
});

router.post('/', async (req, res) => {
    const collectionsRepository = new CollectionsRepository();
    const { title } = req.body;

    try {
        const result = await collectionsRepository.insertInto({ title, USER_ID });
        ApiUtil.newRecordResponse(res, result);
    } catch (err) {
        ApiUtil.errorResponse(res, err);
    }
});

router.put('/:id', async (req, res) => {
    const collectionsRepository = new CollectionsRepository();
    const id = req.params.id;
    const { title } = req.body;

    try {
        await collectionsRepository.updateById(id, { title });
        res.sendStatus(200);
    } catch (err) {
        ApiUtil.errorResponse(res, err);
    }
});

router.delete('/:id', async (req, res) => {
    const collectionsRepository = new CollectionsRepository();
    const id = req.params.id;
    try {
        await collectionsRepository.deleteById(id);
        res.sendStatus(200);
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