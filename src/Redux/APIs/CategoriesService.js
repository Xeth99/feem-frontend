import Axios from "axios";

// ********** PUBLIC APIs **********

// Get all categories API function
const getCategoriesService = async () => {
  try {
    const { data } = await Axios.get("/categories");
    return data;
  } catch (error) {
    console.error(
      "Get Categories Error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// ********** ADMIN APIs **********

// Admin create new Category API function
const createcategoryService = async (title, token) => {
  try {
    const { data } = await Axios.post("/categories", title, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.error(
      "Create Category Error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Admin update category API function
const updateCategoryService = async (id, token, title) => {
  try {
    const { data } = await Axios.put(`/categories/${id}`, title, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.error(
      "Update Category Error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Admin delete category API function
const deleteCategoryService = async (id, token) => {
  try {
    const { data } = await Axios.put(`/categories/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.error(
      "Delete Category Error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export {
  getCategoriesService,
  createcategoryService,
  updateCategoryService,
  deleteCategoryService,
}
