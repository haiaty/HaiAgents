
const openai = require('./openai');

async function OpenApiGetLlmResponseAsStream() {
    const stream = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [{ role: 'user', content: 'Say this is a test' }],
        stream: true,
    });

    return stream;
}