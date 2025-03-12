'use strict'

const path = require("path");

const sqlite3 = require('sqlite3').verbose();

const DB_PATH = path.join(process.cwd(), 'sqlite', 'haiagents.db')

const db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
        console.error("Error while opening db:", err.message);
        return;
    }
});

function _run(sqlStatement){
    return new Promise((resolve, reject) => {
        db.run(sqlStatement, (err) => {
            if (err) {
                reject(err);
            } else {

                resolve();
            }
        });
    });
}


module.exports = {
    createTable: async function(tableCreateSql){
        return _run(tableCreateSql);
    },
    insert: async function (insertSql, params) {
        return new Promise((resolve, reject) => {
            db.run(insertSql, params, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            });
        });
    },
    truncate: async function (tableName) {
        let truncateStatement = `DELETE FROM ${tableName}`;
        return _run(truncateStatement);
    },

};