import './reservationForm.css';
import { Dropdown, Modal, Button } from 'react-bootstrap';
import { useState } from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const motorcycle = {
  model: 'Vespa',
  description: 'The 2020 MT-03 does away with the previous generation’s inline twin in favor of a new inline twin with a 180-degree crank and built-in counterbalancers that are expected to produce over 50 crank HP and mid to high 40’s in torque at the crank. It also has Single shock; 7-step preload-adjustable, 4.9-in travel.',
};

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
  const [modalShow, setModalShow] = useState(false);
  const [selectedCity, setSelectedCity] = useState('City');
  const [reservationDate, setReservationDate] = useState(dayjs());
  const disabledDates = [
    new Date('2023-07-25'),
    new Date('2023-07-26'),
    new Date('2023-07-27'),
  ];

  const shouldDisableDate = (date) => (
    disabledDates.some((disabledDate) => date.$d.toDateString() === disabledDate.toDateString())
  );

  return (
    <div id="reservation-form">
      <img src="https://purepng.com/public/uploads/large/purepng.com-motorcyclemotorcyclemotorbikebikecycleracing-bike-1701527509998savsa.png" alt="pic" className="reservation-item" />
      <div className="container position-absolute d-flex flex-column justify-content-center align-items-center">
        <h1>{`Book a ${motorcycle.model}`}</h1>
        <span className="divide" />
        <p>{motorcycle.description}</p>
        <div className="mt-3 d-flex">
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic" className="form-btn">
              {selectedCity}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {cities.map((city, index) => (
                <Dropdown.Item key={`city-${index + 1}`}><button type="button" onClick={() => { setSelectedCity(city); console.log(city, selectedCity); }}>{city}</button></Dropdown.Item>
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
                    setReservationDate(date); console.log(date.$d.toDateString());
                  }}
                  onClose={() => { setModalShow(false); }}
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
