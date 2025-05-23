import React from "react";
import Titles from "../Titles";
import { BsCollectionFill } from "react-icons/bs";
import Movie from "../Movie";
import Loader from "../Notifications/Loader.js";
import { Empty } from "../Notifications/Empty.js";

function PopularMovies({ isLoading, movies }) {
  return (
    <div className="my-16">
      <Titles title="Popular Movies" Icon={BsCollectionFill} />
      {isLoading ? (
        <Loader />
      ) : movies?.length > 0 ? (
        <div className="grid sm:mt-12 mt-6 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
          {movies.slice(0, 8).map((movie) => (
            <Movie key={movie?._id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="mt-6">
          <Empty message="No popular movies found" />
        </div>
      )}
    </div>
  );
}

export default PopularMovies;
