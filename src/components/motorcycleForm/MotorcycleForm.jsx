import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './motorcycleForm.css';
import {
  FloatingLabel,
  Form,
  InputGroup,
  Button,
  Row,
  Col,
  Toast,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { createMotorcycle } from '../../redux/actions/motorcycleActions';
import { isLoggedIn } from '../../services/users.services';

function MotorcycleForm() {
  const [model, setModel] = useState(null);
  const [description, setDescription] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [duration, setDuration] = useState(1);
  const [financeFee, setFinanceFee] = useState(0);
  const [purchaseFee, setPurchaseFee] = useState(0);
  const [amountPayable, setAmountPayable] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const responseError = useSelector((state) => state.motorcycles.error);
  const [error, setError] = useState(!isLoggedIn());

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    setIsLoading(true);
    const formData = new FormData();
    formData.append('motorcycle[model]', model);
    formData.append('motorcycle[description]', description);
    formData.append('motorcycle[duration]', duration);
    formData.append('motorcycle[finance_fee]', financeFee);
    formData.append('motorcycle[purchase_fee]', purchaseFee);
    formData.append('motorcycle[amount_payable]', amountPayable);
    formData.append('motorcycle[photo]', photo);
    const isSuccess = await dispatch(createMotorcycle(formData));
    if (responseError) {
      setError(true);
    }
    if (isSuccess.meta.requestStatus === 'fulfilled') {
      navigate('/motorcycles');
    }
    setIsLoading(false);
  };

  return (
    <div className="bg-success-subtle p-sm-5 pt-5">
      <h1 className="text-center mb-3 form-header">Add Motorcycle</h1>
      <div className="m-auto bg-white p-3 overflow-auto" id="motorcycle-form">
        <Form onSubmit={(e) => handleSubmit(e)}>
          <FloatingLabel
            controlId="floatingTextarea"
            label="Model"
            className="py-3"
          >
            <Form.Control
              placeholder="Model"
              required
              onChange={(e) => setModel(e.target.value)}
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingTextarea2"
            label="Description"
            className="py-3"
          >
            <Form.Control
              as="textarea"
              placeholder="Description"
              required
              style={{ height: '100px' }}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="formImg"
            label="Upload Image"
            className="mb-2 py-3"
          >
            <Form.Control
              type="file"
              accept="image/*"
              required
              onChange={(e) => setPhoto(e.target.files[0])}
            />
          </FloatingLabel>

          <InputGroup className="mb-4">
            <InputGroup.Text>Days</InputGroup.Text>
            <FloatingLabel controlId="floatingAmount3" label="Duration">
              <Form.Control
                type="number"
                required
                aria-label="Duration"
                onChange={(e) => setDuration(e.target.value)}
              />
            </FloatingLabel>
          </InputGroup>
          <Row>
            <Col sm={12} md={6}>
              <InputGroup className="mb-4">
                <InputGroup.Text>$</InputGroup.Text>
                <FloatingLabel controlId="floatingAmount1" label="Finance Fee">
                  <Form.Control
                    aria-label="Amount"
                    type="number"
                    required
                    onChange={(e) => {
                      if (e.target.value) {
                        setFinanceFee(parseFloat(e.target.value));
                        setAmountPayable(
                          parseFloat(e.target.value) + purchaseFee,
                        );
                      } else {
                        setFinanceFee(0);
                        setAmountPayable(0 + purchaseFee);
                      }
                    }}
                  />
                </FloatingLabel>
              </InputGroup>
            </Col>

            <Col sm={12} md={6}>
              <InputGroup className="mb-4">
                <InputGroup.Text>$</InputGroup.Text>
                <FloatingLabel controlId="floatingAmount2" label="Purchase Fee">
                  <Form.Control
                    aria-label="Amount"
                    required
                    type="number"
                    onChange={(e) => {
                      if (e.target.value) {
                        setPurchaseFee(parseFloat(e.target.value));
                        setAmountPayable(
                          parseFloat(e.target.value) + financeFee,
                        );
                      } else {
                        setPurchaseFee(0);
                        setAmountPayable(0 + financeFee);
                      }
                    }}
                  />
                </FloatingLabel>
              </InputGroup>
            </Col>
          </Row>

          <InputGroup className="mb-4">
            <InputGroup.Text>$</InputGroup.Text>
            <FloatingLabel
              controlId="floatingAmount2"
              label="Amount Payable"
              id="amount-payable"
            >
              <Form.Control
                aria-label="Amount"
                disabled
                value={amountPayable.toLocaleString('en-US')}
              />
            </FloatingLabel>
          </InputGroup>

          <Button variant="success" disabled={isLoading} type="submit">
            Submit
          </Button>
          <Toast
            show={error}
            onClose={() => setError(false)}
            className="mt-3 bg-danger-subtle"
            style={{ width: '100%' }}
          >
            <Toast.Header>
              <strong className="me-auto">Error</strong>
            </Toast.Header>
            <Toast.Body>
              {!isLoggedIn() && <p>User not logged in</p>}
              {responseError && <p>{responseError}</p>}
            </Toast.Body>
          </Toast>
        </Form>
      </div>
    </div>
  );
}

export default MotorcycleForm;
