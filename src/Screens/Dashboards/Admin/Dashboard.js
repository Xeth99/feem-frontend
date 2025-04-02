import React, { useEffect } from "react";
import SideBar from "../SideBar";
import { FaRegListAlt, FaUser } from "react-icons/fa";
import { HiViewGridAdd } from "react-icons/hi";
import Table from "../../../Components/Table";
import { useDispatch, useSelector } from "react-redux";
import { adminGetAllUsersAction } from "../../../Redux/Actions/userActions";
import toast from "react-hot-toast";
import Loader from "../../../Components/Notifications/Loader";
import { Empty } from "../../../Components/Notifications/Empty";
import { getMoviesAction } from "../../../Redux/Actions/MoviesActions";
import { TbPlayerTrackNext, TbPlayerTrackPrev } from "react-icons/tb";

function Dashboard() {
  const dispatch = useDispatch();
  const {
    isLoading: catLoading,
    isError: catError,
    categories,
  } = useSelector((state) => state.getAllCategories);
  const {
    isLoading: userLoading,
    isError: userError,
    users,
  } = useSelector((state) => state.adminGetAllUsers);
  const { isLoading, isError, movies,  pages, page, totalMovies } = useSelector(
    (state) => state.getAllMovies
  );
  const sameClass =
    "text-white p-2 rounded font-semibold border-2 border-subMain hover:bg-subMain";

  useEffect(() => {
    // get all users
    dispatch(adminGetAllUsersAction());
    // errors
    if (catError || userError || isError) {
      toast.error(catError || userError || isError);
      dispatch({
        type: catError
          ? "GET_ALL_CATEGORIES_RESET"
          : userError
          ? "GET_ALL_USERS_RESET"
          : "MOVIES_LIST_RESET",
      });
    }
  }, [dispatch, catError, userError, isError]);

  const nextPage = () => {
    dispatch(getMoviesAction({ pageNumber: page + 1 }));
  };
  const previousPage = () => {
    dispatch(getMoviesAction({ pageNumber: page - 1 }));
  };

  const DashboardData = [
    {
      bg: "bg-orange-600",
      icon: FaRegListAlt,
      title: "Total Movies",
      total: isLoading ? "Loading..." : totalMovies || 0,
    },
    {
      bg: "bg-blue-700",
      icon: HiViewGridAdd,
      title: "Total Categories",
      total: catLoading ? "Loading..." : categories?.length || 0,
    },
    {
      bg: "bg-green-600",
      icon: FaUser,
      title: "Total Users",
      total: userLoading ? "Loading..." : users?.length || 0,
    },
  ];
  return (
    <SideBar>
      <h2 className="text-xl font-bold">Dashboard</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {DashboardData.map((data, index) => (
          <div
            key={index}
            className="p-4 rounded bg-main border-border grid grid-cols-4 gap-2"
          >
            <div
              className={`col-span-1 rounded-full h-12 w-12 flex-colo ${data.bg}`}
            >
              <data.icon />
            </div>
            <div className="col-span-3">
              <h2 className="">{data.title}</h2>
              <p className=" mt-2 font-bold">{data.total}</p>
            </div>
          </div>
        ))}
      </div>
      <h3 className="text-md font-medium my-6 text-border">Recent Movies</h3>
      {isLoading ? (
        <Loader />
      ) : movies?.length > 0 ? (
        <>
        <Table data={movies?.slice(0, 5)} admin={true} />
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
        <Empty message={"Movies appear here."} />
      )}
    </SideBar>
  );
}

export default Dashboard;
