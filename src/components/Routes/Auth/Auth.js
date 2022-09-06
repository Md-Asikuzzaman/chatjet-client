import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { TextField, Button, Typography } from "@material-ui/core";
import "./auth.css";
import { userSignUp, userSignIn } from "./../../../actions/auth";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("chatjet_profile");

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [signUp, setSignUp] = useState(false);

  const handleSignUp = (e) => {
    e.preventDefault();
    setSignUp((prevState) => {
      setSignUp(!prevState);
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (signUp) {
      dispatch(userSignUp(formData, navigate));
    } else {
      dispatch(userSignIn(formData, navigate));
    }

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="auth">
      <div className="formWrapper">
        <Typography className="form-title" variant="h4" color="primary">
          {signUp ? "Sign Up" : "Sign In"}
        </Typography>
        <form onSubmit={handleSubmit}>
          {signUp && (
            <>
              <TextField
                fullWidth
                className="field"
                variant="outlined"
                label="First Name"
                name="firstName"
                onChange={handleChange}
                value={formData.firstName}
              />
              <TextField
                fullWidth
                className="field"
                variant="outlined"
                label="Last Name"
                name="lastName"
                onChange={handleChange}
                value={formData.lastName}
              />
            </>
          )}
          <TextField
            fullWidth
            className="field"
            variant="outlined"
            label="Email"
            name="email"
            onChange={handleChange}
            value={formData.email}
          />
          <TextField
            fullWidth
            className="field"
            variant="outlined"
            label="Password"
            name="password"
            onChange={handleChange}
            value={formData.password}
          />
          {signUp && (
            <TextField
              fullWidth
              className="field"
              variant="outlined"
              label="Confirm Password"
              name="confirmPassword"
              onChange={handleChange}
              value={formData.confirmPassword}
            />
          )}
          <Button
            type="submit"
            className="field"
            variant="contained"
            color="primary"
          >
            {signUp ? "Sign Up" : "Sign In"}
          </Button>
        </form>
        <Typography className="form-footer-text" variant="body2" align="center">
          {signUp ? "Already have an account? " : "Don't have any account? "}
          <span onClick={handleSignUp} className="footer-label">
            {signUp ? "Sign In" : "Sign Up"}
          </span>
        </Typography>
      </div>
    </div>
  );
};

export default Auth;
