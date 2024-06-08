import * as Yup from "yup";

export const signupSchema = Yup.object({
  firstName: Yup.string()
    .required("First name is required")
    .min(2, "It must be at least 2 characters long")
    .max(120, "It must be at most 120 characters long"),
  lastName: Yup.string()
    .required("Last name is required")
    .min(2, "It must be at least 2 characters long")
    .max(120, "It must be at most 120 characters long"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .max(120, "It must be at most 120 characters long"),
  companyName: Yup.string()
    .required("Company name is required")
    .min(2, "It must be at least 2 characters long")
    .max(120, "It must be at most 120 characters long"),
  jobTitle: Yup.string()
    .min(2, "It must be at least 2 characters long")
    .max(120, "It must be at most 120 characters long")
});

export const loginSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .max(120, "It must be at most 120 characters long")
});
