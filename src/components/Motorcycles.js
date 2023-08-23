import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import { getMotorcycles } from '../redux/actions/motorcycleActions';
import { selectMotorcycle } from '../redux/reducers/motorcyclesSlice';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import './styles/motorcycles.css';
import facebook from '../assets/images/facebook.png';
import twitter from '../assets/images/twitter.png';
import instagram from '../assets/images/instagram.png';

const Motorcycles = () => {
  const { motorcycles } = useSelector((state) => state.motorcycles);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [centerSlidePercentage, setCenterSlidePercentage] = useState(100);

  useEffect(() => {
    dispatch(getMotorcycles());
  }, [dispatch]);

  const handleShowDetail = (id) => {
    dispatch(selectMotorcycle(id));
    navigate(`/motorcycles/${id}`);
  };

  useEffect(() => {
    const getCenterSlidePercentage = () => {
      const numMotorcycles = motorcycles.length;
      return window.innerWidth >= 992
        ? Math.max(100 / numMotorcycles, 33)
        : 100;
    };

    const handleResize = () => {
      setCenterSlidePercentage(getCenterSlidePercentage());
    };

    window.addEventListener('resize', handleResize);

    // Set the initial centerSlidePercentage on mount
    setCenterSlidePercentage(getCenterSlidePercentage());

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [motorcycles]);

  return (
    <div className="d-flex flex-column main-container pt-5">
      <h1 className="text-center fw-bold fs-12">LATEST MODELS</h1>
      <p className="text-center text-secondary">Please select a Vespa Model</p>
      {(!Array.isArray(motorcycles) || !motorcycles.length) && (
        <p style={{ margin: 'auto' }}>No Motorcycles Added Yet.</p>
      )}

      {Array.isArray(motorcycles) && motorcycles.length > 0 && (
        <Carousel
          showArrows
          showStatus={false}
          showThumbs={false}
          infiniteLoop={false} // Disable infinite loop
          centerMode
          centerSlidePercentage={centerSlidePercentage}
          emulateTouch
          stopOnHover // Stop the automatic sliding when hovering over the carousel
          selectedItem={0} // Ensures the first slide is initially centered
          renderThumbs={() => null} // Hide the thumbnail navigation
        >
          {motorcycles.map((motorcycle) => (
            <button
              type="button"
              key={motorcycle.id}
              onClick={() => handleShowDetail(motorcycle.id)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') handleShowDetail(motorcycle.id);
              }}
              className="border-0 d-flex flex-column justify-content-between align-items-center bg-transparent btn h-100"
            >
              <div>
                <img
                  src={motorcycle.photo.url}
                  alt={motorcycle.model}
                  className="moto-photo"
                />
              </div>
              <div
                className="d-flex flex-column justify-content-end align-items-center my-0"
                style={{ height: '15rem' }}
              >
                <h3 className="fs-1">{motorcycle.model}</h3>
                <p className="fs-6 text-secondary" style={{ height: '4rem' }}>
                  {motorcycle.description}
                </p>
                <div className="d-flex flex-row gap-4">
                  <a href="https://www.facebook.com">
                    <img
                      src={facebook}
                      alt={motorcycle.model}
                      className="social"
                    />
                  </a>
                  <a href="https://www.twitter.com">
                    <img
                      src={twitter}
                      alt={motorcycle.model}
                      className="social"
                    />
                  </a>
                  <a href="https://www.instagram.com">
                    <img
                      src={instagram}
                      alt={motorcycle.model}
                      className="social"
                    />
                  </a>
                </div>
              </div>
            </button>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default Motorcycles;
