import express from 'express';
import bodyParser from 'body-parser';
import OpenAI  from 'openai';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import cors from 'cors';

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 3000;
const openai = new OpenAI ({ apiKey: process.env.OPENAI_API_KEY }); // Use the API key from .env

app.use(bodyParser.json());
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Rate limit exceeded. Please try again later.',
});

// Apply the rate limiter to all routes or specific routes
app.use(limiter);

app.use(cors()); 

// Define your API endpoint for generating blog content
app.post('/generate-blog', async (req, res) => {
  try {
    const { title, prompt } = req.body;

    // Check if 'title' and 'prompt' fields are present in the request data
    if (!title || !prompt) {
      return res.status(400).json({ error: 'Title and prompt fields are required' });
    }

    // Define the prompt for content generation
    const fullPrompt = `Title: ${title}\n\n${prompt}`;

    // Generate content using OpenAI's GPT-3
    const response = await openai.completions.create({
      model: 'gpt-3.5-turbo-instruct',
      prompt: fullPrompt,
      max_tokens: 200, // Adjust this value as needed
    });

    // Extract the generated content
    const generatedContent = response.choices[0].text;

    // Return the generated content as a JSON response
    res.status(200).json({ generatedContent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
