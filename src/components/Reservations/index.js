import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getMyReservations } from '../../redux/actions/reservationActions';

export default function Reservations() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMyReservations());
  }, [dispatch]);
  return (
    <div className="px-3 py-5">
      <ul className="list-group">
        <li className="list-group-item disabled d-flex">
          <div>
            <span>Reservation name</span>
          </div>
          <div className="px-3">
            <span>Date</span>
          </div>
          <div>
            <span>City</span>
          </div>
        </li>
      </ul>
    </div>
  );
}
