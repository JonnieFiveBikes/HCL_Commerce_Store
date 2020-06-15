/*
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2020
 *
 *==================================================
 */
import React, { useState, ChangeEvent, FormEvent } from "react";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import StyledTextField from "./../StyledTextField/StyledTextField";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import StyledAlert from "./../StyledAlert/StyledAlert";
import StyledSnackbar from "./../StyledSnackbar/StyledSnackbar";

interface ISubmitResult {
  firstName: string;
  lastName: string;
  email: string;
  password1: string;
  password2: string;
}

interface IFormErrors {
  firstName: string;
  lastName: string;
  email: string;
  password1: string;
  password2: string;
  form: string;
}

const defaultSubmitResult: ISubmitResult = {
  firstName: "",
  lastName: "",
  email: "",
  password1: "",
  password2: "",
};

const defaultFormErrors: IFormErrors = {
  firstName: "",
  lastName: "",
  email: "",
  password1: "",
  password2: "",
  form: "",
};

const useRegisterForm = (initialValues: ISubmitResult, callback: any) => {
  const [inputs, setInputs] = useState<ISubmitResult>(initialValues);
  const [errors, setErrors] = useState<IFormErrors>(defaultFormErrors);

  const handleSubmit = (event: FormEvent) => {
    if (event) event.preventDefault();
    validateInputs(inputs);
  };

  const handleInputChange = (event: ChangeEvent) => {
    event.persist();

    const element = event.currentTarget as HTMLInputElement;
    setInputs((inputs) => ({ ...inputs, [element.name]: element.value }));
    setErrors((inputs) => ({ ...inputs, [element.name]: "" }));

    // Remove form error while user is editing the form
    setErrors((inputs) => ({ ...inputs, form: "" }));
  };

  const validatePassword = (password1: string, password2: string) => {
    if (password1 !== password2) {
      return "Passwords must match.";
    } else {
      return "";
    }
  };

  const validateInputs = (inputs: ISubmitResult) => {
    let errorObject: IFormErrors = {
      firstName: "",
      lastName: "",
      email: "",
      password1: "",
      password2: "",
      form: "",
    };

    // Test for empty fields
    for (const [key, value] of Object.entries(inputs)) {
      errorObject = {
        ...errorObject,
        [key]: !value.length ? "This field cannot be empty." : "",
      };
    }

    // Test Email format
    const regexp = new RegExp(/[^@]+@[^@]+\.[^@]+/);

    if (inputs.email.length > 0 && !regexp.test(inputs.email)) {
      errorObject.email = "This email is not in a valid format.";
    }

    // Test if passwords match
    const passwordErrorString = validatePassword(
      inputs.password1,
      inputs.password2
    );
    if (passwordErrorString) {
      errorObject.password1 = passwordErrorString;
      errorObject.password2 = passwordErrorString;
    }

    for (const value of Object.values(errorObject)) {
      const errorMessage: string = value;
      if (errorMessage.length > 0) {
        errorObject.form =
          "Sorry, there was an error. Please check for any errors and try again.";
      }
    }

    setErrors(errorObject);
    if (errorObject.form === "") callback();
  };

  return {
    handleSubmit,
    handleInputChange,
    inputs,
    errors,
  };
};

const Register = () => {
  const registerSuccessCallback = () => {
    alert(`User Registered! 
    Name: ${inputs.firstName} ${inputs.lastName}
    Email: ${inputs.email}`);
  };
  const { inputs, handleInputChange, handleSubmit, errors } = useRegisterForm(
    defaultSubmitResult,
    registerSuccessCallback
  );

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form onSubmit={handleSubmit} noValidate>
          <StyledTextField
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="First Name "
            name="firstName"
            autoComplete="firstName"
            autoFocus
            onChange={handleInputChange}
            value={inputs.firstName}
            error={errors.firstName.length > 0}
            helperText={errors.firstName}
          />
          <StyledTextField
            margin="normal"
            required
            fullWidth
            id="lastName"
            label="Last Name "
            name="lastName"
            autoComplete="lastName"
            autoFocus
            onChange={handleInputChange}
            value={inputs.lastName}
            error={errors.lastName.length > 0}
            helperText={errors.lastName}
          />
          <StyledTextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleInputChange}
            value={inputs.email}
            error={errors.email.length > 0}
            helperText={errors.email}
          />
          <StyledTextField
            margin="normal"
            required
            fullWidth
            id="password1"
            label="Password"
            name="password1"
            type="password"
            autoFocus
            onChange={handleInputChange}
            value={inputs.password1}
            error={errors.password1.length > 0}
            helperText={errors.password1}
          />
          <StyledTextField
            margin="normal"
            required
            fullWidth
            id="password2"
            label="Verify Password"
            name="password2"
            type="password"
            autoFocus
            onChange={handleInputChange}
            value={inputs.password2}
            error={errors.password2.length > 0}
            helperText={errors.password2}
          />
          <Button type="submit" fullWidth color="primary">
            Register
          </Button>
          <StyledSnackbar open={errors.form.length > 0}>
            <StyledAlert severity="error">{errors.form}</StyledAlert>
          </StyledSnackbar>
        </form>
      </div>
    </Container>
  );
};

export default Register;
