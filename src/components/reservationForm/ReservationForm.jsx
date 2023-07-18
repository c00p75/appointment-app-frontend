import './reservationForm.css';
import { Dropdown, Modal, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import { LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useNavigate } from 'react-router-dom';
import { getMotorcycles } from '../../redux/actions/motorcycleActions';
import { BASE_URL } from '../../constants';
import { createReservation } from '../../redux/actions/reservationActions';

const cities = [
  'Lagos',
  'Abuja',
  'Ibadan',
  'Kano',
  'Port Harcourt',
  'Benin City',
  'Kaduna',
  'Enugu',
  'Calabar',
  'Owerri',
];

function ReservationForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getMotorcycles());
  }, [dispatch]);

  const { motorcycles } = useSelector((state) => state.motorcycles);
  const [motorcycle, setMotorcycle] = useState('');
  const [selectedCity, setSelectedCity] = useState('City');
  const [reservationDate, setReservationDate] = useState(dayjs());
  const [modalShow, setModalShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const disabledDates = [
    new Date('2023-07-25'),
    new Date('2023-07-26'),
    new Date('2023-07-27'),
  ];

  const shouldDisableDate = (date) => (
    disabledDates.some((disabledDate) => date.$d.toDateString() === disabledDate.toDateString())
  );

  const handleSubmit = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('reservation[motorcycle_id]', motorcycle.id);
    formData.append('reservation[city]', selectedCity);
    formData.append('reservation[date]', reservationDate.format('YYYY-MM-DD'));
    const isSuccess = await dispatch(createReservation(formData));
    setIsLoading(false);
    if (isSuccess.meta.requestStatus === 'fulfilled') { navigate('/motorcycles'); }
  };

  return (
    <div id="reservation-form">
      {!motorcycle.photo && (<img src="https://www.onlygfx.com/wp-content/uploads/2017/03/motorcycle-silhouette-5-1024x604.png" alt="pic" className="reservation-item" />)}
      {motorcycle.photo && (<img src={BASE_URL + motorcycle.photo.url} alt="pic" className="reservation-item" />)}
      <div className="container position-absolute d-flex flex-column justify-content-center align-items-center">
        <h1>{motorcycle.model ? `Book a ${motorcycle.model}` : 'Book a motorcycle'}</h1>
        <span className="divide" />
        <p>{motorcycle.description}</p>
        <div className="mt-3 d-flex">
          <Dropdown>
            <Dropdown.Toggle variant="success" className="dropdown-basic form-btn">
              {motorcycle.description ? motorcycle.description : 'Motorcycle'}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {!motorcycles.length && (
                <Dropdown.Item disabled>No motorcycles available</Dropdown.Item>
              )}
              {motorcycles.map((motorcycle, index) => (
                <Dropdown.Item key={`motorcycle-${index + 1}`}><button type="button" onClick={() => { setMotorcycle(motorcycle); }}>{motorcycle.model}</button></Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown>
            <Dropdown.Toggle variant="success" className="dropdown-basic form-btn">
              {selectedCity}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {cities.map((city, index) => (
                <Dropdown.Item key={`city-${index + 1}`}><button type="button" onClick={() => { setSelectedCity(city); }}>{city}</button></Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <ul className="dropdown-menu">
            <li className="dropdown-item">Action</li>
            <li className="dropdown-item">Another action</li>
            <li className="dropdown-item">Something else here</li>
          </ul>

          <Button id="book" onClick={() => setModalShow(true)} className="form-btn">
            Book Now
          </Button>
          <Modal
            show={modalShow}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Body>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StaticDatePicker
                  label="Select date"
                  value={reservationDate}
                  onAccept={(date) => {
                    setReservationDate(date);
                    handleSubmit();
                  }}
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