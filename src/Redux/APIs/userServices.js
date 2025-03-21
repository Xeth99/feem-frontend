import Axios from "./Axios";

// ********** PUBLIC APIs **********

// register new user API call
const registerService = async (user) => {
  try {
    const { data } = await Axios.post("/users/sign_up", user);
    if (data) {
      localStorage.setItem("userInfo", JSON.stringify(data));
    }
    return data;
  } catch (error) {
    console.error("Register Error:", error.response?.data || error.message);
    throw error;
  }
};

// logout user Function
const logoutService = () => {
  localStorage.removeItem("userInfo");
  return null;
};

// login user API call
const loginService = async (user) => {
  try {
    const { data } = await Axios.post("/users/login", user);
    if (data) {
      localStorage.setItem("userInfo", JSON.stringify(data));
    }
    return data;
  } catch (error) {
    console.error("Login Error:", error.response?.data || error.message);
    throw error;
  }
};

// ********** PRIVATE APIs **********

// update profile API call
const updateProfileService = async (user, token) => {
  try {
    const { data } = await Axios.put("/users/profile", user, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (data) {
      localStorage.setItem("userInfo", JSON.stringify(data));
    }
    return data;
  } catch (error) {
    console.error(
      "Update Profile Error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// delete profile API call
const deleteProfileService = async (token) => {
  try {
    const { data } = await Axios.delete("/users/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (data) {
      localStorage.removeItem("userInfo");
    }
    return data;
  } catch (error) {
    console.error(
      "Delete Profile Error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// change password API call
const changePasswordService = async (passwords, token) => {
  try {
    const { data } = await Axios.put("/users/password", passwords, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.error(
      "Change Password Error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// get all favorite movies API call
const getFavoriteMoviesService = async (token) => {
  try {
    const { data } = await Axios.get("/users/favorites", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.error(
      "Get Favorite Movies Error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// delete all favorite movies API call
const deleteFavoriteMoviesService = async (token) => {
  try {
    const { data } = await Axios.delete("/users/favorites", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.error(
      "Delete Favorite Movies Error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// ********** ADMIN APIs **********

// Admin get all users API call
const getAllUsersService = async (token) => {
  try {
    const { data } = await Axios.get("/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.error(
      "Get All Users Error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// admin delete all users API call
const deleteUserService = async (id, token) => {
  try {
    const { data } = await Axios.delete(`/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.error(
      "Delete User Error:",
      error.response?.data || error.message
    );
    throw error;
  }
};
export {
  registerService,
  logoutService,
  loginService,
  updateProfileService,
  deleteProfileService,
  changePasswordService,
  getFavoriteMoviesService,
  deleteFavoriteMoviesService,
  getAllUsersService,
  deleteUserService,
};
