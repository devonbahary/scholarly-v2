import express from "express";
import QuotesRepository from "../repositories/QuotesRepository";
import ApiUtil from "../ApiUtil";


const router = express.Router();

const USER_ID = 1; // TODO: replace with auth

router.get('/', async (req, res) => {
    const quotesRepository = new QuotesRepository();
    try {
        const results = await quotesRepository.getByUserId(USER_ID);
        res.send(results);
    } catch (err) {
        ApiUtil.errorResponse(res, err);
    }
});

router.post('/', async (req, res) => {
    const quotesRepository = new QuotesRepository();
    const { collectionId, text } = req.body;
    try {
        const result = await quotesRepository.insertInto({ collectionId, text, USER_ID });
        ApiUtil.newRecordResponse(res, result);
    } catch (err) {
        ApiUtil.errorResponse(res, err);
    }
});

router.put('/:id', async (req, res) => {
    const quotesRepository = new QuotesRepository();
    const id = req.params.id;
    const { collectionId, text } = req.body;
    try {
        await quotesRepository.updateById(id, { collectionId, text });
        res.sendStatus(200);
    } catch (err) {
        ApiUtil.errorResponse(res, err);
    }
});

router.delete('/:id', async (req, res) => {
    const quotesRepository = new QuotesRepository();
    const id = req.params.id;
    try {
        await quotesRepository.deleteById(id);
        res.sendStatus(200);
    } catch (err) {
        ApiUtil.errorResponse(res, err);
    }
});

export default router;