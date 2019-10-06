import BaseMySQLRepository from "./BaseMySQLRepository";

export default class CollectionsRepository extends BaseMySQLRepository {
    constructor() {
        super(
            'collections',
            CollectionsRepository.getReadColumns(),
            CollectionsRepository.getWriteColumns(),
        );
    };

    static getReadColumns() {
        return [
            'id',
            'title',
        ];
    };

    static getWriteColumns() {
        return [
            'title',
            'user_id',
        ];
    };

    getCollectionsByUserId(user_id = 1) {
        return this.query(`
            SELECT ${this.getSelectColumns('c')}, 
            COUNT(q.collection_id) as quoteCount
            FROM ${this.tableName} as c
            LEFT JOIN quotes as q 
            ON c.id = q.collection_id
            WHERE c.user_id = ?
            GROUP BY c.id
        `, [ user_id ]);
    };
}