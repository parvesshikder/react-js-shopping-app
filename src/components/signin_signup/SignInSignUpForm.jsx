import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import {
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
} from "mdb-react-ui-kit";
import {
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBCard,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
} from "mdb-react-ui-kit";

export default function SignInSignUpForm() {
  const [loginRegisterActive, setLoginRegisterActive] = useState("login");

  const navigate = useNavigate();

  function handleLoginRegisterClick(activeTab) {
    setLoginRegisterActive(activeTab);
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [openSnackbarLS, setOpenSnackbarLS] = useState(false);
  const [openSnackbarLF, setOpenSnackbarLF] = useState(false);
  const [openSnackbarSS, setOpenSnackbarSS] = useState(false);
  const [openSnackbarSF, setOpenSnackbarSF] = useState(false);

  const handleSnackbarLogibSuccess = () => {
    setOpenSnackbarLS(!openSnackbarLS);
  };

  const handleSnackbarLoginFailed = () => {
    setOpenSnackbarLF(!openSnackbarLF);
  };

  const handleSnackbarSignupSuccess = () => {
    setOpenSnackbarSS(!openSnackbarSS);
  };

  const handleSnackbarSignUpFailed = () => {
    setOpenSnackbarSF(!openSnackbarSF);
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const onLogin =  (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then( (userCredential) => {
        // Signed in
        const user = userCredential.user;
        handleSnackbarLogibSuccess();

        // open the snackbar
      })
      .catch((error) => {
        handleSnackbarLoginFailed();
      });
  };

  const onSignup =  (e) => {
    e.preventDefault();
     createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        handleSnackbarSignupSuccess();
        // open the snackbar
      })
      .catch((error) => {
        handleSnackbarSignUpFailed();
      });
  };

  return (
    <>
      <MDBCard className="p-5">
        <div>
          <MDBTabs pills justify className="mb-3">
            <MDBTabsItem>
              <MDBTabsLink
                onClick={() => handleLoginRegisterClick("login")}
                active={loginRegisterActive === "login"}
              >
                Login
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink
                onClick={() => handleLoginRegisterClick("register")}
                active={loginRegisterActive === "register"}
              >
                Register
              </MDBTabsLink>
            </MDBTabsItem>
          </MDBTabs>

          <MDBTabsContent>
            <MDBTabsPane show={loginRegisterActive === "login"}>
              <form>
                <MDBInput
                  className="mb-4"
                  type="email"
                  id="form7Example1"
                  label="Email address"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <MDBInput
                  className="mb-4"
                  type="password"
                  id="form7Example2"
                  label="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />

                <MDBDropdown className="mb-4">
                  <MDBDropdownToggle tag="a" className="btn btn-primary">
                    Buyer
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                    <MDBDropdownItem link>Buyer</MDBDropdownItem>
                    <MDBDropdownItem link>Seller</MDBDropdownItem>
                    <MDBDropdownItem link>Admin</MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>

                <MDBRow className="mb-4">
                  <MDBCol className="d-flex justify-content-center">
                    <MDBCheckbox
                      id="form7Example3"
                      label="Remember me"
                      defaultChecked
                    />
                  </MDBCol>
                  <MDBCol>
                    <a href="#!">Forgot password?</a>
                  </MDBCol>
                </MDBRow>

                {loading ? (
                  <MDBBtn type="submit" className="mb-4" block>
                    <CircularProgress color="inherit" />
                  </MDBBtn>
                ) : (
                  <MDBBtn
                    type="submit"
                    className="mb-4"
                    block
                    onClick={async (e) => {
                      setLoading(true);
                      onLogin(e);
                      await delay(1000);
                      setLoading(false);
                    }}
                  >
                    LOg In
                  </MDBBtn>
                )}
              </form>
            </MDBTabsPane>
            <MDBTabsPane show={loginRegisterActive === "register"}>
              <form>
                <MDBInput className="mb-4" id="form8Example1" label="Name" />
                <MDBInput
                  className="mb-4"
                  id="form8Example2"
                  label="Phone Number"
                />
                <MDBInput
                  className="mb-4"
                  type="email"
                  id="form8Example3"
                  label="Email address"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <MDBInput
                  className="mb-4"
                  type="password"
                  id="form8Example4"
                  label="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />

                <MDBCheckbox
                  wrapperClass="d-flex justify-content-center mb-4"
                  id="form8Example6"
                  label="I have read and agree to the terms"
                  defaultChecked
                />

                <MDBDropdown className="mb-4">
                  <MDBDropdownToggle tag="a" className="btn btn-primary">
                    Buyer
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                    <MDBDropdownItem link>Buyer</MDBDropdownItem>
                    <MDBDropdownItem link>Seller</MDBDropdownItem>
                    <MDBDropdownItem link>Admin</MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>

                

                {loading ? (
                  <MDBBtn type="submit" className="mb-4" block>
                    <CircularProgress color="inherit" />
                  </MDBBtn>
                ) : (
                  <MDBBtn
                    type="submit"
                    className="mb-4"
                    block
                    onClick={async (e) => {
                      setLoading(true);
                      onSignup(e);
                      await delay(1000);
                      setLoading(false);
                    }}
                  >
                    LOg In
                  </MDBBtn>
                )}
              </form>
            </MDBTabsPane>
          </MDBTabsContent>
        </div>
      </MDBCard>


      {/* 
        Log In faled 
      */}
      <Snackbar
        open={openSnackbarLF}
        autoHideDuration={6000}
        onClose={handleSnackbarLoginFailed}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MuiAlert onClose={handleSnackbarLoginFailed} severity="error">
          Login Failed!
        </MuiAlert>
      </Snackbar>

      {/* 
        Sign up In faled 
      */}
      <Snackbar
        open={openSnackbarSF}
        autoHideDuration={6000}
        onClose={handleSnackbarSignUpFailed}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MuiAlert onClose={handleSnackbarSignUpFailed} severity="error">
          Sign Up Failed!
        </MuiAlert>
      </Snackbar>
    </>
  );
}
