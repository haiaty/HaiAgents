'use strict'

const RunAgentAndStreamResponse = require('./src/features/RunAgentAndStreamResponse');

async function main() {

    // 'find the top 5 latest news about AI development and send me a report

    // call to tool

    // tool to execute python script or nodejs snippet

    //===========================
    // Execute tool
    //===========================
    // let toolName = 'duckduckgo_search';
    // let toolFileName = 'DuckDuckGoSearch';
    // let toolFunction = require(`./tools/${toolName}/${toolFileName}`);
    //
    // await toolFunction({
    //     'textToSearch': "latest news ai agents"
    // });



    //===========================
    // agent
    //===========================
    let agent = {
        'name': 'myResearcher',
        'description': 'a researcher',
        'instruction': 'You are an expert on researching online',
        'tools': ['duckduckgo_search'],
        'llm_configs': {
            'provider': 'ollama',
            'llm': 'deepseek-r1:7b-qwen-distill-q8_0'
        },
        'task': 'find the top 5 latest news about nodejs',
        'send_output_to': "console|email|stream|/path/file|next_agent"
    };

    //  'llm': 'deepseek-r1:7b-qwen-distill-q8_0'

    await RunAgentAndStreamResponse(agent);

}


main();