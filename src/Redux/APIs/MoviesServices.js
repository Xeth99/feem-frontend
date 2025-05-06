import Axios from "./Axios";

// ********** PUBLIC APIs **********

// Get all movies API function
const getMoviesService = async ({ language, region, page, with_genres }) => {
  const { data } = await Axios.get(`/movies/tmdb/now_playing`, {
    params: {
      language,
      region,
      page,
      with_genres,
    },
  });
  return data;
};

// get random movies API function
const getRandomMoviesService = async () => {
  const { data } = await Axios.get("/movies/tmdb/popular");
  return data;
};

// get movie by id API function
const getMovieByIdService = async (id) => {
  const { data } = await Axios.get(`/movies/tmdb/movie/${id}/with-video`);
  return data;
};

// get top rated movies API function
const getTopRatedMoviesService = async () => {
  const { data } = await Axios.get("/movies/tmdb/rated/top");
  return data;
};

// review movies API function
const reviewMovieService = async (id, token, review) => {
  const { data } = await Axios.post(`/movies/${id}/reviews`, review, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// delete movie API function
const deleteMovieService = async (id, token) => {
  const { data } = await Axios.delete(`/movies/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// delete all movies API function
const deleteAllMoviesService = async (token) => {
  const { data } = await Axios.delete(`/movies`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// create movie API function
const addMovieService = async (movie, token) => {
  const { data } = await Axios.post(`/movies`, movie, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// update movie API function
const updateMovieService = async (token, id, movie) => {
  const { data } = await Axios.put(`/movies/${id}`, movie, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export {
  getMoviesService,
  getRandomMoviesService,
  getMovieByIdService,
  getTopRatedMoviesService,
  reviewMovieService,
  deleteMovieService,
  deleteAllMoviesService,
  addMovieService,
  updateMovieService,
};
