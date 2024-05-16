import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Row,
  ToastContainer,
  Toast,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [role, setRole] = useState("user");
  const navigate = useNavigate();
  const [flagCheck, setFlagCheck] = useState(false);
  const [toast, setToast] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false); // Track registration process
  const [toastMessage, setToastMessage] = useState("Something went wrong!");

  const handleSubmit = (e) => {
    e.preventDefault();
    // If registration process is ongoing, prevent duplicate submissions
    if (isRegistering) {
      return;
    }
    setIsRegistering(true); // Set registration process as ongoing
    const formData = { username, email, password, gender, role };
    axios
      .post("http://localhost:8080/boat-life/register", formData)
      .then((response) => {
        const data = response.data;
        if (data === "User already Exist") {
          setToast(true);
          setToastMessage("Email already Registered!");
          // alert("Email already Registered ");
          // Reset form fields
          setUsername("");
          setEmail("");
          setPassword("");
          setGender("");
          setRole("user");
          const timeoutId = setTimeout(() => {
            navigate("/login");
          }, 2000);
          // Clear the timeout
          return () => clearTimeout(timeoutId);
        } else {
          console.log("User registered Successfully", data);
          setToastMessage("Registration Success");
          setFlagCheck(true);
          setToast(true);
          // Reset form fields
          setUsername("");
          setEmail("");
          setPassword("");
          setGender("");
          setRole("user");
          const timeoutId = setTimeout(() => {
            navigate("/login");
          }, 2000);
          return () => clearTimeout(timeoutId);
        }
      })
      .catch((error) => {
        console.error("Error during registration:", error);
        // Handle error, show error message, etc.
        setToast(true);
        setFlagCheck(false);
        setToastMessage("Something went wrong!");
      })
      .finally(() => {
        setIsRegistering(false); // Reset registration process state
      });
  };

  return (
    <div className="container">
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Register</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGender">
                  <Form.Label>Gender</Form.Label>
                  <div>
                    <Form.Check
                      inline
                      label="Male"
                      type="radio"
                      name="gender"
                      id="genderMale"
                      checked={gender === "male"}
                      onChange={() => setGender("male")}
                      required
                    />
                    <Form.Check
                      inline
                      label="Female"
                      type="radio"
                      name="gender"
                      id="genderFemale"
                      checked={gender === "female"}
                      onChange={() => setGender("female")}
                      required
                    />
                  </div>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formRole">
                  <Form.Label>Role</Form.Label>
                  <Form.Select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </Form.Select>
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 mt-3"
                  disabled={isRegistering}
                >
                  {isRegistering ? "Registering..." : "Register"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Toast Message */}
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
          delay={2000}
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
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export default Register;
