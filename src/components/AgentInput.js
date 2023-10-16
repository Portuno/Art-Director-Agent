import React, { useState } from 'react';

function AgentInput() {
  const [agentText, setAgentText] = useState('');
  const [chatGptApiKey, setChatGptApiKey] = useState(''); // Add this state variable for ChatGPT API key
  const [dalleApiKey, setDalleApiKey] = useState(''); // Add this state variable for DALL·E API key

  const handleAgentChange = (e) => {
    setAgentText(e.target.value);
  };

  const handleChatGptApiKeyChange = (e) => {
    setChatGptApiKey(e.target.value);
  };
  
  const handleDalleApiKeyChange = (e) => {
    setDalleApiKey(e.target.value);
  };
  

  return (
    <div className="input-container">
      <label>AGENT PERSONALITY:</label>
      <input
        type="text"
        value={agentText}
        onChange={handleAgentChange}
        placeholder="Enter agent personality"
      />
      <label>ChatGPT API Key:</label>
      <input
        type="text"
        value={chatGptApiKey}
        onChange={handleChatGptApiKeyChange}
        placeholder="Enter ChatGPT API Key"
      />
      <label>DALL·E API Key:</label>
      <input
        type="text"
        value={dalleApiKey}
        onChange={handleDalleApiKeyChange}
        placeholder="Enter DALL·E API Key"
      />
    </div>
  );
}

export default AgentInput;
