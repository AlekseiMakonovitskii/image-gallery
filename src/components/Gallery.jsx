import React from 'react'
import Image from './Image';

const Gallery = ({pictures, loading, handleClickImage, layout}) => {
	const style = {
		columnCount: layout,
	}

	return (
		<section className='gallery' style={style}>

			{!loading && pictures.map(picture =>  <Image key={picture.urls.regular} url={picture.urls.regular} onClick={handleClickImage}/>)}
		</section>
	)
}

export default Gallery