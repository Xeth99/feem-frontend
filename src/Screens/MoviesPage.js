import React, { useEffect, useMemo, useState } from "react";
import Layout from "../Layout/Layout";
import Filters from "../Components/Filters";
import Movie from "../Components/Movie";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { TbPlayerTrackNext, TbPlayerTrackPrev } from "react-icons/tb";
import Loader from "../Components/Notifications/Loader";
import { RiMovie2Line } from "react-icons/ri";
import { getMoviesAction } from "../Redux/Actions/MoviesActions";
import { useParams } from "react-router-dom";
import {fetchNowPlayingMovies} from "../Data/FiltersData"

function MoviesPage() {
  const { search } = useParams();
  const dispatch = useDispatch();
  const sameClass =
    "text-white py-2 px-4 rounded font-semibold border-2 border-subMain hover:bg-subMain";

  // all movies
  const { isLoading, isError, movies, pages, page } = useSelector(
    (state) => state.getAllMovies
  );

  // get all categories
  const { categories } = useSelector((state) => state.getAllCategories);

  useEffect(() => {
    // errors
    if (isError) {
      toast.error(isError);
    }
    // get all movies
    fetchNowPlayingMovies()
  
  }, [isError, dispatch]);

  // pagination next and previous pages
  const nextPage = () => {
    dispatch(getMoviesAction({ pageNumber: page + 1 }));
  };
  const previousPage = () => {
    dispatch(getMoviesAction({ pageNumber: page - 1 }));
  };

  return (
    <Layout>
      <div className="min-height-screen container mx-auto px-2 my-6">
        <Filters data={{}} />
        <p className="text-lg font-medium my-6">
          Total{" "}
          <span className="font-bold text-subMain">
            {movies ? movies?.length : 0}
          </span>{" "}
          items Found {search && `for "${search}"`}
        </p>
        {isLoading ? (
          <div className="w-full gap-6 flex-colo min-h-screen">
            <Loader />
          </div>
        ) : movies?.length > 0 ? (
          <>
            <div className="grid sm:mt-10 mt-6 xl:grid-cols-4 zxl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 gap-6">
              {movies.map((movie, index) => (
                <Movie key={index} movie={movie} />
              ))}
            </div>
            {/* {Loading More} */}
            <div className="w-full flex-rows gap-6 md:my-20 my-10">
              <button
                onClick={previousPage}
                disabled={page === 1}
                className={sameClass}
              >
                <TbPlayerTrackPrev className="text-xl" />
              </button>
              <button
                onClick={nextPage}
                disabled={page === pages}
                className={sameClass}
              >
                <TbPlayerTrackNext className="text-xl" />
              </button>
            </div>
          </>
        ) : (
          <div className="w-full gap-6 flex-colo min-h-screen">
            <div className="w-24 h-24 p-5 rounded-lg mb-4 bg-dry text-subMain text-4xl flex-colo">
              <RiMovie2Line />
            </div>
            <p className="text-border text-sm">
              It seems that we don't have any movies.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default MoviesPage;
