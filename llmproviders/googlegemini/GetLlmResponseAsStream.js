'use strict'

const path = require("path");
const googlegemini = require(path.join(process.cwd(), 'llmproviders', 'googlegemini', 'googlegemini'));

module.exports = async function GoogleGeminiGetLlmResponseAsStream(prompt, llmConfigs) {


    try {

        const model = googlegemini.getGenerativeModel({model: llmConfigs.llm});

        const result = await model.generateContentStream(prompt);

        return result.stream;
    } catch (error) {
        // Handle any errors that occur during the request
        console.error('Error communicating with Google Gemini:', error);
    }
}
