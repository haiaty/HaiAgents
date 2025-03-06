'use strict'

const path = require("path");



const RunAgentsToCompleteTask = require(path.join(process.cwd(), 'src', 'services', 'RunAgentsToCompleteTask'));
const EmitEvent = require(path.join(process.cwd(), 'src', 'jobs', 'EmitEvent'));


async function main() {

    await EmitEvent('[ACTION] Run agents to complete task action started');

    await RunAgentsToCompleteTask("Find information about SOL and send me an email",  {
        'llm_configs': {
            'provider': 'ollama',
            'llm': 'deepseek-r1:7b-qwen-distill-q8_0'
        }
    });

}

main();