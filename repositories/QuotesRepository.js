import BaseMySQLRepository from "./BaseMySQLRepository";

export default class QuotesRepository extends BaseMySQLRepository {
    constructor() {
        super(
            'quotes',
            QuotesRepository.getReadColumns(),
            QuotesRepository.getWriteColumns(),
        );
    };

    static getReadColumns() {
        return [
            'id',
            'text',
            'collection_id',
        ];
    };

    static getWriteColumns() {
        return [
            'text',
            'user_id',
        ];
    };

    getSelectQueryWithCollectionTitle() {
        return `
            SELECT ${this.getSelectColumns('q')},
            c.title as collectionTitle
            FROM ${this.tableName} as q
            LEFT JOIN collections as c
            ON q.collection_id = c.id
        `;
    };

    getByUserIdQuery() {
        return `
            ${this.getSelectQueryWithCollectionTitle()}
            WHERE q.user_id = ?
        `;
    };

    getByCollectionId(collectionId) {
        return this.query(`
            ${this.getSelectQueryWithCollectionTitle()}
            WHERE collection_id = ?
        `, [ collectionId ]);
    };

    getByUserId(userId) {
        return this.query(this.getByUserIdQuery(), [ userId ]);
    };

    getRandomQuoteForUser(userId) {
        return this.query(`
            ${this.getByUserIdQuery()}
            ORDER BY RAND()
            LIMIT 1;
        `, [ userId ]);
    };
}