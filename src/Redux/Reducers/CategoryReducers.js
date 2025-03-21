import * as CategoryConstants from "../Constants/CategoryConstants";

// GET ALL CATEGORIES
export const getCategoriesReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case CategoryConstants.GET_ALL_CATEGORIES_REQUEST:
      return { isLoading: true };
    case CategoryConstants.GET_ALL_CATEGORIES_SUCCESS:
      return { isLoading: false, categories: action.payload };
    case CategoryConstants.GET_ALL_CATEGORIES_FAIL:
      return { isLoading: false, isError: action.payload };
    case CategoryConstants.GET_ALL_CATEGORIES_RESET:
      return {};
    default:
      return state;
  }
};

// ADMIN ADD  CATEGORY
export const adminAddCategoryReducer = (state = { title: [] }, action) => {
  switch (action.type) {
    case CategoryConstants.ADD_CATEGORY_REQUEST:
      return { isLoading: true };
    case CategoryConstants.ADD_CATEGORY_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case CategoryConstants.ADD_CATEGORY_FAIL:
      return { isLoading: false, isError: action.payload };
    case CategoryConstants.ADD_CATEGORY_RESET:
      return {};
    default:
      return state;
  }
};

// ADMIN UPDATE CATEGORY
export const adminUpdateCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case CategoryConstants.UPDATE_CATEGORY_REQUEST:
      return { isLoading: true };
    case CategoryConstants.UPDATE_CATEGORY_SUCCESS:
      return { isLoading: false, title: action.payload, isSuccess: true };
    case CategoryConstants.UPDATE_CATEGORY_FAIL:
      return { isLoading: false, isError: action.payload };
    case CategoryConstants.UPDATE_CATEGORY_RESET:
      return {};
    default:
      return state;
  }
};

// ADMIN DELETE CATEGORY
export const adminDeleteCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case CategoryConstants.DELETE_CATEGORY_REQUEST:
      return { isLoading: true };
    case CategoryConstants.DELETE_CATEGORY_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case CategoryConstants.DELETE_CATEGORY_FAIL:
      return { isLoading: false, isError: action.payload };
    case CategoryConstants.DELETE_CATEGORY_RESET:
      return {};
    default:
      return state;
  }
};
