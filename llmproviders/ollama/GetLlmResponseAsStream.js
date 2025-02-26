
const ollama = require('./ollama');

module.exports =  async function OllamaGetLlmResponseAsStream(prompt, llmConfigs) {


    try {
        const message = { role: 'user', content: prompt }
        const response = await ollama.chat({ model: llmConfigs.llm, messages: [message], stream: true })
        return response;
    } catch (error) {
        // Handle any errors that occur during the request
        console.error('Error communicating with Ollama:', error);
    }
}