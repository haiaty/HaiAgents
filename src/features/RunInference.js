'use strict'

const path = require("path");
const EmitEvent = require(path.join(process.cwd(), 'src', 'jobs', 'EmitEvent'));


module.exports =  async function (prompt, llmconfigs) {

    let runInferenceStrategy = null;

    //===========================
    // choose the inference strategy based on the provider
    //===========================
    await EmitEvent('[running] deciding the inference strategy', llmconfigs);
    switch(llmconfigs.provider) {
        case "ollama":
            runInferenceStrategy = require('../../llmproviders/ollama/GetLlmResponseAsStream');
            break;
        default:
            throw Error("we dont support this yet");
    }

    await EmitEvent('[finished] inference strategy defined', runInferenceStrategy);


    //===========================
    // Comment here
    //===========================
    let result = await runInferenceStrategy(prompt, llmconfigs);

    return result;

}