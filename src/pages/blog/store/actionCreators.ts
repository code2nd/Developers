import { Dispatch } from "redux";
import {
  ADD_BLOG_LIST,
  SET_BLOG_LIST,
  SET_PAGE,
  SET_PAGE_SIZE,
  SET_TOTAL,
  SET_LOADING,
  SET_HAS_MORE,
  SET_BLOG_CATEGORY,
  SET_DATE,
  SET_CATEGORY,
  INIT_STATE,
} from "./actionTypes";
import { BlogListItem } from "types/blog";
import { getBlogList, getBlogCategories } from "api/";
import { BlogListData } from "types/api";
import { KeyValue } from "types/form";
import Storage from 'utils/storage';

const LStorage = new Storage('localStorage');

export const addBlogList = (blogList: BlogListItem[]) => ({
  type: ADD_BLOG_LIST,
  blogList,
});

export const setBlogList = (blogList: BlogListItem[]) => ({
  type: SET_BLOG_LIST,
  blogList,
});

export const setPage = (page: number) => ({
  type: SET_PAGE,
  page,
});

export const setPageSize = (pageSize: number) => ({
  type: SET_PAGE_SIZE,
  pageSize,
});

export const setTotal = (total: number) => ({
  type: SET_TOTAL,
  total,
});

export const setLoading = (loading: boolean) => ({
  type: SET_LOADING,
  loading,
});

export const setHasMore = (hasMore: boolean) => ({
  type: SET_HAS_MORE,
  hasMore,
});

export const setBlogCategory = (blogCategory: KeyValue[]) => ({
  type: SET_BLOG_CATEGORY,
  blogCategory,
});

export const setCategory = (category: number | undefined) => ({
  type: SET_CATEGORY,
  category,
});

export const setDate = (date: string | undefined) => ({
  type: SET_DATE,
  date,
});

export const initState = () => ({
  type: INIT_STATE
});


// 获取 blogList
export const actionGetBlogList = (blogListData: BlogListData, type: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(setLoading(true));
    const { page } = blogListData;
    const blogList = LStorage.get('blogList');
    if (page === 1 && blogList) {
      dispatch(setBlogList(blogList));
    }

    try {
      const res = await getBlogList(blogListData);
      if (type === 'add') {
        dispatch(addBlogList(res.data));
      } else {
        dispatch(setBlogList(res.data));
        LStorage.set('blogList', res.data);
      }
      
      dispatch(setTotal(res.total));
      dispatch(setLoading(false));
    } catch (err) {
      dispatch(setLoading(false));
    }
  };
};

export const actionGetBlogCategory = () => {
  return async (dispatch: Dispatch) => {

    const all = {
      key: "0",
      value: "全部",
    };

    const blogCategory = LStorage.get('blogCategory');
    if (blogCategory && Array.isArray(blogCategory) && blogCategory[0]) {
      blogCategory.unshift(all);
      dispatch(setBlogCategory(blogCategory));
    }

    try {
      const res = await getBlogCategories();
      LStorage.set('blogCategory', res, false);
      res.unshift(all);
      dispatch(setBlogCategory(res));
    } catch (err) {
      console.log(err);
    }
  };
};
