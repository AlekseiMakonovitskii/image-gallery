import React, { useState } from 'react';


const Image = ({ url, onClick }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
  }

  return (
    <div className="imageContainer" onClick={onClick}>
   
      {!isLoaded && <div className="grayPlace"></div>}
      <img src={url} alt="#" className='img' loading='lazy' onLoad={handleLoad}/>
    </div>
  );
};

export default Image;
