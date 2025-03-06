import React from "react";
import SideBar from "../SideBar";
import Table2 from "../../../Components/Table2"; 
import { UserData } from "../../../Data/MovieData";

function Users() {
  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2">
          <h2 className="text-xl font-bold">Users</h2>
          
        </div>
        <Table2 data={UserData} users={true} />
      </div>
    </SideBar>
  );
}

export default Users;
