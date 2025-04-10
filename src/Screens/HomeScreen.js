import React, { useEffect } from "react";
import Layout from "../Layout/Layout";
import Banner from "../Components/Home/Banner";
import PopularMovies from "../Components/Home/PopularMovies";
import TopRated from "../Components/Home/TopRated";
import Promos from "../Components/Home/Promos";
import { useDispatch, useSelector } from "react-redux";
import {
  getMoviesAction,
  getRandomMoviesAction,
  getTopRatedMoviesAction,
} from "../Redux/Actions/MoviesActions";
import toast from "react-hot-toast";

function HomeScreen() {
  const dispatch = useDispatch();

  const {
    isLoading: randomLoading,
    isError: randomError,
    movies: randomMovies,
  } = useSelector((state) => state.getRandomMovies);
  const {
    isLoading: topLoading,
    isError: topError,
    movies: topMovies,
  } = useSelector((state) => state.getTopRatedMovies);
  const { isLoading, isError, movies } = useSelector(
    (state) => state.getAllMovies
  );

  useEffect(() => {
    // get random movies
    dispatch(getRandomMoviesAction());
    // get all movies
    dispatch(getMoviesAction());
    // get top rated movies
    dispatch(getTopRatedMoviesAction());
    // errors
    if (randomError || topError || isError) {
      toast.error(randomError || topError || isError);
      dispatch({
        type: randomError
          ? "GET_RANDOM_MOVIES_RESET"
          : topError
          ? "GET_TOP_RATED_MOVIES_RESET"
          : "GET_ALL_MOVIES_RESET",
      });
    }
  }, [dispatch, randomError, topError, isError]);

  return (
    <Layout>
      <div className="container mx-auto min-h-screen px-2 mb-6">
        <Banner movies={movies} isLoading={isLoading} />
        <PopularMovies movies={randomMovies} isLoading={randomLoading} />
        <Promos />
        <TopRated movies={topMovies} isLoading={topLoading} />
      </div>
    </Layout>
  );
}

export default HomeScreen;
