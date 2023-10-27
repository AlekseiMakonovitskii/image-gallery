import React from 'react'
import emoji from '../assets/8.png'
import { MdDarkMode } from 'react-icons/md';
import { MdOutlineDarkMode } from 'react-icons/md';

import { TfiLayoutGrid3 } from 'react-icons/tfi';

const Header = ({isDark, setIsDark, handleLayout}) => {
	const handleDarkMode = () => {
		setIsDark(prev => !prev);
	}

	return (
		<header className='header'>
			<h1 className={`${isDark && 'h1Dark'}`}>image gallery <img src={emoji} alt="" className='emoji'/></h1>
			<h3 className={`${isDark && 'h3Dark'}`}>Capturing Moments, Creating Memories: Your Visual Story Unveiled!</h3>
			<nav className="nav">
				<a onClick={handleLayout} className={`layoutBtn ${isDark && 'modeSwitchDark'}`}><TfiLayoutGrid3/></a>
				<a onClick={handleDarkMode} className={`${isDark && 'modeSwitchDark'}`}>{isDark ? <MdOutlineDarkMode/> : <MdDarkMode/>}</a>
			</nav>
		</header>
	)
}

export default Header