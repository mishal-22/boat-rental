import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  Button,
  Modal,
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  Row,
  Col,
} from "react-bootstrap";
import { FaUser, FaDollarSign, FaAnchor } from "react-icons/fa";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

const BookingPage = () => {
  const { id } = useParams();
  const [validated, setValidated] = useState(false);
  const [paymentValidated, setPaymentValidated] = useState(false);
  const navigate = useNavigate();
  const [boat, setBoat] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [formData, setFormData] = useState({});
  const formik = useFormik({
    initialValues: {
      phone: "",
      date: "",
      startTime: "",
      endTime: "",
    },

    validationSchema: Yup.object({
      phone: Yup.string()
        .matches(
          /^[0-9]{10}$/,
          "Phone Number must be number and 10 digits long"
        )
        .required("Contact Number is required"),
      date: Yup.date().required("Date is required"),
      startTime: Yup.date()
        .transform((value, originalValue) => {
          const parsedDate = new Date(originalValue);
          return isNaN(parsedDate) ? new Date() : parsedDate;
        })
        .required("Start time is required"),
      endTime: Yup.date()
        .transform((value, originalValue) => {
          const parsedDate = new Date(originalValue);
          return isNaN(parsedDate) ? new Date() : parsedDate;
        })
        .required("End time is required"),
    }),

    onSubmit: async (values, { setSubmitting }) => {
      try {
        setFormData({
          username: sessionStorage.getItem("username"),
          boatId: id,
          phone: values.phone,
          date: values.date,
          startTime: values.startTime,
          endTime: values.endTime,
        });

        handleBooking();

        setValidated(true);
      } catch (error) {
      } finally {
        setSubmitting(false);
      }
    },
  });
  const paymentFormik = useFormik({
    initialValues: {
      name: "",
      cardNumber: "",
      exDate: "",
      code: "",
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .matches(/^[A-Za-z]+$/, "Name must be letters")
        .required("Name is required"),
      cardNumber: Yup.string()
        .matches(/^[0-9]+$/, "Card Number must be number")
        .required("Card Number is required"),
      exDate: Yup.string().matches(/^(0[1-9]|1[0-2])\/\d{2}$/,"Must be in MM/YY format").required("Date is required"),
      code: Yup.string()
        .matches(/^[0-9]{6}$/, "Verification Code must be 6 digits long")
        .required("Verification Code is required"),
    }),

    onSubmit: async (values, { setSubmitting }) => {
      try {
        handlePayment();
        setPaymentValidated(true);

        const timeoutId = setTimeout(() => {}, 1000);
        // Clear the timeout
        return () => clearTimeout(timeoutId);
      } catch (error) {
      } finally {
        setSubmitting(false);
      }
    },
  });
  useEffect(() => {
    fetchBoatDetails();
  }, []);

  const fetchBoatDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/boat/${id}`);
      setBoat(response.data);
    } catch (error) {
      console.error("Error fetching boat details:", error);
    }
  };

  const handlePayment = async () => {
    // Perform payment processing here
    // Assuming payment is successful for demonstration purposes
    // console.log(typeof formData.date);
    // formData.append("username",sessionStorage.getItem("username"));
    const response = await axios.post(
      "http://localhost:8080/booking",
      formData
    );
    if (response.status == 200) {
      const timeoutId = setTimeout(() => {}, 3000);
      // Clear the timeout
      navigate("/user/view-booking");
      return () => clearTimeout(timeoutId);
    }
    setPaymentSuccess(true);
    setShowPaymentModal(false);
  };

  const handleClosePaymentModal = () => {
    setShowPaymentModal(false);
  };

  const handleShowPaymentModal = () => {
    setShowPaymentModal(true);
  };

  const handleBooking = () => {
    // Perform booking process
    // For demo, let's just show payment modal
    handleShowPaymentModal();
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          {boat ? (
            <Card>
              <Card.Img
                variant="top"
                src={`/${boat.image}`}
                alt={boat.boatName}
              />
              <Card.Body>
                <Card.Title className="fw-bold" style={{ color: "#007bff" }}>
                  {boat.boatName}
                </Card.Title>
                <Card.Text className="text-muted mb-2">
                  {boat.description}
                </Card.Text>
                <div className="d-flex align-items-center mb-2">
                  <FaUser className="me-1" />
                  <span className="me-3">{boat.ownerName}</span>
                  <FaAnchor className="me-1" />
                  <span className="me-3">{boat.capacity} Capacity</span>
                  <FaDollarSign className="me-1" />
                  <span>{boat.price} / per hour</span>
                </div>
                <Form
                  noValidate
                  validated={validated}
                  onSubmit={formik.handleSubmit}
                >
                  <Col xl={12}>
                    <Card className="custom-card w-100">
                      <Card.Body>
                        <Row>
                          <Form.Group
                            as={Col}
                            md={12}
                            className="mb-3"
                            id="validationCapacity"
                          >
                            <Form.Label className="">Phone</Form.Label>
                            <Form.Control
                              type="text"
                              name="phone"
                              placeholder="Phone Number"
                              aria-label="mobile"
                              value={formik.values.phone}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              className={
                                formik.touched.phone && formik.errors.phone
                                  ? "is-invalid"
                                  : ""
                              }
                              required
                            />
                            {formik.touched.phone && formik.errors.phone && (
                              <div className="invalid-feedback">
                                {formik.errors.phone}
                              </div>
                            )}
                          </Form.Group>
                          <Form.Group
                            as={Col}
                            md={12}
                            className="mb-3"
                            id="validationCapacity"
                          >
                            <Form.Label className="">Date</Form.Label>
                            <Form.Control
                              type="date"
                              name="date"
                              placeholder="Date"
                              aria-label="date"
                              value={formik.values.date}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              className={
                                formik.touched.date && formik.errors.date
                                  ? "is-invalid"
                                  : ""
                              }
                              required
                            />
                            {formik.touched.date && formik.errors.date && (
                              <div className="invalid-feedback">
                                {formik.errors.date}
                              </div>
                            )}
                          </Form.Group>
                          <Form.Group
                            as={Col}
                            md={6}
                            className="mb-3"
                            id="validationCapacity"
                          >
                            <Form.Label className="">Start Time</Form.Label>
                            <Form.Control
                              type="time"
                              name="startTime"
                              placeholder="Start Time"
                              aria-label="mobile"
                              value={formik.values.startTime}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              className={
                                formik.touched.startTime &&
                                formik.errors.startTime
                                  ? "is-invalid"
                                  : ""
                              }
                              required
                            />
                            {formik.touched.startTime &&
                              formik.errors.startTime && (
                                <div className="invalid-feedback">
                                  {formik.errors.startTime}
                                </div>
                              )}
                          </Form.Group>
                          <Form.Group
                            as={Col}
                            md={6}
                            className="mb-3"
                            id="validationCapacity"
                          >
                            <Form.Label className="">End Time</Form.Label>
                            <Form.Control
                              type="time"
                              name="endTime"
                              placeholder="End Time"
                              aria-label="mobile"
                              value={formik.values.endTime}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              className={
                                formik.touched.endTime && formik.errors.endTime
                                  ? "is-invalid"
                                  : ""
                              }
                              required
                            />
                            {formik.touched.endTime &&
                              formik.errors.endTime && (
                                <div className="invalid-feedback">
                                  {formik.errors.endTime}
                                </div>
                              )}
                          </Form.Group>
                        </Row>
                        <Col md={12}>
                          <Button type="submit" variant="primary">
                            Submit
                          </Button>
                        </Col>
                      </Card.Body>
                    </Card>
                  </Col>
                </Form>
              </Card.Body>
            </Card>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
      <Modal show={showPaymentModal} onHide={handleClosePaymentModal}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Payment Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            noValidate
            validated={paymentValidated}
            onSubmit={paymentFormik.handleSubmit}
          >
            <FormGroup className="mb-3">
              <FormLabel>Card Holder Name</FormLabel>
              <Form.Control
                type="text"
                name="name"
                placeholder="Name"
                aria-label="Name"
                value={paymentFormik.values.name}
                onChange={paymentFormik.handleChange}
                onBlur={paymentFormik.handleBlur}
                className={
                  paymentFormik.touched.name && paymentFormik.errors.name
                    ? "is-invalid"
                    : ""
                }
                required
              />
              {paymentFormik.touched.name && paymentFormik.errors.name && (
                <div className="invalid-feedback">
                  {paymentFormik.errors.name}
                </div>
              )}
            </FormGroup>
            <FormGroup className="mb-3">
              <FormLabel>Card Number</FormLabel>
              <Form.Control
                type="text"
                name="cardNumber"
                placeholder="Card Number"
                aria-label="cardNumber"
                value={paymentFormik.values.cardNumber}
                onChange={paymentFormik.handleChange}
                onBlur={paymentFormik.handleBlur}
                className={
                  paymentFormik.touched.cardNumber &&
                  paymentFormik.errors.cardNumber
                    ? "is-invalid"
                    : ""
                }
                required
              />
              {paymentFormik.touched.cardNumber &&
                paymentFormik.errors.cardNumber && (
                  <div className="invalid-feedback">
                    {paymentFormik.errors.cardNumber}
                  </div>
                )}
            </FormGroup>
            <FormGroup className="mb-3">
              <FormLabel>Expiry Date</FormLabel>
              <Form.Control
                type="text"
                name="exDate"
                placeholder="MM/YY"
                aria-label="cardNumber"
                value={paymentFormik.values.exDate}
                onChange={paymentFormik.handleChange}
                onBlur={paymentFormik.handleBlur}
                className={
                  paymentFormik.touched.exDate && paymentFormik.errors.exDate
                    ? "is-invalid"
                    : ""
                }
                required
              />
              {paymentFormik.touched.exDate && paymentFormik.errors.exDate && (
                <div className="invalid-feedback">
                  {paymentFormik.errors.exDate}
                </div>
              )}
            </FormGroup>
            <FormGroup className="mb-3">
              <FormLabel>Verification Code</FormLabel>
              <Form.Control
                type="text"
                name="code"
                placeholder="-- -- --"
                aria-label="code"
                value={paymentFormik.values.code}
                onChange={paymentFormik.handleChange}
                onBlur={paymentFormik.handleBlur}
                className={
                  paymentFormik.touched.code && paymentFormik.errors.code
                    ? "is-invalid"
                    : ""
                }
                required
              />
              {paymentFormik.touched.code && paymentFormik.errors.code && (
                <div className="invalid-feedback">
                  {paymentFormik.errors.code}
                </div>
              )}
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosePaymentModal}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              paymentFormik.handleSubmit();
              if (paymentValidated) {
                handlePayment();
              }
            }}
          >
            Pay
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={paymentSuccess} onHide={() => setPaymentSuccess(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Payment Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your booking has been successfully completed!</Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => navigate("/user/view-booking")}
          >
            View Bookings
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BookingPage;
