import React, { useEffect, useState } from "react";
import SideBar from "../SideBar";
import Table2 from "../../../Components/Table2";
import { HiPlusCircle } from "react-icons/hi";
import CategoryModal from "../../../Components/Modals/CategoryModal";
import { useDispatch, useSelector } from "react-redux";
import { adminDeleteCategoryAction, getCategoryAction } from "../../../Redux/Actions/CategoryActions";
import { Empty } from "../../../Components/Notifications/Empty";
import Loader from "../../../Components/Notifications/Loader";
import toast from "react-hot-toast";

function Categories() {
  const [modalOpen, setModalOpen] = useState(false);
  const [category, setCategory] = useState();
  const dispatch = useDispatch();

  // get all categories
  const { categories, isLoading } = useSelector(
    (state) => state.getAllCategories
  );

  // delete category
  const { isError, isSuccess } = useSelector(
    (state) => state.deleteCategoryAdmin
  );

  const adminDeleteCategory = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      dispatch(adminDeleteCategoryAction(id));
    }
  };

  const onEditFunction = (id) => {
    setCategory(id);
    setModalOpen(!modalOpen);
  };

  useEffect(() => {
    dispatch(getCategoryAction());
    if (isError) {
      toast.error(isError);
      dispatch({ type: "DELETE_CATEGORY_RESET" });
    }
    if (isSuccess) {
      dispatch({ type: "DELETE_CATEGORY_RESET" });
    }
    if (modalOpen === false) {
      setCategory();
    }
  }, [modalOpen, dispatch, isError, isSuccess]);

  return (
    <SideBar>
      <CategoryModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        category={category}
      />
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2">
          <h2 className="text-xl font-bold">Categories</h2>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-subMain flex-rows gap-4 font-medium transitions hover:bg-main border border-subMain text-white py-2 px-4 rounded"
          >
            <HiPlusCircle /> Create
          </button>
        </div>
        {isLoading ? (
          <Loader />
        ) : categories?.length > 0 ? (
          <Table2
            data={categories}
            users={false}
            onEditFunction={onEditFunction}
            onDeleteFunction={adminDeleteCategory}
          />
        ) : (
          <Empty message={"Your categories movies will appear here."} />
        )}
      </div>
    </SideBar>
  );
}

export default Categories;
