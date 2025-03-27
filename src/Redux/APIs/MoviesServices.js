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
      pageNumber 
    }
  });
  return data;
};

export { getMoviesService };
