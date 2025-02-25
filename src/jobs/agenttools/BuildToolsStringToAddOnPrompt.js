

module.exports =  function (tools) {

    let toolsStringToAddOnPrompt = '';
    for (const tool of tools) {
        let toolDefinitionJson = require(`../../../tools/${tool}/${tool}.json`);

        let toolDefinitionString = JSON.stringify(toolDefinitionJson)

        toolsStringToAddOnPrompt += '\n' + toolDefinitionString;
    }

    return toolsStringToAddOnPrompt;

}