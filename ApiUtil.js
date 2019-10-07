export default class ApiUtil {
    static errorResponse(res, err) {
        console.error(err);
        res.status(400).send(err);
    };

    static successReponse(res) {
        res.status(200).send({ success: true });
    };
}