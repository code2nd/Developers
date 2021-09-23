import {
  ADD_BLOG_LIST,
  SET_BLOG_LIST,
  SET_PAGE,
  SET_PAGE_SIZE,
  SET_TOTAL,
  SET_LOADING,
  SET_HAS_MORE,
  SET_BLOG_CATEGORY,
  SET_CATEGORY,
  SET_DATE,
  INIT_STATE,
} from "./actionTypes";
import { BlogState, BlogAction } from "types/blog";

export const initialState: BlogState = {
  blogList: [],
  page: 1,
  pageSize: 20,
  total: 0,
  loading: false,
  hasMore: true,
  blogCategory: [],
  category: undefined,
  date: undefined,
};

const reducers = (state = initialState, action: BlogAction) => {
  switch (action.type) {
    case ADD_BLOG_LIST:
      const blogList = [...state.blogList, ...action.blogList];
      return {
        ...state,
        blogList,
      };
    case SET_BLOG_LIST:
      return {
        ...state,
        blogList: action.blogList,
      };
    case SET_PAGE:
      return {
        ...state,
        page: action.page,
      };
    case SET_PAGE_SIZE:
      return {
        ...state,
        pageSize: action.pageSize,
      };
    case SET_TOTAL:
      return {
        ...state,
        total: action.total,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    case SET_HAS_MORE:
      return {
        ...state,
        hasMore: action.hasMore,
      };
    case SET_BLOG_CATEGORY:
      return {
        ...state,
        blogCategory: action.blogCategory,
      };
    case SET_CATEGORY:
      return {
        ...state,
        category: action.category,
      };
    case SET_DATE:
      return {
        ...state,
        date: action.date,
      };
    case INIT_STATE:
      return initialState;
    default:
      return state;
  }
};

export default reducers;
