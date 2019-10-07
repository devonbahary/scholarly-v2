export default class ApiUtil {
    static errorResponse(res, err) {
        console.error(err);
        res.status(400).send(err);
    };

    static newRecordResponse(res, result) {
        const { insertId } = result;
        res.status(200).send({ insertId });
    };
}