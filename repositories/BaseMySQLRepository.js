import { camelCase } from "change-case";
import pool from "../databases/mysql-connect";

export default class BaseMySQLRepository {
    constructor(tableName, readColumns = [], writeColumns = []) {
        this.tableName = tableName;
        this.readColumns = readColumns;
        this.writeColumns = writeColumns;
    };

    getSelectColumns() {
        return this.readColumns.map(readColumn => `${readColumn} as ${camelCase(readColumn)}`);
    };

    query(sql, values) {
        return new Promise((resolve, reject) => {
            pool.query(sql, values, function(err, results) {
                if (err) return reject(err);
                resolve(results);
            })
        });
    };

    insertInto(...values) {
        return this.query(`
            INSERT INTO ${this.tableName}
            SET ${this.writeColumns.map(writeColumn => `${writeColumn} = ?`).join(', ')}
        `, [ ...values ]);
    };
};