import React, {useRef} from 'react'
import { FaLongArrowAltLeft } from 'react-icons/fa';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { HiOutlineDownload } from 'react-icons/hi';

const ModalWindow = ({onClick, isTarget, imageBack, imageNext}) => {
	
	console.log(isTarget);

	return (
		<div className='modalWindow'>
			<div className="content">
				<img src={isTarget.urls.regular} alt="" />
				<div className="modalNavigation">
					<a onClick={imageBack}><FaLongArrowAltLeft/></a>
					<a download href={isTarget.links.download} target='_blank'><HiOutlineDownload/></a>
					<a onClick={imageNext}><FaLongArrowAltRight/></a>
				</div>
			</div>
			<div className="closePort" onClick={onClick}></div>
		</div>
	)
}

export default ModalWindow