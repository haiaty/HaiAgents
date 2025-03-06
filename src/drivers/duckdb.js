
const path = require("path");
const {  DuckDBInstance  } = require('@duckdb/node-api');

const DB_PATH = path.join(process.cwd(), 'duckdb', 'events.db')

let connection = (async function() {
    let instance = await DuckDBInstance.create(DB_PATH);
    return instance;
})()


module.exports = {
    connection:connection

}