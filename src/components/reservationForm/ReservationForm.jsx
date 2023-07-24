import './reservationForm.css';
import { Dropdown, Modal, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import { LocalizationProvider, StaticDatePicker, MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useNavigate } from 'react-router-dom';
import { getMotorcycle, getMotorcycles } from '../../redux/actions/motorcycleActions';
import { BASE_URL } from '../../constants';
import { createReservation, getMyReservations } from '../../redux/actions/reservationActions';

const cities = ['Lagos', 'Abuja', 'Ibadan', 'Kano', 'Port Harcourt', 'Benin City', 'Kaduna', 'Enugu', 'Calabar', 'Owerri'];

function ReservationForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { motorcycles } = useSelector((state) => state.motorcycles);
  const { reservations } = useSelector((store) => store.reservations);
  const { selectedMotorcycle } = useSelector((store) => store.motorcycles);
  const [motorcycle, setMotorcycle] = useState('');
  const [motorcycleChange, setMotorcycleChange] = useState(false);
  const [selectedCity, setSelectedCity] = useState('');
  const [reservationDate, setReservationDate] = useState(dayjs());
  const [modalShow, setModalShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(getMotorcycles());
    dispatch(getMyReservations());
    return () => {
      dispatch(getMotorcycle(''));
    };
  }, [dispatch]);

  useEffect(() => {
    if (selectedMotorcycle) {
      setMotorcycle(selectedMotorcycle);
      setMotorcycleChange(true);
    }
  }, [selectedMotorcycle]);

  const handleMotorcycleSelect = async (moto) => {
    if (moto !== motorcycle) setMotorcycleChange(false);
    setMotorcycle(moto);
    setTimeout(() => { setMotorcycleChange(true); }, 1);
  };

  const disabledDates = () => {
    if (reservations) {
      return reservations.filter((res) => res.motorcycle_id === motorcycle.id)
        .map((i) => new Date(i.date));
    }
    return [];
  };

  const shouldDisableDate = (date) => (
    disabledDates().some((disabledDate) => date.$d.toDateString() === disabledDate.toDateString())
  );

  const handleSubmit = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('reservation[motorcycle_id]', motorcycle.id);
    formData.append('reservation[city]', selectedCity);
    formData.append('reservation[date]', reservationDate.format('YYYY-MM-DD'));
    const isSuccess = await dispatch(createReservation(formData));
    setIsLoading(false);
    if (isSuccess.meta.requestStatus === 'fulfilled') { navigate('/reservations'); }
  };

  return (
    <div id="reservation-form" className="flex-center">
      {!motorcycle.photo && (<img src="https://www.onlygfx.com/wp-content/uploads/2017/03/motorcycle-silhouette-5-1024x604.png" alt="pic" className="reservation-item" />)}
      {motorcycle.photo && (<img src={BASE_URL + motorcycle.photo.url} alt="pic" className={`reservation-item ${motorcycleChange ? 'slide-in' : 'hide-image'}`} />)}
      <div className="container position-absolute flex-center flex-column overflow-auto">
        <h1>{motorcycle.model ? `Book a ${motorcycle.model}` : 'Book a motorcycle'}</h1>
        <span className="divide" />
        <p>{motorcycle.description}</p>
        <div className="container d-flex flex-column flex-lg-row justify-content-center align-conent-center mt-3 d">
          <Dropdown>
            <Dropdown.Toggle variant="success" className="dropdown-basic form-btn">
              {motorcycle.model || 'Motorcycle'}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {!motorcycles.length && (
                <Dropdown.Item disabled className="text-center">No motorcycles available</Dropdown.Item>
              )}
              {motorcycles.map((motorcycle, index) => (
                <Dropdown.Item key={`motorcycle-${index + 1}`}><button type="button" onClick={() => { handleMotorcycleSelect(motorcycle); }}>{motorcycle.model}</button></Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown>
            <Dropdown.Toggle variant="success" className="dropdown-basic form-btn">
              {selectedCity || 'City'}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {cities.map((city, index) => (
                <Dropdown.Item key={`city-${index + 1}`}><button type="button" onClick={() => { setSelectedCity(city); }}>{city}</button></Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          <Button id="book" disabled={!motorcycle || !selectedCity} onClick={() => setModalShow(true)} className="form-btn mx-auto mx-lg-3">
            Book Now
          </Button>
          <Modal show={modalShow} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Body>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StaticDatePicker
                  className="d-none d-md-grid"
                  label="Select date"
                  disablePast
                  value={reservationDate}
                  onChange={(date) => setReservationDate(date)}
                  onAccept={() => handleSubmit()}
                  onClose={() => { if (!isLoading) setModalShow(false); }}
                  shouldDisableDate={shouldDisableDate}
                />
                <MobileDatePicker
                  className="d-md-none my-3"
                  label="Select date"
                  value={reservationDate}
                  onChange={(date) => setReservationDate(date)}
                  onAccept={() => handleSubmit()}
                  onClose={() => { if (!isLoading) setModalShow(false); }}
                  shouldDisableDate={shouldDisableDate}
                />
              </LocalizationProvider>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default ReservationForm;
