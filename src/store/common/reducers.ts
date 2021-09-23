import {
  DEVICE,
  DRAWER_VISIBLE,
  CURRENT_PAGE,
  SHOW_LOGIN_MODAL,
  SET_USER_INFO,
  SET_LOGIN_TYPE,
  SET_ERROR_MSG
} from "./actionTypes";
import { CommonState, CommonStateAction } from "types/common";
import Storage from 'utils/storage';

const LStorage = new Storage('localStorage');

export const initialState: CommonState = {
  userInfo: { isLogin: false },
  device: '',
  drawerVisible: false,
  currentPage: '',
  showLoginModal: false,
  loginType: 'login',
  errorMsg: ''
};

export default function reducers(
  state = initialState,
  action: CommonStateAction
) {
  switch (action.type) {
    case DEVICE:
      return {
        ...state,
        device: action.device,
      };
    case DRAWER_VISIBLE:
      return {
        ...state,
        drawerVisible: action.drawerVisible,
      };
    case CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.currentPage,
      };
    case SHOW_LOGIN_MODAL:
      return {
        ...state,
        showLoginModal: action.showLoginModal,
      };
    case SET_USER_INFO:
      LStorage.set('userInfo', action.userInfo);
      return {
        ...state,
        userInfo: { ...action.userInfo },
      };
    case SET_LOGIN_TYPE:
      return {
        ...state,
        loginType: action.loginType,
      };
    case SET_ERROR_MSG:
      return {
        ...state,
        errorMsg: action.errorMsg
      }
    default:
      return state;
  }
}
