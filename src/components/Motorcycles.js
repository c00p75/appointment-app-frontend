import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import { getMotorcycles } from '../redux/actions/motorcycleActions';
import { selectMotorcycle } from '../redux/reducers/motorcyclesSlice';

import 'react-responsive-carousel/lib/styles/carousel.min.css';

import './styles/motorcycles.css';
import vespaImage from '../assets/images/vespa_gts_touring_300.jpg';
import facebook from '../assets/images/facebook.png';
import twitter from '../assets/images/twitter.png';
import instagram from '../assets/images/instagram.png';

function Motorcycles() {
  const { motorcycles } = useSelector((state) => state.motorcycles);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getMotorcycles());
  }, [dispatch]);

  const handleShowDetail = (id) => {
    dispatch(selectMotorcycle(id));
    navigate(`/motorcycles/${id}`);
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: '100vh' }}>
      <div className="text-center">
        <h1 className=" fw-bold fs-12">LATEST MODELS</h1>
        <p className="text-secondary fw-bold">Please select a Vespa Model</p>
        <Carousel
          showArrows
          showStatus={false}
          showThumbs={false}
          infiniteLoop
          centerMode
          centerSlidePercentage={50}
          emulateTouch
          className="vertical-carousel"
        >
          {motorcycles.map((motorcycle) => (
            <div key={motorcycle.id} className="d-flex flex-column align-items-center justify-content-center">
              <img src={vespaImage} alt={motorcycle.model} className="moto-photo" />
              <h3>{motorcycle.model}</h3>
              <p>{motorcycle.description}</p>
              <div className="d-flex flex-row w-60 justify-content-between">
                <img src={facebook} alt={motorcycle.model} className="social mx-2" />
                <img src={twitter} alt={motorcycle.model} className="social mx-2" />
                <img src={instagram} alt={motorcycle.model} className="social mx-2" />
              </div>
            </div>
          ))}
        </Carousel>
      </div>
      <Link to="/motorcycles/new" className="mt-5">Add New Motorcycle</Link>
    </div>
  );
}

export default Motorcycles;
