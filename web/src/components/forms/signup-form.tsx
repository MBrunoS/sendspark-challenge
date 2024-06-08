"use client";
import React from "react";
import { TextField, Button, Container, Box } from "@mui/material";
import { Formik, Form, Field } from "formik";
import { signupSchema } from "./schemas";
import * as Yup from "yup";

type FormValues = Yup.InferType<typeof signupSchema>;

export const SignUpForm = () => {
  const initialValues: FormValues = {
    firstName: "",
    companyName: "",
    lastName: "",
    email: "",
    password: "",
    jobTitle: ""
  };

  const handleSubmit = (values: FormValues) => {};

  return (
    <Container maxWidth="sm">
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
                  color="purple"
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
