import React, { useState } from 'react';
import './App.css';
import AgentInput from './components/AgentInput';
import ThemeInput from './components/ThemeInput';
import { generateImages } from './apiService'; // Import generateImages directly

function App() {
  const [generatedImages, setGeneratedImages] = useState([]);
  const [apiKey, setApiKey] = useState(''); // Initialize with an empty string
  const [chatGptApiKey, setChatGptApiKey] = useState('');
  const [dalleApiKey, setDalleApiKey] = useState('');
  const [theme, setTheme] = useState('');
  const [imageSettings, setImageSettings] = useState({
    numberOfImages: 1,
    imageSize: '256x256',
  });

  const handleGenerateImages = () => {
    console.log('handleGenerateImages called'); // Log that the function is called
  
    // Log the values of key variables
    console.log('chatGptApiKey:', chatGptApiKey);
    console.log('dalleApiKey:', dalleApiKey);
    console.log('theme:', theme);
  
    if (!chatGptApiKey || !dalleApiKey || !theme) {
      console.error('API keys and theme are required.'); // Updated error message
      return;
    }
  
    // Call the imported generateImages function with chatGptApiKey, dalleApiKey, theme, and imageSettings
    generateImages(chatGptApiKey, dalleApiKey, theme, imageSettings)
    .then((images) => {
      setGeneratedImages(images);
    })
    .catch((error) => {
      console.error('Error generating images:', error);
    });
  
  };
  

  return (
    <div className="App">
      <div className="left-section">
        <h2>API AGENT</h2>
        <AgentInput
          setChatGptApiKey={setChatGptApiKey} // Pass setChatGptApiKey and setDalleApiKey props
          setDalleApiKey={setDalleApiKey}
        />
        <h2>API DALLE</h2>
        <ThemeInput setTheme={setTheme} theme={theme} />
        <div className="input-container">
          <label>AMOUNT OF IMAGES:</label>
          <select
            value={imageSettings.numberOfImages}
            onChange={(e) =>
              setImageSettings({
                ...imageSettings,
                numberOfImages: parseInt(e.target.value),
              })
            }
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
        <div className="input-container">
          <label>SIZE:</label>
          <select
            value={imageSettings.imageSize}
            onChange={(e) =>
              setImageSettings({
                ...imageSettings,
                imageSize: e.target.value,
              })
            }
          >
            <option value="256x256">256x256</option>
            <option value="512x512">512x512</option>
            <option value="1024x1024">1024x1024</option>
          </select>
        </div>
        <button onClick={handleGenerateImages}>Generate</button>
      </div>
      <div className="right-section">
        {generatedImages.map((imageUrl, index) => (
          <div key={index} className="image-container">
            <img src={imageUrl} alt={`Generated Image ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
