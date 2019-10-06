export default class ApiUtil {
    static errorResponse(res, err) {
        console.error(err);
        res.status(400).send(err);
    }
}