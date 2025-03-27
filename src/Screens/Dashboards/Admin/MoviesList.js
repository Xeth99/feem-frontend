import React, { useEffect } from "react";
import SideBar from "../SideBar";
import Table from "../../../Components/Table";
import { useDispatch, useSelector } from "react-redux";
import { getMoviesAction } from "../../../Redux/Actions/MoviesActions";
import toast from "react-hot-toast";
import Loader from "../../../Components/Notifications/Loader";
import { Empty } from "../../../Components/Notifications/Empty";
import { TbPlayerTrackNext, TbPlayerTrackPrev } from "react-icons/tb";

function MoviesList() {
  const dispatch = useDispatch();
  const { isLoading, isError, movies, pages, page, totalMovies } = useSelector(
    (state) => state.getAllMovies
  );

  const sameClass =
    "text-white p-2 rounded font-semibold border-2 border-subMain hover:bg-subMain";

  useEffect(() => {
    if (isError) {
      toast.error(isError);
    }
    dispatch(getMoviesAction({}));
  }, [dispatch, isError]);

  // pagination next and previous pages
  const nextPage = () => {
    dispatch(getMoviesAction({ pageNumber: page + 1 }));
  };
  const previousPage = () => {
    dispatch(getMoviesAction({ pageNumber: page - 1 }));
  };

  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2">
          <h2 className="text-xl font-bold">Movies List</h2>
          <button className="bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded">
            Delete All
          </button>
        </div>
        {isLoading ? (
          <Loader />
        ) : movies?.length > 0 ? (
          <>
            <Table data={movies} admin={true} />
            {/* {Loading More} */}
            <div className="w-full flex-rows gap-6 my-5">
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
          <Empty message={"Movies list will appears here."} />
        )}
      </div>
    </SideBar>
  );
}

export default MoviesList;
