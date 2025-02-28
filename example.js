'use strict'

const RunAgent = require('./src/features/RunAgent');

async function main() {

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
        'send_task_output_to': {'where': 'file', 'file_path': "./output.txt"},
    };




    let taskResult = await RunAgent(agent);

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


main();