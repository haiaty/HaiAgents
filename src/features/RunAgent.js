'use strict'

const path = require('path');
const ReadContentFromFile = require("../jobs/filesystem/ReadContentFromFile");
const WriteContentToFile = require("../jobs/filesystem/WriteContentToFile");

const BuildToolsStringToAddOnPrompt = require("../jobs/agenttools/BuildToolsStringToAddOnPrompt");
const ReplacePlaceholder = require("../jobs/strings/ReplacePlaceholder");
const ParseChoosenToolText = require("../jobs/agenttools/ParseChoosenToolText");
const RunInference = require(path.join(process.cwd(),  'src', 'features', 'RunInference'));

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
    // replace the state part
    //===========================
    agentPrompt = ReplacePlaceholder('{state_from_previous_agents}', agent.state, agentPrompt)


    //===========================
    // enrich prompt with semantic search
    //===========================
    // @todo



    //===========================
    // RunInference
    //===========================
    let resultStream = await RunInference(agentPrompt, agent.llm_configs);

    //===========================
    // output
    //===========================

    let finalResponse = '';
    for await (const part of resultStream) {

        let currentMessagePart = part.message.content;
        finalResponse += currentMessagePart;
    }

    //===========================
    // check output has the right structure
    //===========================
    if( ! finalResponse.includes('[/choosen_tool]')) {
        console.log("the llm response does not contain the structure needed");

    }

    //===========================
    // Parse llm response to find the tool
    //===========================
    let toolParseResults = ParseChoosenToolText(finalResponse);

    let toolName = toolParseResults.tool_name;
    //@todo: put a check on the tool on the available tools. to find available tools do scandir on tools dir or generate a json containing the putput of the scandir of the dir 'tools'

    let toolParams = toolParseResults.tool_params;

    const toolPath = path.join(process.cwd(), 'tools', toolName, toolName);

    let toolFunction = require(toolPath);

    let toolResult = await toolFunction(toolParams)

    console.log(toolResult);


    //===========================
    // return task result
    //===========================
    return toolResult;


}

