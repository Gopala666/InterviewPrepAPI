require("dotenv").config();
const express = require('express');
const cors = require('cors');
const { Configuration, OpenAIApi, default: OpenAI } = require('openai'); // Correct import statement

const app = express();
app.use(cors());
app.use(express.json());

// Initialize OpenAI API with your API key
const openai = new OpenAI({
  apiKey: process.env.API_KEY
});

// Endpoint to interact with ChatGPT
app.post('/chatgpt', async (req, res) => {
const userMessage = req.body.message;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: userMessage }],
    });
  
    // Log the entire response for debugging
    console.log('API Response:', response);
  
    // Check if the response and choices exist
    if (response && response.choices && response.choices.length > 0) {
      const gptResponse = response.choices[0].message.content;
      console.log('GPT Response:', gptResponse);
      res.json({ response: gptResponse });
    } else {
      console.error('No choices found in the response.');
      res.status(500).json({ error: 'No choices found in the response.' });
    }
  } catch (error) {
    console.error('Error communicating with OpenAI:', error);
    res.status(500).json({ error: 'Failed to get response from OpenAI.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});