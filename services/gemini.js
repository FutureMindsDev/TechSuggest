const { GoogleGenerativeAI } = require("@google/generative-ai");
const GraphApi = require("./graph-api.js");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

module.exports = class Gemini {
  static async generateContent(psid, prompt) {
    const result = await model.generateContent(prompt);
    GraphApi.sendResult(psid, result.response.text());
  }
};
