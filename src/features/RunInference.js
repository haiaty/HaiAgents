

module.exports =  async function (prompt, llmconfigs) {

    let runInferenceStrategy = null;

    //===========================
    // choose the inference strategy based on the provider
    //===========================
    switch(llmconfigs.provider) {
        case "ollama":
            runInferenceStrategy = require('../../llmproviders/ollama/GetLlmResponseAsStream');
            break;
        default:
            throw Error("we dont support this yet");
    }

    //===========================
    // Comment here
    //===========================
    let result = await runInferenceStrategy(prompt, llmconfigs);

    return result;

}