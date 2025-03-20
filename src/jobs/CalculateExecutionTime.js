
'use strict'
const path = require("path");
/*
 start and end must be generated as  process.hrtime.bigint();
 */
module.exports =   function (start, end) {

    const durationMs = Number(end - start) / 1e6; // Convert nanoseconds to milliseconds

    const msFormatted = durationMs.toFixed(2);

    return msFormatted;
}