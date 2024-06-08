"use client";
import React from "react";
import {
  TextField,
  Button,
  Container,
  Box,
  Snackbar,
  Alert,
  Typography,
  Link
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import { signupSchema } from "./schemas";
import * as Yup from "yup";
import { signup } from "@/actions/auth";
import { useRouter } from "next/navigation";
import RouterLink from "next/link";

type FormValues = Yup.InferType<typeof signupSchema>;

const initialValues: FormValues = {
  firstName: "",
  companyName: "",
  lastName: "",
  email: "",
  password: "",
  jobTitle: ""
};

export const SignUpForm = () => {
  const [alert, setAlert] = React.useState({
    type: "",
    value: "",
    open: false
  });
  const router = useRouter();

  const handleSubmit = async (values: FormValues) => {
    const response = await signup(values);

    if (response.ok) {
      setAlert({
        type: "success",
        value: "Account created successfully",
        open: true
      });

      router.push("/");
    } else {
      setAlert({
        type: "error",
        value: response.error,
        open: true
      });
    }
  };

  const handleCloseAlert = () => {
    setAlert({
      type: "",
      value: "",
      open: false
    });
  };

  return (
    <Container maxWidth="sm">
      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={alert.type as any}
          variant="filled"
          sx={{ width: "100%", textTransform: "capitalize" }}
        >
          {alert.value}
        </Alert>
      </Snackbar>

      <Box mt={5}>
        <Formik
          initialValues={initialValues}
          validationSchema={signupSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, handleChange, handleBlur, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <Box mb={2} display="flex" gap={2}>
                <Field
                  as={TextField}
                  name="firstName"
                  label="First name"
                  fullWidth
                  variant="outlined"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.firstName && errors.firstName}
                  error={touched.firstName && Boolean(errors.firstName)}
                />

                <Field
                  as={TextField}
                  name="lastName"
                  label="Last name"
                  fullWidth
                  variant="outlined"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.lastName && errors.lastName}
                  error={touched.lastName && Boolean(errors.lastName)}
                />
              </Box>

              <Box mb={2}>
                <Field
                  as={TextField}
                  name="companyName"
                  label="Company name"
                  fullWidth
                  variant="outlined"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.companyName && errors.companyName}
                  error={touched.companyName && Boolean(errors.companyName)}
                />
              </Box>

              <Box mb={2}>
                <Field
                  as={TextField}
                  name="jobTitle"
                  label="Job Title"
                  fullWidth
                  variant="outlined"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.jobTitle && errors.jobTitle}
                  error={touched.jobTitle && Boolean(errors.jobTitle)}
                />
              </Box>

              <Box mb={2}>
                <Field
                  as={TextField}
                  name="email"
                  label="Work Email"
                  fullWidth
                  variant="outlined"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.email && errors.email}
                  error={touched.email && Boolean(errors.email)}
                />
              </Box>

              <Box mb={2}>
                <Field
                  as={TextField}
                  name="password"
                  label="Create Password"
                  type="password"
                  fullWidth
                  variant="outlined"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.password && errors.password}
                  error={touched.password && Boolean(errors.password)}
                />
              </Box>

              <Box mt={2}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  color="primary"
                >
                  Continue
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};
