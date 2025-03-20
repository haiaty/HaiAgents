const { GoogleGenerativeAI } =  require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

module.exports = genAI;