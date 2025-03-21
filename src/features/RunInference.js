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
        case "googlegemini":
            runInferenceStrategy = require(path.join(process.cwd(), 'llmproviders', 'googlegemini', 'GetLlmResponseAsStream'));
            break;
        default:
            throw Error("we dont support this yet");
    }

    await EmitEvent('[finished] inference strategy defined', runInferenceStrategy.name);


    //===========================
    // Comment here
    //===========================
    await EmitEvent('[running] running inference', llmconfigs);
    let result = await runInferenceStrategy(prompt, llmconfigs);
    await EmitEvent('[finished] got response stream from llm provider', llmconfigs);


    return result;

}