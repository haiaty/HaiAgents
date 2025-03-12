'use strict'

const path = require("path");

const sqlite3 = require('sqlite3').verbose();

const DB_PATH = path.join(process.cwd(), 'sqlite', 'haiagents.db')

// Creazione della connessione al database (crea il file se non esiste)

const db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
        console.error("Error while opening db:", err.message);
        return;
    }
});


module.exports = {
    createTable: async function(tableCreateSql){
        return new Promise((resolve, reject) => {
            db.run(tableCreateSql, (err) => {
                if (err) {
                    reject(err);
                } else {

                    resolve();
                }
            });
        });
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
};