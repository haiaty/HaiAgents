'use strict'

const path = require('path');
const ReadContentFromFile = require("../jobs/filesystem/ReadContentFromFile");
const WriteContentToFile = require("../jobs/filesystem/WriteContentToFile");

const BuildToolsStringToAddOnPrompt = require("../jobs/agenttools/BuildToolsStringToAddOnPrompt");
const ReplacePlaceholder = require("../jobs/strings/ReplacePlaceholder");
const ParseChoosenToolText = require("../jobs/agenttools/ParseChoosenToolText");

module.exports =  async function (agent) {


    // tools: https://github.com/langchain-ai/langchainjs/tree/main/examples/src/tools

    //===========================
    // get the agent prompt template
    //===========================
    let agentPrompt=ReadContentFromFile('./prompts/agent_template.txt');

    //===========================
    // build the tools prompt part
    //===========================
    let tools =agent.tools;
    let toolsStringToAddOnPrompt = BuildToolsStringToAddOnPrompt(tools);

    //===========================
    // replace the tools part on the prompt string
    //===========================
    agentPrompt = ReplacePlaceholder('{tools}', toolsStringToAddOnPrompt, agentPrompt);

    //===========================
    // replace the task part
    //===========================
    agentPrompt = ReplacePlaceholder('{task}', agent.task, agentPrompt)


    //===========================
    // enrich prompt with semantic search
    //===========================
    // @todo



    //===========================
    // RunInference
    //===========================
    let provider = agent.llm_configs.provider;

    let runInferenceStrategy = null;

    switch(provider) {
        case "ollama":
            runInferenceStrategy = require('./../../llmproviders/ollama/GetLlmResponseAsStream');
            break;
        default:
            throw Error("we dont support this yet");
    }



    let result = await runInferenceStrategy(agentPrompt, agent.llm_configs);


    //===========================
    // output
    //===========================

    let finalResponse = '';
    for await (const part of result) {

        let currentMessagePart = part.message.content;

        process.stdout.write(part.message.content)

        finalResponse += currentMessagePart;
    }

    if( ! finalResponse.includes('[/choosen_tool]')) {
        console.log("the llm response does not contain the structure needed");

    }

    //===========================
    // Parse llm response to find the tool
    //===========================
    let toolParseResults = ParseChoosenToolText(finalResponse);

    let toolName = toolParseResults.tool_name;
    let toolParams = toolParseResults.tool_params;

    const toolPath = path.join(process.cwd(), 'tools', toolName, toolName);

    let toolFunction = require(toolPath);

    let toolResult = await toolFunction(toolParams)

    console.log(toolResult);

    //===========================
    //  send task output to:
    //===========================

    if(agent.hasOwnProperty('send_task_output_to')) {

        let sendTaskOutputTo = agent.send_task_output_to;

        switch(sendTaskOutputTo.where) {
            case "console":
                console.log(toolResult);
                break;
            case "file":
                let outputFilePath = sendTaskOutputTo.file_path;
                WriteContentToFile(toolResult, outputFilePath);
                break;
            default:
                console.log(toolResult);

        }

    }

}

