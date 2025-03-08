
const path = require("path");
const {  DuckDBInstance  } = require('@duckdb/node-api');

const DB_PATH = path.join(process.cwd(), 'duckdb', 'haiagents.db')

//===========================
// create the istance Promise to be used to get the istance.
// Why in this way? to reuse the same promise and the same instance every time.
// you will always get the same promise and, once resolved, the same instance.
// why? IIFE (Immediately Invoked Function Expression)  Your async function executes immediately and returns a promise (instancePromise) that resolves to the DuckDBInstance object.
// Promise is shared - instancePromise holds the reference to the same promise. Since promises are immutable once resolved (see: ,https://www.promisejs.org/#:~:text=Once%20a%20promise%20is%20fulfilled,it%20can%20never%20change%20again).
// every await instancePromise will return the same resolved value.
//
// What Happens Internally?
// The first time instancePromise is awaited, it will wait for DuckDBInstance.create(DB_PATH).
// Once resolved, all future await instancePromise calls will instantly return the already-resolved instance.
//
// Edge Cases?
// If DuckDBInstance.create(DB_PATH) fails, instancePromise will be a rejected promise, and every await instancePromise will throw an error unless handled properly.
// If you need to handle failures and allow retries, you should structure it differently (e.g., reassign instancePromise upon failure).
//
// is this better then creating a new instance and a new promise every time? Advantages of a Shared Promise:
// Avoids Recreating the Database Instance - DuckDBInstance.create(DB_PATH) likely opens a database connection, which can be expensive in terms of performance.
// Using the same instance avoids unnecessary overhead.
//
// Ensures a Single Connection.
//
// Improved Performance - Resolving a promise that has already been resolved is almost instantaneous. Creating new promises and instances repeatedly introduces unnecessary async overhead.
//
// Consistent State - If different parts of your app use different database instances, you might run into inconsistencies.
//
// When Would a New Instance Each Time Be Better?
// If you need true isolation (e.g., multiple users or different databases).
// If DuckDBInstance.create(DB_PATH) is very lightweight, and creating new instances doesn't hurt performance.
//===========================
var instancePromise = (async function() {
    let instance = await DuckDBInstance.create(DB_PATH);
    return instance;
})()


module.exports = {
    //===========================
    // create table
    //===========================
    createTable: async function(tableCreateSql){
        await this.runWithoutReturn(tableCreateSql);
    },
    insert: async function (insertSql) {
        await this.runWithoutReturn(insertSql);
    },
    select: async function (queryToRun) {
        return await this.runWithReturn(queryToRun);
    },
    runWithoutReturn: async function(sqlToRun) {

        //===========================
        // open connection
        //===========================
        let instance = await instancePromise;
        const connection = await instance.connect();

        //===========================
        // execute create
        //===========================
        await connection.run(sqlToRun);

        //===========================
        // close connection
        //===========================
        await connection.close();
    },

    runWithReturn: async function(queryToRun) {
        //===========================
        // open connection
        //===========================
        let instance = await instancePromise;
        const connection = await instance.connect();

        //===========================
        // execute create
        //===========================
        let results = await connection.runAndReadAll(queryToRun);

        //===========================
        // close connection
        //===========================
        await connection.close();

        return results;
    }

}