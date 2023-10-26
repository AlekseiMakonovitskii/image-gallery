import React from 'react'
import emoji from '../assets/8.png'

const Header = () => {
	return (
		<header className='header'>
			<h1>image gallery <img src={emoji} alt="" className='emoji'/></h1>
			<h3>Capturing Moments, Creating Memories: Your Visual Story Unveiled!</h3>
		</header>
	)
}

export default Header