import React, { useEffect, useState } from "react";
import SideBar from "../SideBar";
import { Input, Message, Select } from "../../../Components/UsedInputs";
import Uploader from "../../../Components/Uploader";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { ImUpload } from "react-icons/im";
import CastsModal from "../../../Components/Modals/CastsModal";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { MovieValidation } from "../../../Components/Validation/MovieValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  addMovieAction,
  deleteCastAction,
} from "../../../Redux/Actions/MoviesActions";
import toast from "react-hot-toast";
import { InlineError } from "../../../Components/Notifications/Error";
import { ImagePreview } from "../../../Components/ImagePreview";

function AddMovies() {
  const [modalOpen, setModalOpen] = useState(false);
  const [cast, setCast] = useState(null);
  const [imageWithoutTitle, setImageWithoutTitle] = useState("");
  const [imageTitle, setImageTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // use selector
  const { categories } = useSelector((state) => state.getAllCategories);
  const { isLoading, isError, isSuccess } = useSelector(
    (state) => state.createMovie
  );
  const { casts } = useSelector((state) => state.casts);

  // validate movie
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(MovieValidation),
  });

  // on submit
  const onSubmit = (data) => {
    dispatch(
      addMovieAction({
        ...data,
        image: imageWithoutTitle,
        titleImage: imageTitle,
        video: videoUrl,
        casts,
      })
    );
  };

  // delete casts
  const deleteCastsHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this cast?")) {
      dispatch(deleteCastAction(id));
    }
    toast.success("Cast deleted!");
  };

  useEffect(() => {
    // if modal is false then reset casts
    if (modalOpen === false) {
      setCast();
    }
    // if it's success then reset form and navigate to addMovie
    if (isSuccess) {
      reset({
        name: "",
        desc: "",
        language: "",
        year: 0,
        time: 0,
        category: "",
      });
      setImageTitle("");
      setImageWithoutTitle("");
      setVideoUrl("");
      dispatch({ type: "ADD_MOVIE_RESET" });
      navigate("/addMovie");
    }
    // if error then show error
    if (isError) {
      toast.error("Something went wrong!");
      dispatch({ type: "ADD_MOVIE_RESET" });
    }
  }, [modalOpen, isSuccess, reset, navigate, isError, dispatch]);

  return (
    <SideBar>
      <CastsModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        cast={cast}
      />
      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-bold"> Create Movies</h2>
        <div className="w-full grid md:grid-cols-2 gap-6">
          <div className="w-full">
            <Input
              label="Movie Title"
              placeholder="Game of Thrones"
              type="text"
              name="name"
              register={register("name")}
              bg={true}
            />
            {errors.name && <InlineError text={errors.name.message} />}
          </div>
          <div className="w-full">
            <Input
              label="Hours"
              placeholder="2Hrs:30mins"
              type="number"
              bg={true}
              name="time"
              register={register("time")}
            />
            {errors.time && <InlineError text={errors.time.message} />}
          </div>
        </div>
        <div className="w-full grid md:grid-cols-2 gap-6">
          <div className="w-full">
            <Input
              label="Language Used"
              placeholder="English"
              type="text"
              bg={true}
              name="language"
              register={register("language")}
            />
            {errors.language && <InlineError text={errors.language.message} />}
          </div>
          <div className="w-full">
            <Input
              label="Year of Release"
              placeholder="2022"
              type="number"
              bg={true}
              name="year"
              register={register("year")}
            />
            {errors.year && <InlineError text={errors.year.message} />}
          </div>
        </div>

        {/* IMAGES */}
        <div className="w-full grid md:grid-cols-2 gap-6">
          {/* img without title */}
          <div className="flex flex-col gap-2">
            <p className="text-border font-semibold text-sm">
              Image without Title
            </p>
            <Uploader setImageUrl={setImageWithoutTitle} value={imageWithoutTitle} />
            <ImagePreview image={imageWithoutTitle} name="imageWithoutTitle" />
          </div>

          {/* image with title */}
          <div className="flex flex-col gap-2">
            <p className="text-border font-semibold text-sm">
              Image with Title
            </p>
            <Uploader setImageUrl={setImageTitle} />
            <ImagePreview image={imageTitle} name="imageTitle" />
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="w-full">
          <Message
            label="Movie Description"
            placeholder="Make is short"
            name="desc"
            register={{ ...register("desc") }}
          />
          {errors.desc && <InlineError text={errors.desc.message} />}
        </div>

        {/* CATEGORY */}
        <div className="text-sm w-full">
          <Select
            label="Movie Category"
            options={categories?.length > 0 ? categories : []}
            name="category"
            register={{ ...register("category") }}
          />
          {errors.category && <InlineError text={errors.category.message} />}
        </div>

        {/* MOVIE VIDEOS */}
        <div className="flex flex-col gap-2 w-full">
          <label className="text-border font-semibold text-sm">
            Movie Video
          </label>
          <div className={`w-full grid ${videoUrl && "md:grid-cols-2"} gap-6`}>
            {videoUrl && (
              <div className="w-full bg-main text-sm text-subMain py-4 border border-border rounded flex-colo">
                Video Uploaded!
              </div>
            )}
            <Uploader setImageUrl={setVideoUrl} />
          </div>
        </div>

        {/* CASTS */}
        <div className="w-full grid lg:grid-cols-2 gap-6 items-start">
          <button
            onClick={() => setModalOpen(true)}
            className="w-full py-4 bg-main border border-subMain border-dashbed text-white rounded"
          >
            Add Cast
          </button>
          <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-4 grid-cols-2 gap-4">
            {casts?.length > 0 &&
              casts?.map((user) => (
                <div
                  key={user?.id}
                  className="p-2 italic text-xs text-text rounded flex-colo bg-main border border-border"
                >
                  <img
                    src={`${user?.image ? user?.image : "/images/logo.jpeg"}`}
                    alt={user?.name}
                    className="w-full h-24 object-cover rounded mb-2"
                  />
                  <p>{user?.name}</p>
                  <div className="flex-rows mt-2 w-full gap-2">
                    <button
                      onClick={() => deleteCastsHandler(user?.id)}
                      className="w-6 h-6 flex-colo bg-dry border  border-border text-subMain rounded"
                    >
                      <MdDelete />
                    </button>
                    <button
                      onClick={() => {
                        setCast(user);
                        setModalOpen(true);
                      }}
                      className="w-6 h-6 flex-colo bg-dry border border-border text-green-600 rounded"
                    >
                      <FaEdit />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* SUBMIT */}
        <button
          disabled={isLoading}
          onClick={handleSubmit(onSubmit)}
          className="bg-subMain w-full flex-rows gap-6 font-medium  text-white py-4 rounded"
        >
          {isLoading ? (
            "Please wait..."
          ) : (
            <>
              {" "}
              <ImUpload />
              Publish Movie
            </>
          )}
        </button>
      </div>
    </SideBar>
  );
}

export default AddMovies;
