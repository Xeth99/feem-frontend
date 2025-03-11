import Axios from "./Axios";

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
    console.error("Update Profile Error:", error.response?.data || error.message);
    throw error;
  }
  
};

export { registerService, logoutService, loginService, updateProfileService };
