'use strict'
const path = require("path");
const sqlite = require(path.join(process.cwd(), 'src', 'drivers', 'sqlite'));
const GetFormattedDatetimeJob = require(path.join(process.cwd(), 'src', 'jobs', 'date', 'GetFormattedDatetime'));



module.exports =  async function (llm_options, promptSent, llmOutput) {

    let params = [
        GetFormattedDatetimeJob(),
        JSON.stringify(llm_options, null, 2),
        promptSent,
        llmOutput
    ];

    let insertStatement = `INSERT INTO inference_evaluations(date_at, llm_used, prompt_sent_to_llm, llm_output) VALUES (?,?,?,?)`;

    await sqlite.insert(insertStatement, params);

}