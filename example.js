'use strict'

const RunAgentAndStreamResponse = require('./src/features/RunAgentAndStreamResponse');

async function main() {

    //===========================
    // agent
    //===========================
    let agent = {
        'name': 'myResearcher',
        'agent_instruction': 'You are an expert on researching online',
        'tools': ['web_search', 'url_downloader'],
        'llm_configs': {
            'provider': 'ollama',
            'llm': 'llama3.2'
        }
    };


    await RunAgentAndStreamResponse(agent);

}


main();