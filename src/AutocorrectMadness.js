import React, { useState } from 'react';

function AutocorrectMadness() {
  const [userInput, setUserInput] = useState('');
  const [mangledText, setMangledText] = useState('');
  const [autocorrectIntensity, setAutocorrectIntensity] = useState('medium'); // Initial medium level

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
    updateMangledText(event.target.value);
  };

  const updateMangledText = (text) => {
    const transformedText = applyRandomTransformation(text); // Adjust if needed
    setMangledText(transformedText);
  };


  const mangleText = (text) => { 
    const words = text.split(' ');
    const mangledWords = words.map(word => {
      if (autocorrectIntensity === 'low') {
        if (Math.random() < 0.1) { // Lower chance of mangling
             return applyRandomTransformation(word);
        } 
    } else if (autocorrectIntensity === 'medium') {
        if (Math.random() < 0.2) { // Your original logic
          return applyRandomTransformation(word);
        }
    } else { // high
        if (Math.random() < 0.4) { // Higher chance of mangling
          return applyRandomTransformation(word);
        }
    }
    });
    return mangledWords.join(' ');
  };
    
    const applyRandomTransformation = (word) => {
      const transformations = [
        replaceWithSimilarSounding, // Prioritize this
        swapAdjacentLetters,
        insertRandomLetter 
    ];
      const randomIndex = Math.floor(Math.random() * transformations.length);
      return transformations[randomIndex](word);
    };
    
    // Simple transformation functions
    const swapAdjacentLetters = (word) => {
      if (word.length < 2) {
        return word; 
      }
    
      const letters = word.split(''); 
      const indexToSwap = Math.floor(Math.random() * (word.length - 1));
    
      
      [letters[indexToSwap], letters[indexToSwap + 1]] = [letters[indexToSwap + 1], letters[indexToSwap]];
    
      return letters.join('');
    };
    
    const insertRandomLetter = (word) => {
      const letters = 'abcdefghijklmnopqrstuvwxyz'; 
      const randomIndex = Math.floor(Math.random() * (word.length + 1));
      const randomLetter = letters[Math.floor(Math.random() * letters.length)];
    
      return word.slice(0, randomIndex) + randomLetter + word.slice(randomIndex); 
    };
    
    const replaceWithSimilarSounding = (word) => {
      const soundAlikeMap = {
        'their': 'there',
        'theyre': 'there',
        'your': 'youre', 
        'too': 'to',
        'two': 'to', 
        'where': 'ware', 
        'stare': 'star',
      };
      return soundAlikeMap[word.toLowerCase()] || word;  
    };
    return (
      <div className="container">
          <h1>Autocorrect Madness</h1><h3><em>Beta</em></h3>
          <select value={autocorrectIntensity} onChange={(e) => setAutocorrectIntensity(e.target.value)}>
    <option value="low">Low</option>
    <option value="medium">Medium</option>
    <option value="high">High</option>
</select>
           <textarea value={userInput} onChange={handleInputChange} />
           <h2>Corrected Version:</h2>
           <p>{mangledText}</p>
      </div>
   ); 
  };




export default AutocorrectMadness;
