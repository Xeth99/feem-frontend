import React, { useEffect } from "react";
import Titles from "../Titles";
import { BsBookmarkStarFill } from "react-icons/bs";
import { Message, Select } from "../UsedInputs.js";
import Rating from "../Home/Stars.js";
import { Empty } from "../Notifications/Empty";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ReviewValidation } from "../Validation/MovieValidation.js";
import { addMovieReviewAction } from "../../Redux/Actions/MoviesActions.js";
import toast from "react-hot-toast";
import { InlineError } from "../Notifications/Error.js";
import { Link } from "react-router-dom";

const Ratings = [
  {
    title: "0-Poor",
    value: 0,
  },
  {
    title: "1-Fair",
    value: 1,
  },
  {
    title: "2-Good",
    value: 2,
  },
  {
    title: "3-Very Good",
    value: 3,
  },
  {
    title: "4-Excellent",
    value: 4,
  },
  {
    title: "5-Masterpiece",
    value: 5,
  },
];
function MovieRates({ movie }) {
  const dispatch = useDispatch();
  const { isLoading, isError } = useSelector((state) => state.addMovieReview);
  const { userInfo } = useSelector((state) => state.userLogin);

  // validate review
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ReviewValidation),
  });

  // on submit
  const onSubmit = (data) => {
    dispatch(addMovieReviewAction({ id: movie?._id, review: { ...data } }));
  };

  useEffect(() => {
    if (isError) {
      toast.error(isError);
      dispatch({ type: "ADD_MOVIE_REVIEW_RESET" });
    }
  }, [isError, dispatch]);
  return (
    <div className="my-12">
      <Titles title="Reviews" Icon={BsBookmarkStarFill} />
      <div className="mt-10 xl:grid flex-colo grid-cols-5 gap-12 bg-dry xs:p-10 py-10 px-2 sm:p-20 rounded">
        {/* write reviews */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="xl:col-span-2 w-full flex flex-col gap-8"
        >
          <h3 className="text-xl text-text font-semibold">
            Review "{movie?.name}"
          </h3>
          <p className="text-sm leading-7 font-medium text-border">
            Your review about <span className="font-bold">{movie?.name}</span>{" "}
            would be appreciated.
          </p>
          <div className="text-sm w-full">
            <Select
              label="Select Rating"
              options={Ratings}
              name="rating"
              register={{ ...register("rating") }}
            />
            <div className="flex mt-4 text-lg gap-2 text-star">
              <Rating value={watch("rating", false)} />
            </div>
            {errors?.rating && <InlineError text={errors?.rating?.message} />}
          </div>
          {/* message */}
          <div className="w-full">
            <Message
              label="Message"
              placeholder={"Message..."}
              name="comment"
              register={{ ...register("comment") }}
            />
            {errors?.comment && <InlineError text={errors?.comment?.message} />}
          </div>
          {/* submit */}
          {userInfo ? (
            <button
              disabled={isLoading}
              type="submit"
              className="bg-subMain text-white py-4 w-full flex-colo rounded"
            >
              {isLoading ? "Loading..." : "Submit"}
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-main border border-border text-subMain py-4 w-full flex-colo rounded"
            >
              Login to review this movie
            </Link>
          )}
        </form>
        {/* Reviewers */}
        <div className="col-span-3 flex w-full flex-col gap-6">
          <h3 className="text-xl text-text font-semibold">
            Reviews ({movie?.vote_count})
          </h3>
          <div className="w-full flex flex-col bg-main gap-6 rounded-lg md:p-12 p-6 h-header overflow-y-scroll">
            {movie?.reviews?.length > 0 ? (
              movie?.reviews?.map((review, i) => (
                <div
                  key={review?._id}
                  className="md:grid flex flex-col w-full grid-cols-12 gap-6 bg-dry p-4 border border-gray-800 rounded-lg"
                >
                  <div className="col-span-2 bg-main hidden md:block">
                    <img
                      src={
                        review?.userImage
                          ? review?.userImage
                          : "/images/logo.jpeg"
                      }
                      alt={review?.userName}
                      className="w-full h-24 rounded-lg object-cover"
                    />
                  </div>
                  <div className="col-span-7 flex flex-col gap-2">
                    <h2>{review?.userName}</h2>
                    <p className="text-xs leading-6 font-medium text-text">
                      {review?.comment}
                    </p>
                  </div>
                  {/* rates */}
                  <div className="col-span-3 flex-rows border-l border-border text-xs gap-1 text-star">
                    <Rating value={review?.rating} />
                  </div>
                </div>
              ))
            ) : (
              <Empty message={`Be the first to rate "${movie?.name}"`} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieRates;
