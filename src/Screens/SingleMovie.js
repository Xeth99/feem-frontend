import React, { useContext, useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { useParams } from "react-router-dom";
import MovieInfo from "../Components/Singles/MovieInfo";
import MovieCasts from "../Components/Singles/MovieCast";
import MovieRates from "../Components/Singles/MovieRates";
import Titles from "../Components/Titles";
import { BsCollectionFill } from "react-icons/bs";
import Movie from "../Components/Movie";
import ShareMovieModal from "../Components/Modals/ShareMovieModal";
import { useDispatch, useSelector } from "react-redux";
import { getMovieByIdAction } from "../Redux/Actions/MoviesActions";
import Loader from "../Components/Notifications/Loader";
import { RiMovie2Line } from "react-icons/ri";
import { SidebarContext } from "../Context/DrawerContext";
import { DownloadMovie } from "../Context/Functionalities";
import FileSaver from "file-saver";

function SingleMovie() {
  const [modalOpen, setModalOpen] = useState(true);
  const { progress, setProgress } = useContext(SidebarContext);
  const { id } = useParams();
  const dispatch = useDispatch();
  const sameClass = "flex gap-6 flex-colo min-h-screen";
  // use selector
  const { isLoading, isError, movie } = useSelector(
    (state) => state.getMovieById
  );
  const { movies } = useSelector((state) => state.getAllMovies);

  // related movies
  const RelatedMovies =
    movies?.filter((m) => m?.category === movie?.category) || [];

  // download movie video
  const DownloadMovieVideo = async (videoUrl, name) => {
    await DownloadMovie(videoUrl, setProgress).then((data) => {
      setProgress(0);
      FileSaver.saveAs(data, name);
    });
  };

  useEffect(() => {
    dispatch(getMovieByIdAction(id));
  }, [dispatch, id]);
  return (
    <Layout>
      {isLoading ? (
        <div className={sameClass}>
          <Loader />
        </div>
      ) : isError ? (
        <div className={sameClass}>
          <div className="flex-colo w-24 h-24 p-5 mb-4 rounded-full bg-dry text-subMain text-4xl">
            <RiMovie2Line />
          </div>
          <p className="text-border text-sm">Something went wrong</p>
        </div>
      ) : (
        <>
          <ShareMovieModal
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            movie={movie}
          />
          <MovieInfo
            movie={movie}
            setModalOpen={setModalOpen}
            DownloadMovie={DownloadMovieVideo}
            progress={progress}
          />
          <div className="container mx-auto min-h-screen px-2 my-6">
            <MovieCasts movie={movie} />
            {/* {rate} */}
            <MovieRates movie={movie} />
            {/* related */}
            {RelatedMovies?.length > 0 && (
              <div className="my-16">
                <Titles title="Related Movies" Icon={BsCollectionFill} />
                <div className="grid sm:mt-10 mt-6 xl:grid-cols-4 zxl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 gap-6">
                  {RelatedMovies?.map((movie) => (
                    <Movie key={movie?._id} movie={movie} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </Layout>
  );
}

export default SingleMovie;
