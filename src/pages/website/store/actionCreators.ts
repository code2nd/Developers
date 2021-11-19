import { Dispatch } from 'redux';
import { NAV_DATA, WEBSIT_LIST, SET_HASH } from './actionTypes';
import { NavItem, WebsiteItem } from 'types/website';
import {
  getWebsiteCategories,
  getClassifiedWeblist
} from "api/";
import Storage from 'utils/storage';

const LStorage = new Storage('localStorage');

export const setNavData = (navData: Array<NavItem>) => ({
  type: NAV_DATA,
  navData
});

export const setWebSiteList = (websiteList: Array<WebsiteItem>) => ({
  type: WEBSIT_LIST,
  websiteList
});

export const setHash = (hash: string) => ({
  type: SET_HASH,
  hash
});

// 获取navData
export const actionGetNavData = () => {
  return async (dispatch: Dispatch) => {

    const navData = LStorage.get('navData');
    if (navData && Array.isArray(navData) && navData[0]) {
      dispatch(setNavData(navData));
    } else {
      try {
        const res = await getWebsiteCategories();
        dispatch(setNavData(res));
        LStorage.set('navData', res, false);
      } catch (err) {
        // dispatch(setTips({show: true, level: 'error', content: err.message}));
        console.error(err);
      }
    }
  }
};

// 获取网站数据
export const actionGetWebsiteList = () => {
  return async (dispatch: Dispatch) => {

    const webSiteList = LStorage.get('webSiteList');
    if (webSiteList && Array.isArray(webSiteList) && webSiteList[0]) {
      dispatch(setWebSiteList(webSiteList));
    } else {
      try {
        const res = await getClassifiedWeblist();
        dispatch(setWebSiteList(res));
        LStorage.set('webSiteList', res);
      } catch(err) {
        console.error(err);
      }
    }
  }
}