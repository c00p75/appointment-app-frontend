import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyReservations } from '../../redux/actions/reservationActions';

export default function Reservations() {
  const dispatch = useDispatch();
  const { reservations } = useSelector((store) => store.reservations);
  useEffect(() => {
    dispatch(getMyReservations());
  }, [dispatch]);
  return (
    <div className="px-3 py-5">
      <h4>My Reservations</h4>
      {reservations.length === 0 && (
        <div className="py-5 text-center w-100">Your reservations for motorcycles shall appear here</div>
      )}
      {reservations.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Motorcycle</th>
              <th scope="col">City</th>
              <th scope="col">Date</th>
              <th scope="col">Reserve Id</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation, index) => (
              <tr key={reservation.id}>
                <th scope="row">{index + 1}</th>
                <td>{reservation.motorcycle.model}</td>
                <td>{reservation.city}</td>
                <td>{reservation.date}</td>
                <th>{reservation.id}</th>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
