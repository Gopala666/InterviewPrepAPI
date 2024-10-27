const express = require('express');
const cors = require('cors');
const { Configuration, OpenAIApi, default: OpenAI } = require('openai'); // Correct import statement

const app = express();
app.use(cors());
app.use(express.json());

// // Initialize OpenAI API with your API key
// const configuration = new Configuration({
//   apiKey: 'YOUR_OPENAI_API_KEY', // Replace with your actual API key
// });
// const openai = new OpenAIApi(configuration);
const openai = new OpenAI({
  apiKey: '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' // This is also the default and can be omitted
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

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});