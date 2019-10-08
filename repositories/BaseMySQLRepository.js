import _ from "lodash";
import { camelCase, snakeCase } from "change-case";
import pool from "../databases/mysql-connect";

export default class BaseMySQLRepository {
    constructor(tableName, readColumns = [], writeColumns = []) {
        this.tableName = tableName;
        this.readColumns = readColumns;
        this.writeColumns = writeColumns;
    };

    // retrieve read-only columns with option to prepend them with table alias (e.g., in a JOIN)
    getSelectColumns(tableAlias = '') {
        return this.readColumns.map(readColumn =>
            `${tableAlias ? `${tableAlias}.` : ''}${readColumn} as ${camelCase(readColumn)}`
        ).join(', ');
    };

    // allows us to write to snake_case MySQL columns with JavaScript camelCase object properties
    getInsertIntoData(record) {
        const data = {
            writeColumns: [],
            values: [],
        };
        return _.entries(record).reduce((data, [ key, val ]) => {
            if (val === undefined) return data;

            const columnName = snakeCase(key);
            if (!this.writeColumns.includes(columnName)) {
                throw new Error(`Cannot INSERT INTO column ${columnName} for record property ${key}`);
            }

            return {
                writeColumns: [ ...data.writeColumns, columnName ],
                values: [ ...data.values, val ],
            };
        }, data);
    };

    query(sql, values) {
        return new Promise((resolve, reject) => {
            pool.query(sql, values, function(err, results) {
                if (err) return reject(err);
                resolve(results);
            })
        });
    };

    async querySingle(sql, values) {
        const results = await this.query(sql, values);
        return results.length ? results[0] : null;
    };

    async findById(id) {
        return this.querySingle(`
            SELECT ${this.readColumns} 
            FROM ${this.tableName}
            WHERE id = ?
        `, [ id ]);
    };

    insertInto(record) {
        const { writeColumns, values } = this.getInsertIntoData(record);
        return this.query(`
            INSERT INTO ${this.tableName}
            SET ${writeColumns.map(writeColumn => `${writeColumn} = ?`).join(', ')}
        `, values);
    };
};