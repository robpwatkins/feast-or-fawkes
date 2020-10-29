import React, { useState } from 'react';
import { wordGetter } from '../wordGetter';

const Tester = () => {
  const [word, setWord] = useState(null);

  const handleClick = () => {
    wordGetter();
    // const API_KEY = process.env.REACT_APP_API_KEY
    // fetch("https://wordsapiv1.p.rapidapi.com/words/?random=true", {
    //   "method": "GET",
    //   "headers": {
    //     "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
    //     "x-rapidapi-key": `${API_KEY}`
    //   }
    // })
    // .then(response => response.json())
    // .then(data => {
    //   console.log(data.frequency);
    //   if (data.frequency && data.frequency > 5) {
    //     setWord(data.word)
    //   }
    // })
    // .catch(err => {
    //   console.log(err);
    // });
  }

  return (
    <div>
      <button onClick={handleClick}>CLICK ME!</button>
      <h3>{word}</h3>
    </div>
  )
}

export default Tester;