export default function ReserveForm() {
  return (
    <div className="reserve-form  position-relative container-fluid bg-success d-flex align-items-center justify-content-center">
      <div className="nav-bar d-flex justify-content-between position-absolute p-3 text-white">
        <div>
          <i className="fa fa-align-justify" />
        </div>
        <div>
          <i className="fa fa-search" />
        </div>
      </div>
      <div className="vespa-form text-center text-white">
        <div>
          <h4>BOOK A VESPA TEST - DRIVE</h4>
          <hr />
          <p>
            There are 34 different versions of the the Vespa. Today five series
            are in production: the classic manual transmission PX and the
            mordern CVT transmission S, LX, GT, and GTS. We have showrooms all
            over he globe which include test0riding facilities. IF you wish to
            find out if a test ride is available in your area, please use the
            selector below
          </p>
          <div className="d-flex align-items-center justify-content-center">
            <select
              className="form-select form-select bg-transparent text-white me-3 px-4"
              aria-label=".form-select-lg example"
            >
              <option defaultValue="">Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
            <button
              type="submit"
              className="btn bg-white border-white px-5 text-success"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
