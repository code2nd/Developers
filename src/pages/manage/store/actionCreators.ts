import React from 'react';
import { Dispatch } from 'redux';
import { initialState } from './';
import { pageMap } from '../';
import {
  getWebsiteCategories,
  getBlogCategories,
  getBlogList,
  getWebsiteList,
  addWebsiteCategory,
  updateWebsiteCategory,
  deleteWebsiteCategory,
  addWebsite,
  updateWebsite,
  deleteWebsite,
  addBlog,
  updateBlog,
  deleteBlog,
  addBlogCategory,
  updateBlogCategory,
  deleteBlogCategory,
  getAuthMenu
} from "api/";
import {
  WebInfoData,
  UpdateWebInfoData,
  BlogListData,
  WebsiteListData,
  BlogInfo,
  UpdateBlogInfo
} from 'types/api';
import {
  MODAL_TYPE,
  MODAL_VISIBLE,
  PAGE_TYPE,
  SELECTED_ROW_KEYS,
  TIPS,
  TABLE_DATA,
  PAGE,
  PAGE_SIZE,
  TOTAL,
  CATEGORY_LIST,
  AUTH_MENU,
  REQUEST_COMPLETE
} from './actionTypes';
import { TableData } from 'components/baseTable';
import Storage from 'utils/storage';

import { PageType, Tips, ManageSearchParam, AuthMenu } from 'types/manage';
import { KeyValue } from 'types/form';
import { HandleType } from 'components/baseForm';

const LStorage = new Storage('localStorage', 60*24);

export const setModalType = (modalType: string) => ({
  type: MODAL_TYPE,
  modalType
});

export const setModalVisible = (modalVisible: boolean) => ({
  type: MODAL_VISIBLE,
  modalVisible
});

export const setPageType = (pageType: PageType) => ({
  type: PAGE_TYPE,
  pageType
});

export const setSelectedRowKeys = (selectedRowKeys: Array<React.Key>) => ({
  type: SELECTED_ROW_KEYS,
  selectedRowKeys
});

export const setTips = (tips: Tips) => ({
  type: TIPS,
  tips
});

export const setTableData = (tableData?: TableData, handle?: HandleType) => ({
  type: TABLE_DATA,
  tableData,
  handle
});

export const setPage = (page: number) => ({
  type: PAGE,
  page
});

export const setPageSize = (pageSize: number) => ({
  type: PAGE_SIZE,
  pageSize
});

export const setTotal = (total: number) => ({
  type: TOTAL,
  total
});

export const setCategoryList = (categoryList: Array<KeyValue>) => ({
  type: CATEGORY_LIST,
  categoryList
});

export const setMenu = (authMenu: AuthMenu[]) => ({
  type: AUTH_MENU,
  authMenu
});

export const setRequestComplete = (requestComplete: boolean) => ({
  type: REQUEST_COMPLETE,
  requestComplete
});

// 获取菜单
export const actionGetMenu = () => {
  return async (dispatch: Dispatch) => {
    const menu = LStorage.get('manageMenu');
    if (menu && Array.isArray(menu) && menu[0]) {
      dispatch(setMenu(menu));
    } else {
      try {
        const res = await getAuthMenu();
        dispatch(setMenu(res));
        LStorage.set('manageMenu', res);
      } catch(err) {
        console.error(err);
      }
    }
  }
}

/**
 * 网站
 */

// 获取网站分类
export const actionGetWebsiteCategory = (type: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const res = await getWebsiteCategories();
      if (type === pageMap.wc) {
        dispatch(setTableData(res));
      } else {
        dispatch(setCategoryList(res));
      }
      LStorage.set('websiteCategory', res);
    } catch (err) {
      console.log(err)
      dispatch(setTips({show: true, level: 'error', content: err.message}));
    }
  }
};

// 新增网站分类
export const actionAddWebsiteCategory = (category: string) => {
  return async (dispatch: Dispatch) => {
    try {
      await addWebsiteCategory(category);
      dispatch(setTableData([{category}], 'add'));
      handleSuccess(dispatch, '新增成功！');
      dispatch(actionGetWebsiteCategory(pageMap.wc) as any);
    } catch (err) {
      dispatch(setTips({show: true, level: 'error', content: err.message}));
    }
  }
}

// 修改网站分类
export const actionUpdateWebsiteCategory = (key: number, category: string) => {
  return async (dispatch: Dispatch) => {
    try {
      await updateWebsiteCategory(key, category);
      dispatch(setTableData([{key, category}], 'edit'));
      handleSuccess(dispatch, '修改成功！');
      dispatch(actionGetWebsiteCategory(pageMap.wc) as any);
    } catch (err) {
      dispatch(setTips({show: true, level: 'error', content: err.message}));
    }
  }
}

// 删除网站分类
export const actionDeleteWebsiteCategory = (key: string) => {
  return async (dispatch: Dispatch) => {
    try {
      await deleteWebsiteCategory(key);
      const items = key.split(',').map(item =>({ key: item, category: '' }));
      dispatch(setTableData(items, 'delete'));
      handleSuccess(dispatch, '删除成功！');
      dispatch(actionGetWebsiteCategory(pageMap.wc) as any);
    } catch (err) {
      dispatch(setTips({show: true, level: 'error', content: err.message}));
    }
  }
}

// 获取网站数据
export const actionGetWebsiteData = (websiteListData: WebsiteListData) => {
  return async (dispatch: Dispatch) => {
    dispatch(setRequestComplete(false));
    try {
      const res = await getWebsiteList(websiteListData);
      dispatch(setTableData(res.data));
      dispatch(setTotal(res.total));
      dispatch(setRequestComplete(true));
      LStorage.set('manageWebsiteList', res.data);
    } catch (err) {
      handleGetTableDataError(dispatch, err.message);
    }
  }
};

// 新增网站
export const actionAddWebsiteData = (webInfo: WebInfoData) => {
  return async (dispatch: Dispatch) => {
    try {
      await addWebsite(webInfo);
      handleSuccess(dispatch, '新增成功！');
      const { page, pageSize } = initialState;
      dispatch(actionGetWebsiteData({page, pageSize}) as any);
      dispatch(setPage(page));
    } catch (err) {
      dispatch(setTips({show: true, level: 'error', content: err.message}));
    }
  }
};

// 修改网站信息
export const actionUpdateWebsiteData = (updateWebInfo: UpdateWebInfoData, searchParam: ManageSearchParam) => {
  return async (dispatch: Dispatch) => {
    try {
      await updateWebsite(updateWebInfo);
      handleSuccess(dispatch, '修改成功！');
      dispatch(actionGetWebsiteData(searchParam) as any);
    } catch (err) {
      dispatch(setTips({show: true, level: 'error', content: err.message}));
    }
  }
};

// 删除网站
export const actionDeleteWebsiteData = (key: string, searchParam: ManageSearchParam) => {
  return async (dispatch: Dispatch) => {
    try {
      await deleteWebsite(key);
      handleSuccess(dispatch, '删除成功！');
      dispatch(actionGetWebsiteData(searchParam) as any);
    } catch (err) {
      dispatch(setTips({show: true, level: 'error', content: err.message}));
    }
  }
};

/**
 * 博客
 */

// 获取博客分类
export const actionGetBlogCategory = (type: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const res = await getBlogCategories();
      if (type === pageMap.bc) {
        dispatch(setTableData(res));
      } else {
        dispatch(setCategoryList(res));
      }
      LStorage.set('blogCategory', res);
    } catch (err) {
      dispatch(setTips({show: true, level: 'error', content: err.message}));
    }
  }
}; 

// 新增博客分类
export const actionAddBlogCategory = (category: string) => {
  return async (dispatch: Dispatch) => {
    try {
      await addBlogCategory(category);
      dispatch(setTableData([{category}], 'add'));
      handleSuccess(dispatch, '新增成功！');
      dispatch(actionGetBlogCategory(pageMap.bc) as any);
    } catch (err) {
      dispatch(setTips({show: true, level: 'error', content: err.message}));
    }
  }
};

// 修改博客分类
export const actionUpdateBlogCategory = (key: number, category: string) => {
  return async (dispatch: Dispatch) => {
    try {
      await updateBlogCategory(key, category);
      dispatch(setTableData([{key, category}], 'edit'));
      handleSuccess(dispatch, '修改成功！');
      dispatch(actionGetBlogCategory(pageMap.bc) as any);
    } catch (err) {
      dispatch(setTips({show: true, level: 'error', content: err.message}));
    }
  }
}; 

// 删除博客分类
export const actionDeleteBlogCategory = (key: string) => {
  return async (dispatch: Dispatch) => {
    try {
      await deleteBlogCategory(key);
      const items = key.split(',').map(item => ({ key: item, category: '' }));
      dispatch(setTableData(items, 'delete'));
      handleSuccess(dispatch, '删除成功！');
      dispatch(actionGetBlogCategory(pageMap.bc) as any);
    } catch (err) {
      dispatch(setTips({show: true, level: 'error', content: err.message}));
    }
  }
}; 

// 获取博客数据
export const actionGetBlogData = (blogListData: BlogListData) => {
  return async (dispatch: Dispatch) => {
    dispatch(setRequestComplete(false));
    try {
      const res = await getBlogList(blogListData);
      dispatch(setTableData(res.data));
      dispatch(setTotal(res.total));
      dispatch(setRequestComplete(true));
      LStorage.set('manageBlogList', res.data);
    } catch (err) {
      handleGetTableDataError(dispatch, err.message);
    }
  }
};

// 新增博客
export const actionAddBlogData = (blogInfo: BlogInfo) => {
  return async (dispatch: Dispatch) => {
    try {
      await addBlog(blogInfo);
      handleSuccess(dispatch, '新增成功！');
      const { page, pageSize } = initialState;
      dispatch(actionGetBlogData({page, pageSize}) as any);
      dispatch(setPage(page));
    } catch (err) {
      dispatch(setTips({show: true, level: 'error', content: err.message}));
    }
  }
};

// 修改博客信息
export const actionUpdateBlogData = (updateBlogInfo: UpdateBlogInfo, searchParam: ManageSearchParam) => {
  return async (dispatch: Dispatch) => {
    try {
      await updateBlog(updateBlogInfo);
      handleSuccess(dispatch, '修改成功！');
      dispatch(actionGetBlogData(searchParam) as any);
    } catch (err) {
      dispatch(setTips({show: true, level: 'error', content: err.message}));
    }
  }
};

// 删除博客
export const actionDeleteBlogData = (key: string, searchParam: ManageSearchParam) => {
  return async (dispatch: Dispatch) => {
    try {
      await deleteBlog(key);
      handleSuccess(dispatch, '删除成功！');
      dispatch(actionGetBlogData(searchParam) as any);
    } catch (err) {
      dispatch(setTips({show: true, level: 'error', content: err.message}));
    }
  }
};

function handleSuccess(dispatch: Dispatch, tip: string) {
  dispatch(setModalVisible(false));
  dispatch(setTips({show: true, level: 'success', content: tip}));
  dispatch(setSelectedRowKeys([]));
}

// 处理请求表格数据出错
function handleGetTableDataError(dispatch: Dispatch, tip: string) {
  dispatch(setTips({show: true, level: 'error', content: tip}));
  dispatch(setRequestComplete(true));
  dispatch(setTableData([]));
}
