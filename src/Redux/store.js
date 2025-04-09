import { combineReducers, configureStore } from "@reduxjs/toolkit";
import * as User from "./Reducers/userReducers";
import * as Category from "./Reducers/CategoryReducers";
import * as Movies from "./Reducers/MoviesReducers";

const rootReducer = combineReducers({
  // user reducers
  userLogin: User.userLoginReducer,
  userRegister: User.userRegisterReducer,
  userUpdateProfile: User.userUpdateProfileReducer,
  userDeleteProfile: User.userDeleteProfileReducer,
  userChangePassword: User.userChangePasswordReducer,
  userGetFavoriteMovies: User.userGetFavoriteMoviesReducer,
  userDeleteFavoriteMovie: User.userDeleteFavoriteMoviesReducer,
  adminGetAllUsers: User.adminGetAllUsersReducer,
  adminDeleteUser: User.adminDeleteUserReducer,
  userLikeMovie: User.userLikeMovieReducer,

  // category reducers
  getAllCategories: Category.getCategoriesReducer,
  adminAddcategory: Category.adminAddCategoryReducer,
  adminUpdateCategory: Category.adminUpdateCategoryReducer,
  deleteCategoryAdmin: Category.adminDeleteCategoryReducer,

  // movie reducers
  getAllMovies: Movies.moviesListReducer,
  getMovieById: Movies.moviesByIdReducer,
  getRandomMovies: Movies.moviesRandomReducer,
  getTopRatedMovies: Movies.moviesTopRatedReducer,
  addMovieReview: Movies.addMovieReviewReducer,
  deleteMovie: Movies.deleteMovieReducer,
  deleteAllMovies: Movies.deleteAllMoviesReducer,
  createMovie: Movies.addMovieReducer,
  updateMovie: Movies.updateMovieReducer,
  casts: Movies.CastsReducer,
});

// getuserInfo from localStorage
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

// InitialState
const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
});
