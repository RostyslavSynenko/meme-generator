import React, { useState, useEffect } from 'react';

import './MemeGenerator.css';

const MemeGenerator = () => {
  const [fields, setText] = useState({
    topText: '',
    bottomText: ''
  });
  const [randomImage, setRandomImage] = useState(
    'http://i.imgflip.com/1bij.jpg'
  );
  const [memes, setMemes] = useState([]);

  const handleChange = event => {
    const { name, value } = event.target;

    setText({ ...fields, [name]: value });
  };

  const generateMeme = event => {
    event.preventDefault();

    const randomIndex = Math.floor(
      Math.random() * memes.length
    );
    const randomUrl = memes[randomIndex].url;

    setRandomImage(randomUrl);
  };

  const getMemes = async () => {
    const response = await fetch(
      'https://api.imgflip.com/get_memes'
    );
    const { data } = await response.json();
    const { memes } = data;

    setMemes(memes);
  };

  useEffect(() => {
    getMemes();
  }, []);

  return (
    <div>
      <form className="meme-form" onSubmit={generateMeme}>
        <input
          type="text"
          name="topText"
          value={fields.topText}
          placeholder="Top text"
          onChange={handleChange}
        />
        <input
          type="text"
          name="bottomText"
          value={fields.bottomText}
          placeholder="Bottom text"
          onChange={handleChange}
        />
        <button>Gen</button>
      </form>
      <div className="meme">
        <img src={randomImage} alt="meme" />
        <h2 className="top">{fields.topText}</h2>
        <h2 className="bottom">{fields.bottomText}</h2>
      </div>
    </div>
  );
};

export default MemeGenerator;
