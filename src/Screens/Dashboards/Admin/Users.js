import React, { useEffect } from "react";
import SideBar from "../SideBar";
import Table2 from "../../../Components/Table2";
import { useDispatch, useSelector } from "react-redux";
import {
  adminDeleteUserAction,
  adminGetAllUsersAction,
} from "../../../Redux/Actions/userActions";
import toast from "react-hot-toast";
import Loader from "../../../Components/Notifications/Loader";
import { Empty } from "../../../Components/Notifications/Empty";

function Users() {
  const dispatch = useDispatch();

  const { isLoading, isError, users } = useSelector(
    (state) => state.adminGetAllUsers
  );

  // delete favorite movies
  const { isError: deleteError, isSuccess } = useSelector(
    (state) => state.adminDeleteUser
  );

  // delete movie handler
  const deleteUserHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(adminDeleteUserAction(id));
    }
  };

  useEffect(() => {
    dispatch(adminGetAllUsersAction());
    if (isError || deleteError) {
      toast.error(isError || deleteError);
      dispatch({
        type: isError ? "GET_ALL_USERS_RESET" : "DELETE_USER_RESET",
      });
    }
  }, [dispatch, isError, deleteError, isSuccess]);
  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2">
          <h2 className="text-xl font-bold">All Users</h2>
        </div>
        {isLoading ? (
          <Loader />
        ) : users?.length > 0 ? (
          <Table2
            data={users}
            users={true}
            onDeleteFunction={deleteUserHandler}
          />
        ) : (
          <Empty message={"You don't have any users"} />
        )}
      </div>
    </SideBar>
  );
}

export default Users;
