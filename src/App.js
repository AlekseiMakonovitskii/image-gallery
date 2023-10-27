import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Gallery from './components/Gallery';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';
import { RotatingLines } from 'react-loader-spinner';
import ModalWindow from './components/ModalWindow';
import { FaLongArrowAltUp } from 'react-icons/fa';
import sadFace from './assets/11.png';

const App = () => {
  const [pictures, setPictures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ref, inView] = useInView({
    triggerOnce: false,
  });
  const [page, setPage] = useState(1);
  const [isModal, setIsModal] = useState(false);
  const [isTarget, setIsTarget] = useState({});
  const [isScroll, setIsScroll] = useState(true);
  const [isCarousel, setIsCarousel] = useState({
    minIndex: 0,
    maxIndex: pictures.length - 1,
  });
  const [isError, setIsError] = useState(false)

  // fetch data
  const getPictures = async () => {
    try {
      // get data
      const response = await axios.get('https://api.unsplash.com/photos', {
        params: {
          client_id: process.env.REACT_APP_API_KEY,
          page: page,
          per_page: 10,
        },
      });

      // filter response to unique pictures
      const uniquePictures = response.data.filter(newPic => {
        return !pictures.some(oldPic => oldPic.id === newPic.id);
      });

      // set pictures to state
      setPictures(prev => [...prev, ...uniquePictures]);
    } catch (error) {
      setIsError(true);
      console.error('Error fetching images from Unsplash:', error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }

   
  };

  // intersection observer logic
  useEffect(() => {
    if (inView && !loading) {
      setPage(prev => prev + 1);
    }
  }, [inView, loading]);

  useEffect(() => {
    getPictures();
  }, [page]);

  // Open image in modal window
  const handleClickImage = e => {
    if (isScroll) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    setIsScroll(prev => !prev);

    if (e.target.src) {
      const element = pictures.find(el => el.urls.regular === e.target.src);
      setIsTarget(element);
    }

    setIsCarousel({
      minIndex: 0,
      maxIndex: pictures.length - 1,
    });

    e.preventDefault();
    setIsModal(prev => !prev);
  };

  // Image carousel
  const imageBack = () => {
    const currentIndex = pictures.findIndex(el => el === isTarget);

    if (currentIndex > isCarousel.minIndex) {
      setIsTarget(pictures[currentIndex - 1]);
    } else {
      setIsTarget(pictures[pictures.length - 1]);
    }
  };

  const imageNext = () => {
    const currentIndex = pictures.findIndex(el => el === isTarget);

    if (currentIndex < isCarousel.maxIndex) {
      setIsTarget(pictures[currentIndex + 1]);
    } else {
      setIsTarget(pictures[0]);
    }
  };

  // Scroll to top
  const toTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="app">
      <Header />
      {!loading && (
        <Gallery pictures={pictures} handleClickImage={handleClickImage} />
      )}
      <footer ref={ref}></footer>

      {isModal && (
        <ModalWindow
          onClick={handleClickImage}
          isTarget={isTarget}
          imageBack={imageBack}
          imageNext={imageNext}
        />
      )}

      {loading && (
        <div className="loader">
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        </div>
      )}

      {!isModal && (
        <a className="upBtn" onClick={toTop}>
          <FaLongArrowAltUp />
        </a>
      )}

      {isError && !loading && <div className='error'>Ooops, something went wrong <img src={sadFace} alt="" className='emoji'/></div>}
    </div>
  );
};

export default App;
