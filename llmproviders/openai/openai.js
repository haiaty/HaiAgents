@todo

// see https://github.com/openai/openai-node

const {OpenAI} = require('openai');

const client = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

module.export = client;