import React from 'react';
import PropTypes from 'prop-types';

function MotorcycleDetail({
  selectedMotorcycle,
  handleAddReservation,
  handleDelete,
}) {
  return (
    <div className="rigth-detail">
      <div>
        <h3>{selectedMotorcycle.model}</h3>
        <p>{selectedMotorcycle.description}</p>
      </div>
      <table className="table table-striped table-hover">
        <tbody>
          <tr>
            <td>Finance Fee</td>
            <td>{selectedMotorcycle.finance_fee}</td>
          </tr>
          <tr>
            <td>Option to purchase Fee</td>
            <td>{selectedMotorcycle.purchase_fee}</td>
          </tr>
          <tr>
            <td>Total amount payable</td>
            <td>{selectedMotorcycle.amount_payable}</td>
          </tr>
          <tr>
            <td>Duration</td>
            <td>{selectedMotorcycle.duration}</td>
          </tr>
        </tbody>
      </table>

      <div className="d-flex align-items-center justify-content-end">
        <span className="px-1 fw-bold">Discover more models</span>
        <i className="fa fa-chevron-right" />
      </div>

      <div className="show-actions mt-5">
        <button type="button" className="btn-action" onClick={handleDelete}>
          Delete
        </button>
        <button
          type="button"
          className="btn-action mt-3"
          onClick={handleAddReservation}
        >
          Add Reservation
        </button>
      </div>
    </div>
  );
}

MotorcycleDetail.propTypes = {
  selectedMotorcycle: PropTypes.shape({
    model: PropTypes.string,
    duration: PropTypes.oneOfType([
      PropTypes.string, PropTypes.number,
    ]).isRequired,
    description: PropTypes.string.isRequired,
    finance_fee: PropTypes.string.isRequired,
    amount_payable: PropTypes.string.isRequired,
    purchase_fee: PropTypes.string.isRequired,
  }).isRequired,
  handleAddReservation: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default MotorcycleDetail;
