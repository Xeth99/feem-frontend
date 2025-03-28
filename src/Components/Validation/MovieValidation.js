import React from "react";
import * as yup from "yup";

const ReviewValidation = yup.object().shape({
  rating: yup.number().required("Select a rating"),
  comment: yup
    .string()
    .required("Comment is required")
    .max(150, "Comment should be less than 150 characters"),
});

export { ReviewValidation };
