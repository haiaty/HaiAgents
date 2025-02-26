
const ollama = require('./ollama');

module.exports =  async function OllamaGetLlmResponse(prompt) {


    try {
        const message = { role: 'user', content: prompt }
        const response = await ollama.chat({ model: 'llama3.2', messages: [message], stream: false })

        return response;

    } catch (error) {
        // Handle any errors that occur during the request
        console.error('Error communicating with Ollama:', error);
    }

    process.exit();

}