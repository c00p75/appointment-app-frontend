/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import bikes from './loaderImages';
import './loader.css';
import { getMotorcycles } from '../../redux/actions/motorcycleActions';

const Loader = () => {
  const [loading, setLoading] = useState(true);
  const [phaseOut, setPhaseOut] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      const isSuccess = await dispatch(getMotorcycles());
      if (isSuccess.meta.requestStatus) {
        setPhaseOut(true);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    }
    fetchData();
  }, [dispatch]);

  if (loading) {
    return (
      <>
        <div id="app-loader-overlay" className={phaseOut ? 'phase-out' : ''}>
          <div className="overlay-text">
            CycleCruise
            <div className="loader-bar" />
          </div>
        </div>
        <div id="app-loader" className={phaseOut ? 'phase-out' : ''}>
          <div className="flip-card">
            <div className="flip-card-inner toggle-flip-card">
              <div className="flip-card-front" />
              <div className="flip-card-back">
                <img src={bikes.moto} alt="motorcycle" />
              </div>
            </div>
          </div>
          <div className="flip-card">
            <div className="flip-card-inner toggle-flip-card">
              <div className="flip-card-front" />
              <div className="flip-card-back">
                <img src={bikes.moto1} alt="motorcycle" />
              </div>
            </div>
          </div>
          <div className="flip-card">
            <div className="flip-card-inner toggle-flip-card">
              <div className="flip-card-front" />
              <div className="flip-card-back">
                <img src={bikes.moto2} alt="motorcycle" />
              </div>
            </div>
          </div>
          <div className="flip-card">
            <div className="flip-card-inner toggle-flip-card">
              <div className="flip-card-front" />
              <div className="flip-card-back">
                <img src={bikes.moto3} alt="motorcycle" />
              </div>
            </div>
          </div>
          <div className="flip-card">
            <div className="flip-card-inner toggle-flip-card">
              <div className="flip-card-front" />
              <div className="flip-card-back">
                <img src={bikes.moto4} alt="motorcycle" />
              </div>
            </div>
          </div>
          <div className="flip-card">
            <div className="flip-card-inner toggle-flip-card">
              <div className="flip-card-front" />
              <div className="flip-card-back">
                <img src={bikes.moto5} alt="motorcycle" />
              </div>
            </div>
          </div>
          <div className="flip-card">
            <div className="flip-card-inner toggle-flip-card">
              <div className="flip-card-front" />
              <div className="flip-card-back">
                <img src={bikes.moto6} alt="motorcycle" />
              </div>
            </div>
          </div>
          <div className="flip-card">
            <div className="flip-card-inner toggle-flip-card">
              <div className="flip-card-front" />
              <div className="flip-card-back">
                <img src={bikes.moto7} alt="motorcycle" />
              </div>
            </div>
          </div>
          <div className="flip-card">
            <div className="flip-card-inner toggle-flip-card">
              <div className="flip-card-front" />
              <div className="flip-card-back">
                <img src={bikes.moto8} alt="motorcycle" />
              </div>
            </div>
          </div>
          <div className="flip-card">
            <div className="flip-card-inner toggle-flip-card">
              <div className="flip-card-front" />
              <div className="flip-card-back">
                <img src={bikes.moto9} alt="motorcycle" />
              </div>
            </div>
          </div>
          <div className="flip-card">
            <div className="flip-card-inner toggle-flip-card">
              <div className="flip-card-front" />
              <div className="flip-card-back">
                <img src={bikes.moto10} alt="motorcycle" />
              </div>
            </div>
          </div>
          <div className="flip-card">
            <div className="flip-card-inner toggle-flip-card">
              <div className="flip-card-front" />
              <div className="flip-card-back">
                <img src={bikes.moto11} alt="motorcycle" />
              </div>
            </div>
          </div>
          <div className="flip-card">
            <div className="flip-card-inner toggle-flip-card">
              <div className="flip-card-front" />
              <div className="flip-card-back">
                <img src={bikes.moto12} alt="motorcycle" />
              </div>
            </div>
          </div>
          <div className="flip-card">
            <div className="flip-card-inner toggle-flip-card">
              <div className="flip-card-front" />
              <div className="flip-card-back">
                <img src={bikes.moto13} alt="motorcycle" />
              </div>
            </div>
          </div>
          <div className="flip-card">
            <div className="flip-card-inner toggle-flip-card">
              <div className="flip-card-front" />
              <div className="flip-card-back">
                <img src={bikes.moto14} alt="motorcycle" />
              </div>
            </div>
          </div>
          <div className="flip-card">
            <div className="flip-card-inner toggle-flip-card">
              <div className="flip-card-front" />
              <div className="flip-card-back">
                <img src={bikes.moto15} alt="motorcycle" />
              </div>
            </div>
          </div>
          <div className="flip-card">
            <div className="flip-card-inner toggle-flip-card">
              <div className="flip-card-front" />
              <div className="flip-card-back">
                <img src={bikes.moto16} alt="motorcycle" />
              </div>
            </div>
          </div>
          <div className="flip-card">
            <div className="flip-card-inner toggle-flip-card">
              <div className="flip-card-front" />
              <div className="flip-card-back">
                <img src={bikes.moto17} alt="motorcycle" />
              </div>
            </div>
          </div>
          <div className="flip-card">
            <div className="flip-card-inner toggle-flip-card">
              <div className="flip-card-front" />
              <div className="flip-card-back">
                <img src={bikes.moto18} alt="motorcycle" />
              </div>
            </div>
          </div>
          <div className="flip-card">
            <div className="flip-card-inner toggle-flip-card">
              <div className="flip-card-front" />
              <div className="flip-card-back">
                <img src={bikes.moto19} alt="motorcycle" />
              </div>
            </div>
          </div>
          <div className="flip-card">
            <div className="flip-card-inner toggle-flip-card">
              <div className="flip-card-front" />
              <div className="flip-card-back">
                <img src={bikes.moto20} alt="motorcycle" />
              </div>
            </div>
          </div>
          <div className="flip-card">
            <div className="flip-card-inner toggle-flip-card">
              <div className="flip-card-front" />
              <div className="flip-card-back">
                <img src={bikes.moto21} alt="motorcycle" />
              </div>
            </div>
          </div>
          <div className="flip-card">
            <div className="flip-card-inner toggle-flip-card">
              <div className="flip-card-front" />
              <div className="flip-card-back">
                <img src={bikes.moto22} alt="motorcycle" />
              </div>
            </div>
          </div>
          <div className="flip-card">
            <div className="flip-card-inner toggle-flip-card">
              <div className="flip-card-front" />
              <div className="flip-card-back">
                <img src={bikes.moto23} alt="motorcycle" />
              </div>
            </div>
          </div>
          <div className="flip-card">
            <div className="flip-card-inner toggle-flip-card">
              <div className="flip-card-front" />
              <div className="flip-card-back">
                <img src={bikes.moto24} alt="motorcycle" />
              </div>
            </div>
          </div>
        </div>

      </>
    );
  }
  return null;
};

export default Loader;
