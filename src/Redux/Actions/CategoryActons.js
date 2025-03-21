import * as categoryConstants from "../Constants/CategoryConstants";
import * as categoryApi from "../APIs/CategoriesService";
import toast from "react-hot-toast";
import { ErrorAction, tokenProtection } from "../Reducers/Protection";

// Get all category action
const getCategoryAction = () => async (dispatch) => {
  try {
    dispatch({ type: categoryConstants.GET_ALL_CATEGORIES_REQUEST });
    const response = await categoryApi.getCategoriesService();
    dispatch({
      type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorAction(error, dispatch, categoryConstants.GET_ALL_CATEGORIES_FAIL);
  }
};

// admin add category action
const adminAddcategoryAction = (title) => async (dispatch, getState) => {
  try {
    dispatch({ type: categoryConstants.ADD_CATEGORY_REQUEST });
    await categoryApi.createcategoryService(title, tokenProtection(getState));
    dispatch({
      type: categoryConstants.ADD_CATEGORY_SUCCESS,
    });
    toast.success("Category created successfully!");
  } catch (error) {
    ErrorAction(error, dispatch, categoryConstants.ADD_CATEGORY_FAIL);
  }
};

// admin update category action
const adminUpdateCategory = (id, title) => async (dispatch, getState) => {
  try {
    dispatch({ type: categoryConstants.UPDATE_CATEGORY_REQUEST });
    const response = await categoryApi.getCategoriesService(
      id,
      title,
      tokenProtection(getState)
    );
    dispatch({
      type: categoryConstants.UPDATE_CATEGORY_SUCCESS,
      payload: response,
    });
    toast.success("Category updated successfully!");
  } catch (error) {
    ErrorAction(error, dispatch, categoryConstants.UPDATE_CATEGORY_FAIL);
  }
};

// admin update category action
const adminDeleteCategory = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: categoryConstants.UPDATE_CATEGORY_REQUEST });
    const response = await categoryApi.getCategoriesService(
      id,
      tokenProtection(getState)
    );
    dispatch({
      type: categoryConstants.DELETE_CATEGORY_SUCCESS,
      payload: response,
    });
    toast.success("Category deleted successfully!");
  } catch (error) {
    ErrorAction(error, dispatch, categoryConstants.DELETE_CATEGORY_FAIL);
  }
};

export {
  getCategoryAction,
  adminAddcategoryAction,
  adminUpdateCategory,
  adminDeleteCategory,
};
