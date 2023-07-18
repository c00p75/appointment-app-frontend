import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import { getMotorcycles } from '../redux/actions/motorcycleActions';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import './styles/motorcycles.css';
import vespaImage from '../assets/images/vespa_gts_touring_300.jpg';
import facebook from '../assets/images/facebook.png';
import twitter from '../assets/images/twitter.png';
import instagram from '../assets/images/instagram.png';

function Motorcycles() {
  const { motorcycles } = useSelector((state) => state.motorcycles);
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  useEffect(() => {
    dispatch(getMotorcycles());
  }, [dispatch]);

  return (
    <div className="d-flex flex-column main-container pt-5">
      <h1 className="text-center fw-bold fs-12">LATEST MODELS</h1>
      <p className="text-center text-secondary">Please select a Vespa Model</p>
      <Carousel
        showArrows
        showStatus={false}
        showThumbs={false}
        infiniteLoop
        // centerMode
        // centerSlidePercentage={75}
        emulateTouch
      >
        {motorcycles.map((motorcycle) => (
          <div key={motorcycle.id} className="d-flex flex-column justify-content-center align-items-center btn moto-card">
            <Link to={`/motorcycles/${motorcycle.id}`} style={{ textDecoration: 'none', color: 'black' }}>
              <img src={vespaImage} alt={motorcycle.model} className="moto-photo" />
              <h3 className="fs-1">{motorcycle.model}</h3>
              <p className="fs-6 text-secondary">{motorcycle.description}</p>
            </Link>
            <div className="d-flex flex-row gap-4">
              <a href="https://www.facebook.com">
                <img src={facebook} alt={motorcycle.model} className="social" />
              </a>
              <a href="https://www.twitter.com">
                <img src={twitter} alt={motorcycle.model} className="social" />
              </a>
              <a href="https://www.instagram.com">
                <img src={instagram} alt={motorcycle.model} className="social" />
              </a>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default Motorcycles;
