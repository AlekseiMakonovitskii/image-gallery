import React from 'react'
import Image from './Image';

const Gallery = ({pictures, loading, handleClickImage}) => {
	return (
		<section className='gallery'>

			{!loading && pictures.map(picture =>  <Image key={picture.urls.regular} url={picture.urls.regular} onClick={handleClickImage}/>)}
		</section>
	)
}

export default Gallery