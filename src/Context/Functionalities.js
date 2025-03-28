import toast from "react-hot-toast";
import { useSelector } from "react-redux";

// check if movie is added to favorites
const CheckFavorite = (movie) => {
  const { likedMovies } = useSelector((state) => state.userGetFavoriteMovies);
  return likedMovies?.find((likedMovie) => likedMovie?._id === movie?._id);
};

// liked movies functionality
const LikeMovie = (movie, dispatch, userInfo) => {
  return !userInfo
    ? toast.error("Please login to add movie to favorites")
    : dispatch(userLikeMovieAction({ movieId: movie?._id }));
};

export { CheckFavorite, LikeMovie };
