
const path = require('path');
const ReadContentFromFile = require("../src/jobs/filesystem/ReadContentFromFile");
const ParseChoosenToolText = require("../src/jobs/agenttools/ParseChoosenToolText");

async function main() {

    let llmOutput = ReadContentFromFile('./test/llmresponse1.txt');


    let toolParseResults = ParseChoosenToolText(llmOutput);

    let toolName = toolParseResults.tool_name;
    let toolParams = toolParseResults.tool_params;


    const toolPath = path.join(process.cwd(), 'tools', toolName, toolName);


    let toolFunction = require(toolPath);

    let a = await toolFunction(toolParams);

    console.log(a);


}

main()