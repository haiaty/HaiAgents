const ReadContentFromFile = require("../jobs/filesystem/ReadContentFromFile");
const {Ollama} = require('ollama');

const BuildToolsStringToAddOnPrompt = require("../jobs/agenttools/BuildToolsStringToAddOnPrompt");
const ReplacePlaceholder = require("../jobs/strings/ReplacePlaceholder");

module.exports =  async function (agent) {


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
    // Comment here
    //===========================
    // Create an instance of Ollama
    const ollama = new Ollama({
        host: 'http://127.0.0.1:11434', // Ensure the Ollama server is running at this address
    });

    try {
        const message = { role: 'user', content: agentPrompt }
        const response = await ollama.chat({ model: 'llama3.2', messages: [message], stream: true })
        for await (const part of response) {
            process.stdout.write(part.message.content)
        }
    } catch (error) {
        // Handle any errors that occur during the request
        console.error('Error communicating with Ollama:', error);
    }

    process.exit();
}