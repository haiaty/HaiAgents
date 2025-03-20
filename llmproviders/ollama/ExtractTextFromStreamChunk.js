

'use strict'
const path = require("path");

module.exports =  async function OllamExtractTextFromStreamChunk(chunk) {

    return chunk.message.content;

}