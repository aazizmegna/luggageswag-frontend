import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { registerUser } from "../../store/user/actions";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import logo from "../../assets/logo.png";

import {
  MDBBtn,
  MDBRow,
  MDBCol,
  MDBContainer,
  MDBCard,
  MDBInput,
  MDBCheckbox,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBIcon,
} from "mdb-react-ui-kit";
import Select from "react-select";

import "./index.css";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatpassword, setRepeatpassword] = useState("");
  const [contact, setContact] = useState("");
  const [code, setCode] = useState<any>({ value: "00", label: "Code" });
  const [passerror, setPasserror] = useState("");

  const dispatch = useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();

  const error = useSelector((state: RootState) => state.user.error);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== repeatpassword) {
      setPasserror("Passwords do not match");
      setTimeout(() => {
        setPasserror("");
      }, 2000);
    } else {
      dispatch(registerUser(name, email, password, contact));
      if (!error) {
        setTopRightModal(true);
        setTimeout(() => {
          setTopRightModal(false);
        }, 5000);
      }
    }
  };
  const options = [
    { value: "+1", label: "+1" },
    { value: "+33", label: "+33" },
    { value: "+90", label: "+90" },
    { value: "+237", label: "+237" },
  ];

  const [topRightModal, setTopRightModal] = useState(false);

  const toggleShow = () => setTopRightModal(!topRightModal);
  return (
    <>
      <MDBContainer
        fluid
        className="d-flex align-items-center justify-content-center bg-image"
        style={{
          backgroundImage:
            "url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)",
        }}
      >
        <MDBRow className="d-flex justify-content-center align-items-center h-100">
          <MDBCol col="12">
            <MDBCard className="m-3" style={{ maxWidth: "600px" }}>
              <form className="px-5" onSubmit={handleSubmit} noValidate>
                <br />
                {error && <div className="error">{error}</div>}
                {passerror && <div className="error">{passerror}</div>}
                <h3 className="text-uppercase text-center mb-5">
                  <img src={logo} height="50" alt="" loading="lazy" />
                </h3>
                <MDBInput
                  wrapperClass="mb-4 w-100"
                  label="Your Name"
                  size="lg"
                  type="text"
                  id="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
                <MDBInput
                  wrapperClass="mb-4 w-100"
                  label="Your Email"
                  size="lg"
                  type="email"
                  id="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                <div className="contact">
                  <Select
                    options={options}
                    defaultValue={code}
                    onChange={setCode}
                    isSearchable
                  />
                  <MDBInput
                    wrapperClass="mb-4 w-90"
                    label="Contact"
                    size="lg"
                    type="text"
                    id="contact"
                    value={contact}
                    onChange={(event) => setContact(event.target.value)}
                  />
                </div>
                <MDBInput
                  wrapperClass="mb-4 w-100"
                  label="Password"
                  size="lg"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <MDBInput
                  wrapperClass="mb-4 w-100"
                  label="Repeat your password"
                  size="lg"
                  type="password"
                  id="repeatpassword"
                  value={repeatpassword}
                  onChange={(event) => setRepeatpassword(event.target.value)}
                />
                <div className="d-flex flex-row justify-content-center mb-4">
                  <MDBCheckbox
                    name="flexCheck"
                    id="flexCheckDefault"
                    label="I agree all statements in Terms of service"
                  />
                </div>
                <MDBBtn
                  className="mb-4 w-100 gradient-custom-4 justify-content-center"
                  size="lg"
                  type="submit"
                >
                  Register
                </MDBBtn>
              </form>
              <div className="text-center">
                <p>or sign up with:</p>

                <MDBBtn
                  tag="a"
                  color="none"
                  className="mx-3"
                  style={{ color: "#1266f1" }}
                >
                  <MDBIcon fab icon="facebook-f" size="sm" />
                </MDBBtn>

                <MDBBtn
                  tag="a"
                  color="none"
                  className="mx-3"
                  style={{ color: "#1266f1" }}
                >
                  <MDBIcon fab icon="twitter" size="sm" />
                </MDBBtn>

                <MDBBtn
                  tag="a"
                  color="none"
                  className="mx-3"
                  style={{ color: "#1266f1" }}
                >
                  <MDBIcon fab icon="google" size="sm" />
                </MDBBtn>

                <MDBBtn
                  tag="a"
                  color="none"
                  className="mx-3"
                  style={{ color: "#1266f1" }}
                >
                  <MDBIcon fab icon="github" size="sm" />
                </MDBBtn>
              </div>
              <div className="text-center">
                Already have an account? <a href="/">Login</a>
              </div>
              <br />
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>

      {/* modal --------------------------------------------*/}
      <MDBModal
        animationDirection="right"
        show={error ? false : topRightModal}
        tabIndex="-1"
        setShow={setTopRightModal}
      >
        <MDBModalDialog position="top-right" side>
          <MDBModalContent>
            <MDBModalHeader className="bg-info text-white">
              <MDBModalTitle>User created successfully</MDBModalTitle>
              <MDBBtn
                color="none"
                className="btn-close btn-close-white"
                onClick={toggleShow}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <div className="row">
                <div className="col-3 text-center">
                  <i className="fas fa-user fa-4x text-info"></i>
                </div>

                <div className="col-9">
                  <p>Welcome {name} to Luggageswap!</p>
                </div>
              </div>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn outline color="info" onClick={toggleShow}>
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default RegisterForm;
