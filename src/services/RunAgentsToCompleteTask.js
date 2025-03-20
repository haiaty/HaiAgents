'use strict'

const path = require("path");

const ReadContentFromFile = require(path.join(process.cwd(),  'src', 'jobs', 'filesystem', 'ReadContentFromFile'));
const ReplacePlaceholder = require(path.join(process.cwd(),  'src', 'jobs', 'strings', 'ReplacePlaceholder'));
const RunInference = require(path.join(process.cwd(),  'src', 'features', 'RunInference'));
const ParseSteps = require(path.join(process.cwd(),  'src', 'jobs', 'ParseSteps'));
const RunAgent = require(path.join(process.cwd(),  'src', 'features', 'RunAgent'));
const EmitEvent = require(path.join(process.cwd(), 'src', 'jobs', 'EmitEvent'));
const SaveInferenceDataForEvaluationJob = require(path.join(process.cwd(), 'src', 'jobs', 'SaveInferenceDataForEvaluation'));
const CalculateExecutionTimeJob = require(path.join(process.cwd(), 'src', 'jobs', 'CalculateExecutionTime'));

const GetExtractTextFromChunkStrategy = require(path.join(process.cwd(), 'src', 'jobs', 'GetExtractTextFromChunkStrategy'))


module.exports =  async function (task, options) {

    //===========================
    // take the 'brain' template
    //===========================
    await EmitEvent('[running] reading brain prompt');

    let reasoningPrompt = path.join(process.cwd(), 'prompts', 'agent_reasoning_tasks_list.txt')
    let brainAgentPrompt = ReadContentFromFile(reasoningPrompt);

    await EmitEvent('[finished] brain prompt read', {prompt: brainAgentPrompt});



    //===========================
    // replace the tools part on the prompt string
    //===========================
    await EmitEvent('[running] replacing task in initial prompt');

    brainAgentPrompt = ReplacePlaceholder('{task}', task, brainAgentPrompt);

    await EmitEvent('[finished] task replaced on initial prompt', {prompt: brainAgentPrompt});


    //===========================
    // run inference
    //===========================
    await EmitEvent('[info] Brain agent prompt to be sent');

    const start = process.hrtime.bigint(); // High-resolution time in nanoseconds

    let resultStream = await RunInference(brainAgentPrompt, options.llm_configs);

    const end = process.hrtime.bigint();
    await EmitEvent('[finished] llm response stream received', {duration: CalculateExecutionTimeJob(start, end)});

    //===========================
    // response of the 'brain' llm
    //===========================
    await EmitEvent('[running] consuming llm response stream');

    // we need to have different strtegy per service provider, since each of them
    // has different strcutures on the response stream
    let ExtractTextFromChunkStrategy = await GetExtractTextFromChunkStrategy(options.llm_configs);

    let finalResponse = '';
    for await (const chunk of resultStream) {

        let currentMessagePart =  await ExtractTextFromChunkStrategy(chunk);

        finalResponse += currentMessagePart;
    }
    await EmitEvent('[finished] llm response stream consumed', {llm_output: finalResponse});

    //===========================
    // Comment here
    //===========================
    await SaveInferenceDataForEvaluationJob(options.llm_configs, brainAgentPrompt, finalResponse);


    //===========================
    // get the list of proposed tasks to do
    // proposed by the brain
    //===========================
    await EmitEvent('[running] parsing steps from llm output to extract tasks to do');

    let tasksToDo = ParseSteps(finalResponse);

    await EmitEvent('[finished] tasks extracted', {'tasks_extracted': tasksToDo});



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

        await EmitEvent('[info] NEW AGENT created to perform TASK: ' +  task, agent);

        let taskResult = await RunAgent(agent);

        // This copies properties from obj1 and obj2 into a new object.
        // If there are duplicate keys, later objects overwrite earlier ones.
        state = Object.assign(state, state, taskResult);

    }

}