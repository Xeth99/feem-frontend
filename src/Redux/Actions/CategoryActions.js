import * as CategoryConstants from "../Constants/CategoryConstants";
import * as CategoryApi from "../APIs/CategoriesService";
import toast from "react-hot-toast";
import { ErrorAction, tokenProtection } from "../Reducers/Protection";

// Get all category action
const getCategoryAction = () => async (dispatch) => {
  try {
    dispatch({ type: CategoryConstants.GET_ALL_CATEGORIES_REQUEST });
    const response = await CategoryApi.getCategoriesService();
    dispatch({
      type: CategoryConstants.GET_ALL_CATEGORIES_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorAction(error, dispatch, CategoryConstants.GET_ALL_CATEGORIES_FAIL);
  }
};

// admin add category action
const adminAddcategoryAction = (title) => async (dispatch, getState) => {
  try {
    dispatch({ type: CategoryConstants.ADD_CATEGORY_REQUEST });
    await CategoryApi.createCategoryService(title, tokenProtection(getState));
    dispatch({
      type: CategoryConstants.ADD_CATEGORY_SUCCESS,
    });
    toast.success("Category created successfully!");
  } catch (error) {
    ErrorAction(error, dispatch, CategoryConstants.ADD_CATEGORY_FAIL);
  }
};

// admin update category action
const adminUpdateCategoryAction = (id, title) => async (dispatch, getState) => {
  try {
    dispatch({ type: CategoryConstants.UPDATE_CATEGORY_REQUEST });
    const response = await CategoryApi.updateCategoryService(
      id,
      tokenProtection(getState),
      title
    );
    dispatch({
      type: CategoryConstants.UPDATE_CATEGORY_SUCCESS,
      payload: response,
    });
    toast.success("Category updated successfully!");
    dispatch(getCategoryAction());
  } catch (error) {
    ErrorAction(error, dispatch, CategoryConstants.UPDATE_CATEGORY_FAIL);
  }
};

// admin update category action
const adminDeleteCategoryAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: CategoryConstants.DELETE_CATEGORY_REQUEST });
    await CategoryApi.deleteCategoryService(id, tokenProtection(getState));
    dispatch({
      type: CategoryConstants.DELETE_CATEGORY_SUCCESS,
    });
    toast.success("Category deleted successfully!");
    dispatch(getCategoryAction());
  } catch (error) {
    ErrorAction(error, dispatch, CategoryConstants.DELETE_CATEGORY_FAIL);
  }
};

export {
  getCategoryAction,
  adminAddcategoryAction,
  adminUpdateCategoryAction,
  adminDeleteCategoryAction,
};
