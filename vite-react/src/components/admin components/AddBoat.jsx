import React from "react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Button,
  Card,
  Col,
  Form,
  Row,
  ToastContainer,
  Toast,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
function AddBoat() {
  //----------------- Constants ----------------------------------------
  const navigate = useNavigate();
  const [flagCheck, setFlagCheck] = useState(false);

  //------------------- For Validation and API calling -----------------------------------
  const [validated, setValidated] = useState(false);
  const [toast, setToast] = useState(false);
  const [file, setFile] = useState(null);

  //------------------ Formik ---------------------------------------------
  const formik = useFormik({
    initialValues: {
      boatName: "",
      // ownerName: "",
      description: "",
      capacity: "",
      price: "",
      photo: null,
      isActive: true,
    },

    validationSchema: Yup.object({
      boatName: Yup.string()
        .required("Boat Name is required"),
      // ownerName: Yup.string()
      //   .matches(/^[A-Za-z]+$/, "Owner name must be letters")
      //   .required("Owner Name is required"),
      description: Yup.string().required("Description is required"),
      capacity: Yup.string()
        .matches(/^[0-9]+$/, "Must be number")
        .required("Capacity is required"),
      price: Yup.string()
        .matches(/^[0-9]+$/, "Must be number")
        .required("Price is required"),
      photo: Yup.mixed().required("Image required"),
    }),

    onSubmit: async (values, { setSubmitting }) => {
      try {
        const formData = new FormData();
        formData.append("photo", file);
        formData.append("boatName", values.boatName);
        // formData.append("ownerName", values.ownerName);
        formData.append("capacity", values.capacity);
        formData.append("price", values.price);
        formData.append("description", values.description);
        formData.append("isActive", values.isActive);
        formData.append("username", sessionStorage.getItem("username"));

        const response = await axios.post(
          "http://localhost:8080/boat",
          formData
        );
        console.log(response.status);

        setValidated(true);

        //------------------ Display Toast ---------------------------------------------------
        if (response.status === 200) {
          setFlagCheck(true);
          setToast(true);

          // Redirect to manage tenant page after 3 seconds
          const timeoutId = setTimeout(() => {
            navigate("/admin/boats");
          }, 1000);
          // Clear the timeout
          return () => clearTimeout(timeoutId);
        } else {
          setFlagCheck(false);
          setToast(true);
        }
      } catch (error) {
        setFlagCheck(false);
        setToast(true);
      } finally {
        setSubmitting(false);
      }
    },
  });
  return (
    // <Fragment className="justify-content-center align-items-center vh-100">
    <>
      <Row className="justify-content-center align-items-center vh-100">
        <Col xl={8}>
          <Form noValidate validated={validated} onSubmit={formik.handleSubmit}>
            <Col xl={12}>
              <Card className="custom-card w-100">
                <Card.Header className=" justify-content-between">
                  <Card.Title>Add New Boat</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Form.Group
                      as={Col}
                      md={9}
                      className="mb-3"
                      id="validationBoatName"
                    >
                      <Form.Label className="">Boat Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="boatName"
                        placeholder="Boat name"
                        aria-label="Boat name"
                        value={formik.values.boatName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={
                          formik.touched.boatName && formik.errors.boatName
                            ? "is-invalid"
                            : ""
                        }
                        required
                      />
                      {formik.touched.boatName && formik.errors.boatName && (
                        <div className="invalid-feedback">
                          {formik.errors.boatName}
                        </div>
                      )}
                    </Form.Group>

                    <Form.Group
                      as={Col}
                      md={12}
                      className="mb-3"
                      id="validationDescription"
                    >
                      <Form.Label className="">Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        type="text"
                        name="description"
                        placeholder="Description"
                        aria-label="Address"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={
                          formik.touched.description &&
                          formik.errors.description
                            ? "is-invalid"
                            : ""
                        }
                        required
                      />
                      {formik.touched.description &&
                        formik.errors.description && (
                          <div className="invalid-feedback">
                            {formik.errors.description}
                          </div>
                        )}
                    </Form.Group>

                    <Form.Group
                      as={Col}
                      md={6}
                      className="mb-3"
                      id="validationCapacity"
                    >
                      <Form.Label className="">Capacity</Form.Label>
                      <Form.Control
                        type="text"
                        name="capacity"
                        placeholder="Capacity"
                        aria-label="mobile"
                        value={formik.values.capacity}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={
                          formik.touched.capacity && formik.errors.capacity
                            ? "is-invalid"
                            : ""
                        }
                        required
                      />
                      {formik.touched.capacity && formik.errors.capacity && (
                        <div className="invalid-feedback">
                          {formik.errors.capacity}
                        </div>
                      )}
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      md={6}
                      className="mb-3"
                      id="validationCapacity"
                    >
                      <Form.Label className="">Price</Form.Label>
                      <Form.Control
                        type="text"
                        name="price"
                        placeholder="Price"
                        aria-label="mobile"
                        value={formik.values.price}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={
                          formik.touched.price && formik.errors.price
                            ? "is-invalid"
                            : ""
                        }
                        required
                      />
                      {formik.touched.price && formik.errors.price && (
                        <div className="invalid-feedback">
                          {formik.errors.price}
                        </div>
                      )}
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      md={6}
                      className="mb-3"
                      id="validationimgupload"
                    >
                      <Form.Label className="">Photo</Form.Label>
                      <Form.Control
                        type="file"
                        name="photo"
                        onChange={(event) => {
                          const fileName = event.target.files[0];
                          formik.setFieldValue("photo", fileName);
                          setFile(fileName);
                        }}
                        onBlur={formik.handleBlur}
                        className={
                          formik.touched.photo && formik.errors.photo
                            ? "is-invalid"
                            : ""
                        }
                        required
                      />
                      {formik.touched.photo && formik.errors.photo && (
                        <div className="invalid-feedback">
                          {formik.errors.photo}
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
        </Col>
      </Row>
      {/*-----------------  for Toast Message----------- */}
      <Card.Body>
        <ToastContainer className="toast-container position-fixed top-0 end-0 p-3">
          <Toast
            id="successToast"
            className={`toast colored-toast bg-${
              flagCheck ? "success" : "danger"
            }-transparent`}
            role="alert"
            aria-live="assertive"
            onClose={() => setToast(false)}
            show={toast}
            delay={3000}
            autohide
            aria-atomic="true"
          >
            <Toast.Header
              className={`bg-${
                flagCheck ? "success" : "danger"
              } text-fixed-white`}
            >
              <strong className="me-auto">
                {flagCheck ? "Success" : "Error"}
              </strong>
            </Toast.Header>
            <Toast.Body>
              {flagCheck ? "Boat Added Successfully" : "Something Went Wrong"}
            </Toast.Body>
          </Toast>
        </ToastContainer>
      </Card.Body>
      {/* </Fragment>
       */}
    </>
  );
}

export default AddBoat;
