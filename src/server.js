const express = require('express');
const app = express();
const port = process.env.PORT || 5000; // You can set the port here
const cors = require('cors');
const axios = require('axios'); // Import Axios for making HTTP requests

app.use(express.json());
app.use(cors()); // Enable Cross-Origin Resource Sharing to allow requests from the React frontend

// Define your API route for generating images
app.post('/api/generate-images', async (req, res) => {
  try {
    // Extract data from the request body
    const { apiKey, theme, imageSettings } = req.body;

    // Construct the API request for OpenAI's image generation
    const openaiEndpoint = 'https://api.openai.com/v1/images';
    const headers = {
      'Authorization': `Bearer ${apiKey}`, // Use the API key provided by the user
      'Content-Type': 'application/json',
    };

    // Define the parameters for generating the image
    const parameters = {
      prompt: `Generate an image of a ${theme}`,
      n: imageSettings.numberOfImages,
      size: imageSettings.imageSize,
    };

    // Make a POST request to OpenAI's image generation API
    const response = await axios.post(openaiEndpoint, parameters, { headers });

    // Extract the generated image URLs from the response
    const generatedImages = response.data.data.map((imageData) => imageData.url);

    res.json({ generatedImages });
  } catch (error) {
    console.error('Error generating images:', error);
    res.status(500).json({ error: 'Failed to generate images' });
  }
});

// Set up your server to listen to the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
