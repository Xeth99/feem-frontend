import React, { useEffect, useState } from "react";
import SideBar from "../SideBar";
import Table2 from "../../../Components/Table2";
import { HiPlusCircle } from "react-icons/hi";
import CategoryModal from "../../../Components/Modals/CategoryModal";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryAction } from "../../../Redux/Actions/CategoryActons";
import { Empty } from "../../../Components/Notifications/Empty";
import Loader from "../../../Components/Notifications/Loader";

function Categories() {
  const [modalOpen, setModalOpen] = useState(false);
  const [category, setCategory] = useState();
  const dispatch = useDispatch();

  const { categories, isLoading, isError } = useSelector(
    (state) => state.getCategories
  );

  const onEditFunction = (id) => {
    setCategory(id);
    setModalOpen(!modalOpen);
  };

  useEffect(() => {
    dispatch(getCategoryAction());
    if (modalOpen === false) {
      setCategory();
    }
  }, [modalOpen, dispatch]);

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
          />
        ) : (
          <Empty message={"Your categories movies will appear here."} />
        )}
      </div>
    </SideBar>
  );
}

export default Categories;
