import React, { useState } from 'react';

function ThemeInput(props) {
  const [themeDescription, setThemeDescription] = useState('');

  const handleThemeChange = (e) => {
    setThemeDescription(e.target.value);
  };
  
  return (
    <div className="input-container">
      <label>THEME DESCRIPTION:</label>
      <input
        type="text"
        value={themeDescription}
        onChange={handleThemeChange}
        placeholder="Enter theme description"
      />
    </div>
  );
}

export default ThemeInput;
