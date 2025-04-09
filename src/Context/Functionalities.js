import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { userLikeMovieAction } from "../Redux/Actions/userActions";
import Axios from "../Redux/APIs/Axios";
import { IoMdCloudDownload } from "react-icons/io";

// check if movie is added to favorites
const IfMovieLiked = (movie) => {
  const { likedMovies } = useSelector((state) => state.userGetFavoriteMovies);
  return likedMovies?.find((likedMovie) => likedMovie?._id === movie?._id);
};

// liked movies functionality
const LikeMovie = (movie, dispatch, userInfo) => {
  return !userInfo
    ? toast.error("Please login to add movie to favorites")
    : dispatch(userLikeMovieAction({ movieId: movie?._id }));
};

// download movie functionality
const DownloadMovie = async (videoUrl, setProgress) => {
  const { data } = await Axios({
    url: videoUrl,
    method: "GET",
    responseType: "blob",
    onDownloadProgress: (progressEvent) => {
      const { loaded, total } = progressEvent;
      let percentCompleted = Math.floor((loaded * 100) / total);
      setProgress(percentCompleted);
      if (percentCompleted > 0 && percentCompleted < 100) {
        toast.loading(`Downloading... ${percentCompleted}%`, {
          id: "download",
          duration: 100000000,
          position: "bottom-right",
          style: {
            background: "#0B0F29",
            color: "#fff",
            borderRadius: "10px",
            border: ".5px solid #F20000",
            padding: "16px",
          },
          icon: <IoMdCloudDownload className="text-2xl mr-2 text-subMain" />,
        });
      } else {
        toast.dismiss("download");
      }
    },
  });
  return data;
};

export { IfMovieLiked, LikeMovie, DownloadMovie };
