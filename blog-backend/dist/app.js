"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const openai_1 = __importDefault(require("openai"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config(); // Load environment variables from .env file
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const openai = new openai_1.default({ apiKey: process.env.OPENAI_API_KEY }); // Use the API key from .env
app.use(body_parser_1.default.json());
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Rate limit exceeded. Please try again later.',
});
// Apply the rate limiter to all routes or specific routes
app.use(limiter);
app.use((0, cors_1.default)());
// Define your API endpoint for generating blog content
app.post('/generate-blog', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, prompt } = req.body;
        // Check if 'title' and 'prompt' fields are present in the request data
        if (!title || !prompt) {
            return res.status(400).json({ error: 'Title and prompt fields are required' });
        }
        // Define the prompt for content generation
        const fullPrompt = `Title: ${title}\n\n${prompt}`;
        // Generate content using OpenAI's GPT-3
        const response = yield openai.completions.create({
            model: 'gpt-3.5-turbo-instruct',
            prompt: fullPrompt,
            max_tokens: 200, // Adjust this value as needed
        });
        // Extract the generated content
        const generatedContent = response.choices[0].text;
        // Return the generated content as a JSON response
        res.status(200).json({ generatedContent });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
