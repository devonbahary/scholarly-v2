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

    getByCollectionId(collectionId) {
        return this.query(`
            SELECT ${this.getSelectColumns().join(', ')}
            FROM ${this.tableName}
            WHERE collection_id = ?
        `, [ collectionId ]);
    };

    getByUserId(userId) {
        return this.query(`
            SELECT ${this.getSelectColumns().join(', ')},
            (SELECT title FROM collections where collections.id = collection_id) as collectionTitle
            FROM ${this.tableName}
            WHERE user_id = ?
        `, [ userId ]);
    };

    getRandomQuoteForUser(userId) {
        return this.query(`
          SELECT ${this.getSelectColumns().join(', ')} 
          FROM ${this.tableName}
          WHERE user_id = ?
          ORDER BY RAND()
          LIMIT 1;
        `, [ userId ]);
    };
}