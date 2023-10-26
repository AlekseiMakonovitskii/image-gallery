import React from 'react';


const Image = ({ url, onClick }) => {
  


  return (
    <div className="imageContainer" onClick={onClick}>
      <img src={url} alt="image" className='img' loading='lazy'/>
    </div>
  );
};

export default Image;
