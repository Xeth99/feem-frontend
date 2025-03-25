import React, { useEffect, useState } from "react";
import MainModal from "./MainModal";
import { Input } from "../UsedInputs";
import { useDispatch, useSelector } from "react-redux";
import {
  adminAddcategoryAction,
  adminUpdateCategoryAction,
} from "../../Redux/Actions/CategoryActions";
import toast from "react-hot-toast";

function CategoryModal({ modalOpen, setModalOpen, category }) {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const { isLoading, isError, isSuccess } = useSelector(
    (state) => state.adminAddcategory
  );
  const {
    isLoading: upLoading,
    isError: upError,
    isSuccess: upSuccess,
  } = useSelector((state) => state.adminUpdateCategory);

  // submit a category handler
  const submitHandler = (e) => {
    e.preventDefault();
    if (title) {
      // if category isn't empty, update category, hence, create one
      if (category) {
        dispatch(adminUpdateCategoryAction(category?._id, { title: title }));
        setModalOpen(!modalOpen);
      } else {
        dispatch(adminAddcategoryAction({ title: title }));
        setTitle("");
      }
    } else {
      toast.error("Category can't be empty");
    }
  };

  useEffect(() => {
    // error
    if (upError || isError) {
      toast.error(upError || isError);
      dispatch({
        type: isError ? "ADD_CATEGORY_RESET" : "UPDATE_CATEGORY_RESET",
      });
    }

    // success
    if (upSuccess || isSuccess) {
      dispatch({
        type: isSuccess ? "ADD_CATEGORY_RESET" : "UPDATE_CATEGORY_RESET",
      });
      setModalOpen(false);
    }

    // if category is not null, then set title to category title
    if (category) {
      setTitle(category?.title);
    }

    // if modal is closed, set title to empty
    if (modalOpen === false) {
      setTitle("");
    }
  }, [
    isError,
    isSuccess,
    upError,
    upSuccess,
    dispatch,
    modalOpen,
    category,
    setModalOpen,
  ]);

  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div className="inline-block sm:w-4/5 border border-border md:w-3/5 lg:w-2/3 w-full align-middle p-10 overflow-y-auto h-full bg-main text-white rounded-2xl">
        <h2 className="text-3xl font-bold text-center">{category ? "Update" : "Create"}</h2>
        <form
          className="flex flex-col gap-6 text-left mt-6"
          onSubmit={submitHandler}
        >
          <Input
            label="Category Name"
            placeholder={"Actions"}
            type="text"
            bg={false}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            disabled={isLoading || upLoading}
            type="submit"
            className="w-full flex-rows gap-4 py-3 text-lg transitions hover:bg-dry border-2 bg-subMain rounded text-white"
          >
            {isLoading || upLoading
              ? "Loading..."
              : category
              ? "Update"
              : "Create"}
          </button>
        </form>
      </div>
    </MainModal>
  );
}

export default CategoryModal;
