import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../../firebase";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Context from "./Context";
import { getFirestore, doc, setDoc, collection } from "firebase/firestore";
import { sendPasswordResetEmail } from "firebase/auth";

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
  const [selectedValue, setSelectedValue] = useState("Buyer");
  const { role, setRoleValue, emailVerified, setEmailVerified  } = useContext(Context);
  const firestore = getFirestore();
  function handleLoginRegisterClick(activeTab) {
    setLoginRegisterActive(activeTab);
  }

  //RESET PASS
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [resetEmailError, setResetEmailError] = useState(null);

  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      setResetEmailSent(true);
      setResetEmailError(null);
    } catch (error) {
      setResetEmailSent(false);
      setResetEmailError(error.message);
    }
  };

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
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

  
  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        if (userCredential.user.emailVerified) {
          setRoleValue(selectedValue);
          setEmailVerified(true);
          handleSnackbarLogibSuccess();
        } else {
          handleSnackbarLoginFailed();
        }
      })
      .catch((error) => {
        handleSnackbarLoginFailed();
      });
  };
  

  const onSignup = async (e) => {
    e.preventDefault();

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )
      .then(async (userCredential) => {
        setRoleValue(selectedValue);
        const user = userCredential.user;

        //email varification
        await sendEmailVerification(user);



        // Store user data in Firestore
        const userRef = doc(collection(firestore, "users"), user.uid);
        await setDoc(userRef, {
          name: name,
          email: email,
          phone: phone,
        });

        handleSnackbarSignupSuccess();
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
                    {selectedValue}
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                    <MDBDropdownItem
                      link
                      onClick={() => setSelectedValue("Buyer")}
                      active={selectedValue === "Buyer"}
                    >
                      Buyer
                    </MDBDropdownItem>
                    <MDBDropdownItem
                      link
                      onClick={() => setSelectedValue("Seller")}
                      active={selectedValue === "Seller"}
                    >
                      Seller
                    </MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>

                <MDBRow className="mb-4">
                  <MDBCol>
                    <a href="#!" onClick={() => setShowForgotPassword(true)}>
                      Forgot password?
                    </a>
                  </MDBCol>
                </MDBRow>

                {/* Forgot Password Form */}
                {showForgotPassword && (
                  <form>
                    <MDBInput
                      className="mb-4"
                      type="email"
                      id="resetEmail"
                      label="Email address"
                      required
                      title="Please enter your email"
                      onChange={(e) => setResetEmail(e.target.value)}
                    />

                    <MDBBtn
                      type="submit"
                      className="mb-4"
                      block
                      onClick={async (e) => {
                        e.preventDefault();
                        handleResetPassword();
                      }}
                    >
                      Reset Password
                    </MDBBtn>
                  </form>
                )}

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
                    Login
                  </MDBBtn>
                )}
              </form>
            </MDBTabsPane>
            <MDBTabsPane show={loginRegisterActive === "register"}>
              <form>
                <MDBInput
                  className="mb-4"
                  id="name"
                  label="Name"
                  onChange={(e) => setName(e.target.value)}
                />
                <MDBInput
                  className="mb-4"
                  id="phone"
                  label="Phone Number"
                  required
                  title="Please enter your phone number"
                  onChange={(e) => setPhone(e.target.value)}
                />
                <MDBInput
                  className="mb-4"
                  type="email"
                  id="email"
                  label="Email address"
                  required
                  title="Please enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <MDBInput
                  className="mb-4"
                  type="password"
                  id="password"
                  label="Password"
                  required
                  title="Please enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                />

                <MDBDropdown className="mb-4">
                  <MDBDropdownToggle tag="a" className="btn btn-primary">
                    {selectedValue}
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                    <MDBDropdownItem
                      link
                      onClick={() => setSelectedValue("Buyer")}
                      active={selectedValue === "Buyer"}
                    >
                      Buyer
                    </MDBDropdownItem>
                    <MDBDropdownItem
                      link
                      onClick={() => setSelectedValue("Seller")}
                      active={selectedValue === "Seller"}
                    >
                      Seller
                    </MDBDropdownItem>
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
                    Regsiter
                  </MDBBtn>
                )}
              </form>
            </MDBTabsPane>
          </MDBTabsContent>
        </div>
      </MDBCard>

      {/* 
        Log In failed 
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
        Sign Up failed 
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

      {/* 
        Sign Up success 
      */}
      <Snackbar
        open={openSnackbarSS}
        autoHideDuration={6000}
        onClose={handleSnackbarSignupSuccess}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MuiAlert onClose={handleSnackbarSignupSuccess} severity="success">
        Congratulations! Your account has been created successfully. Please check your email to verify your account.
        </MuiAlert>
      </Snackbar>

      {/* Password Reset Success */}
      <Snackbar
        open={resetEmailSent}
        autoHideDuration={6000}
        onClose={() => setResetEmailSent(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MuiAlert onClose={() => setResetEmailSent(false)} severity="success">
          Password reset email sent. Please check your inbox.
        </MuiAlert>
      </Snackbar>

      {/* Password Reset Error */}
      <Snackbar
        open={resetEmailError !== null}
        autoHideDuration={6000}
        onClose={() => setResetEmailError(null)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MuiAlert onClose={() => setResetEmailError(null)} severity="error">
          {resetEmailError}
        </MuiAlert>
      </Snackbar>
    </>
  );
}
