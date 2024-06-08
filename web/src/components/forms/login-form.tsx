"use client";
import React from "react";
import {
  TextField,
  Button,
  Container,
  Box,
  Snackbar,
  Alert,
  Typography
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import { loginSchema } from "./schemas";
import * as Yup from "yup";
import { login } from "@/actions/auth";
import { useRouter } from "next/navigation";

type FormValues = Yup.InferType<typeof loginSchema>;

const initialValues: FormValues = {
  email: "",
  password: ""
};

export const LoginForm = () => {
  const [alert, setAlert] = React.useState({
    type: "",
    value: "",
    open: false
  });

  const router = useRouter();

  const handleSubmit = async (values: FormValues) => {
    const response = await login(values);

    if (response.ok) {
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
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, handleChange, handleBlur, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <Box mb={2}>
                <Field
                  as={TextField}
                  name="email"
                  label="Email"
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
