'use strict'

const path = require("path");

const ReadContentFromFile = require(path.join(process.cwd(),  'src', 'jobs', 'filesystem', 'ReadContentFromFile'));
const ReplacePlaceholder = require(path.join(process.cwd(),  'src', 'jobs', 'strings', 'ReplacePlaceholder'));
const RunInference = require(path.join(process.cwd(),  'src', 'features', 'RunInference'));
const ParseSteps = require(path.join(process.cwd(),  'src', 'jobs', 'ParseSteps'));
const RunAgent = require("../features/RunAgent");


module.exports =  async function (task, options) {

    //===========================
    // take the 'brain' template
    //===========================
    let reasoningPrompt = path.join(process.cwd(), 'prompts', 'agent_reasoning_tasks_list.txt')
    let brainAgentPrompt = ReadContentFromFile(reasoningPrompt);

    //===========================
    // replace the tools part on the prompt string
    //===========================
    brainAgentPrompt = ReplacePlaceholder('{task}', task, brainAgentPrompt);

    //===========================
    // run inference
    //===========================
    let resultStream = await RunInference(brainAgentPrompt, options.llm_configs);

    //===========================
    // response of the 'brain' llm
    //===========================
    let finalResponse = '';
    for await (const part of resultStream) {

        let currentMessagePart = part.message.content;
        finalResponse += currentMessagePart;
    }

    //===========================
    // get the list of proposed tasks to do
    // proposed by the brain
    //===========================
    let tasksToDo = ParseSteps(finalResponse);



    //===========================
    // For each task runAgent
    //===========================

    var state = {};

    for(const task of tasksToDo){

        let agent = {
            'task': task,
            'llm_configs': options.llm_configs,
            'send_task_output_to': 'return_it',
            'state': state
        };

        let taskResult = await RunAgent(agent);

        // This copies properties from obj1 and obj2 into a new object.
        // If there are duplicate keys, later objects overwrite earlier ones.
        state = Object.assign(state, state, taskResult);

    }


    console.log(brainAgentPrompt);
}