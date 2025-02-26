const {Ollama} = require("ollama");


const ollama = new Ollama({
    host: 'http://127.0.0.1:11434', // Ensure the Ollama server is running at this address
});

module.exports = ollama;