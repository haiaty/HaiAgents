

'use strict'
const path = require("path");

module.exports =  async function GoogleGeminiExtractTextFromStreamChunk(chunk) {

    if (chunk && typeof chunk === 'object') {

            const chunkText = await extractText(chunk); // Call extractText to get the *result*

            return chunkText;

    }

}

/**
 *
 * @param chunk
 * @returns {Promise<string>}
 */
async function extractText(chunk) {
    if (chunk && chunk.candidates && chunk.candidates.length > 0) {
        const candidate = chunk.candidates[0];

        if (candidate.content && candidate.content.parts && candidate.content.parts.length > 0) {
            return String(candidate.content.parts[0].text || ""); // Return the text, or empty string if no text
        } else {
            //No content parts found in candidate. returns empty string;
            return "";
        }
    } else {
        //No content parts found in candidate. returns empty string;
        return "";
    }
}