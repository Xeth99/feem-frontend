import Axios from "./Axios";

// ********** PUBLIC APIs **********

// Get all movies API function
const getMoviesService = async ({
  category,
  time,
  language,
  rate,
  year,
  search,
  pageNumber,
}) => {
  const { data } = await Axios.get(`/movies`, {
    params: {
      category,
      time,
      language,
      rate,
      year,
      search,
      pageNumber,
    },
  });
  return data;
};

// get random movies API function
const getRandomMoviesService = async () => {
  const { data } = await Axios.get("/movies/random/all");
  return data;
};

// get movie by id API function
const getMovieByIdService = async (id) => {
  const { data } = await Axios.get(`/movies/${id}`);
  return data;
};

// get top rated movies API function
const getTopRatedMoviesService = async () => {
  const { data } = await Axios.get("/movies/rated/top");
  return data;
};

export {
  getMoviesService,
  getRandomMoviesService,
  getMovieByIdService,
  getTopRatedMoviesService,
};
