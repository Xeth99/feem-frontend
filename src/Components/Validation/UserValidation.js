import * as yup from "yup";

// login validation
const LoginValidation = yup.object().shape({
  email: yup.string().email().required("Email is required").trim(),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must be less than 20 characters")
    .matches(/(?=.*[0-9])/, "password must contain a number"),
});

// register validation
const RegisterValidation = yup.object({
  email: yup.string().email().required("Email is required").trim(),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must be less than 20 characters")
    .matches(/(?=.*[0-9])/, "password must contain a number"),
  fullName: yup
    .string()
    .required("Full name is required")
    .max(20, "Full name must be less than 20 characters")
    .matches(
      /^[A-Za-z]+\s[A-Za-z]+$/,
      "Full name must include first and last name, letters only"
    ),
});

const ProfileValidation = yup.object().shape({
  fullName: yup
    .string()
    .required("Full name is required")
    .max(20, "Full name must be less than 20 characters")
    .matches(
      /^[A-Za-z]+\s[A-Za-z]+$/,
      "Full name must include first and last name, letters only"
    ),
  email: yup.string().email().required("Email is required").trim(),
});

export { LoginValidation, RegisterValidation, ProfileValidation };
