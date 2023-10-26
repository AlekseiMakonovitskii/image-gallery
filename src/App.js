import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Gallery from './components/Gallery';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';
import { RotatingLines } from 'react-loader-spinner';
import ModalWindow from './components/ModalWindow';

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
  })

  const getPictures = async () => {
    try {
      const response = await axios.get('https://api.unsplash.com/photos', {
        params: {
          client_id: 'Wt8G3mfW7bZZDMS_DjKxcac12lCEgrz7P-16ueRRBLI',
          // Add any additional parameters as needed
          page: page,
          per_page: 10,
        },
      });
      

      setPictures(prev => [...prev, ...response.data]);

      setTimeout(() => {
        setLoading(false);
        setIsCarousel({
          minIndex: 0,
          maxIndex: response.data.length - 1,
        });
      }, 500)
     
    } catch (error) {
      console.error('Error fetching images from Unsplash:', error);
    }
  };

  useEffect(() => {
    console.log('inView');
    if (inView && !loading) {
      setPage(prev => prev + 1);
    }
  }, [inView]);

  useEffect(() => {
    
      getPictures();
      console.log('uploaded');
    
  }, [page]);

  const handleClickImage = (e) => {
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

    e.preventDefault();
    setIsModal(prev => !prev);
  }

  const imageBack = () => {
    const currentIndex = pictures.findIndex(el => el === isTarget);
    console.log(currentIndex);
    if (currentIndex > isCarousel.minIndex) {
      setIsTarget(pictures[currentIndex - 1]);
    }
   
  }

  const imageNext = () => {
    const currentIndex = pictures.findIndex(el => el === isTarget);
    console.log(currentIndex);
    if (currentIndex < isCarousel.maxIndex) {
      setIsTarget(pictures[currentIndex + 1]);
    } 
  }

  return (
    <div className="app">
      <Header />
      {!loading && <Gallery pictures={pictures} handleClickImage={handleClickImage}/>}
      <footer ref={ref}></footer>


      {isModal && <ModalWindow onClick={handleClickImage} isTarget={isTarget} imageBack={imageBack} imageNext={imageNext}/>}

      {loading && <div className="loader">
        <RotatingLines
          strokeColor="grey"
          strokeWidth="5"
          animationDuration="0.75"
          width="96"
          visible={true}
        />
      </div>}
    </div>
  );
};

export default App;
