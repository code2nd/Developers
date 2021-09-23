import { Dispatch } from 'redux';
import { DEVICE, DRAWER_VISIBLE, CURRENT_PAGE, SHOW_LOGIN_MODAL, SET_USER_INFO, SET_LOGIN_TYPE, SET_ERROR_MSG } from "./actionTypes";
import { Device, UserInfo } from "types/common";
import { getUserInfo, login, register, logout } from 'api/';
import { LoginData, RegisterData } from 'types/api';
import Storage from 'utils/storage';

const LStorage = new Storage('localStorage');

export const setDevice = (device: Device) => ({
  type: DEVICE,
  device,
});

export const setDrawerVisible = (drawerVisible: boolean) => ({
  type: DRAWER_VISIBLE,
  drawerVisible,
});

export const setCurrentPage = (currentPage: string) => ({
  type: CURRENT_PAGE,
  currentPage,
});

export const setShowLoginModal = (showLoginModal: boolean) => ({
  type: SHOW_LOGIN_MODAL,
  showLoginModal,
});

export const setUserInfo = (userInfo: UserInfo) => ({
  type: SET_USER_INFO,
  userInfo
});

export const setLoginType = (loginType: string) => ({
  type: SET_LOGIN_TYPE,
  loginType
});

export const setErrorMsg = (errorMsg: string) => ({
  type: SET_ERROR_MSG,
  errorMsg
});

// 登录
export const actionLogin = (data: LoginData) => {
  return async (dispatch: Dispatch) => {
    try {
      const res = await login(data);
      dispatch(setLoginType('loginSuccess'));
      dispatch(setUserInfo(res));
      dispatch(setShowLoginModal(false));
      dispatch(setLoginType('login'));
    } catch(err: any) {
      dispatch(setErrorMsg(err.msg));
    }
  }
}

// 注册
export const actionRegister = (data: RegisterData) => {
  return async (dispatch: Dispatch) => {
    try {
      await register(data);
      dispatch(setLoginType('registerSuccess'));
    } catch (err: any) {
      dispatch(setErrorMsg(err.msg));
    }
  }
}

// 获取用户信息
export const actionGetUserInfo = () => {
  return async (dispatch: Dispatch) => {
    try {
      const res = await getUserInfo();
      dispatch(setUserInfo(res));
    } catch(err: any) {
      dispatch(setErrorMsg(err.msg));
    }
  }
}

// 退出登录
export const actionLogout = () => {
  return async (dispatch: Dispatch) => {
    try {
      await logout();
      dispatch(actionGetUserInfo() as any);
      LStorage.remove('blogList');
      LStorage.remove('blogCategory');
      LStorage.remove('manageBlogList');
      LStorage.remove('manageMenu');
      LStorage.remove('blogCateogry');
      LStorage.remove('manageWebsiteList');
      LStorage.remove('websiteCategory');
    } catch(err: any) {
      dispatch(setErrorMsg(err.msg));
    }
  }
}
