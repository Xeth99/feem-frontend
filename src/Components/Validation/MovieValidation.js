import React from "react";
import * as yup from "yup";

const ReviewValidation = yup.object().shape({
  rating: yup.number().required("Select a rating"),
  comment: yup
    .string()
    .required("Comment is required")
    .max(150, "Comment should be less than 150 characters"),
});

const MovieValidation = yup.object().shape({
  name: yup
    .string()
    .required("Please enter a movie name")
    .max(50, "Movie name should be less than 50 characters"),
  desc: yup
    .string()
    .required("Please enter a movie description")
    .max(300, "Movie description should be less than 300 characters"),
  language: yup.string().required("Please enter a movie language"),
  year: yup.number().required("Please enter year of release"),
  time: yup.number().required("Please enter a movie duration"),
  category: yup.string().required("Please select movie category"),
});
export { ReviewValidation, MovieValidation };
