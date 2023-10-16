export const generateImages = async (chatGptApiKey, dalleApiKey, theme, imageSettings) => {
    try {
      const response = await fetch('/api/generateImages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ chatGptApiKey, dalleApiKey, theme, imageSettings }),
      });
      if (!response.ok) {
        throw new Error('Failed to generate images');
      }
      return response.json();
    } catch (error) {
      throw error;
    }
  };
  
