import { ManageState } from './manage';
import { WebsiteState } from './website';
import { BlogState } from './blog';

export type Device = 'pc' | 'mobile' | '';

export interface State {
  common: CommonState;
  manage: ManageState;
  website: WebsiteState;
  blog: BlogState;
};

export interface CommonState {
  userInfo: UserInfo;
  device: Device;
  drawerVisible: boolean;
  currentPage: string;
  showLoginModal: boolean;
  loginType: string;
  errorMsg: string;
};

export interface CommonStateAction extends Partial<CommonState> {
  type: string;
};

export interface UserInfo {
  isLogin: boolean;
  username?: string;
  avatar?: string;
};

export interface ErrorMsg {
  error_code: number;
  msg: string;
  request: string;
};