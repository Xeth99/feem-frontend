import * as MoviesConstants from "../Constants/MoviesConstants";
import * as MoviesApi from "../APIs/MoviesServices";
import { ErrorAction } from "../Reducers/Protection";

// get all movies action
const getMoviesAction =
  ({
    category = "",
    time = "",
    language = "",
    rate = "",
    year = "",
    search = "",
    pageNumber = "",
  }) =>
  async (dispatch) => {
    try {
      dispatch({ type: MoviesConstants.MOVIES_LIST_REQUEST });
      const response = await MoviesApi.getMoviesService({
        category,
        time,
        language,
        rate,
        year,
        search,
        pageNumber,
      });
      dispatch({
        type: MoviesConstants.MOVIES_LIST_SUCCESS,
        payload: response,
      });
    } catch (error) {
      ErrorAction(error, dispatch, MoviesConstants.MOVIES_LIST_FAIL);
    }
  };

export { getMoviesAction };
