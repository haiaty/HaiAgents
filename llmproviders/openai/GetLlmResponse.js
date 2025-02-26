
const openai = require('./openai');

module.exports =  async function OllamaGetLlmResponse(prompt) {


    try {
        const chatCompletion = await openai.chat.completions.create({
            messages: [{ role: 'user', content: 'Say this is a test' }],
            model: 'gpt-4o',
        });

        return chatCompletion;

    } catch (error) {
        // Handle any errors that occur during the request
        console.error('Error communicating with openai:', error);
    }

    process.exit();

}