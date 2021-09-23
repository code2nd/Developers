import { NAV_DATA, WEBSIT_LIST, SET_HASH } from './actionTypes';
import { WebsiteState, WebsiteAction } from 'types/website';

export const initialState: WebsiteState = {
  navData: [],
  websiteList: [],
  hash: ''
};

const reducers = (state = initialState, action: WebsiteAction) => {
  switch(action.type) {
    case NAV_DATA:
      return {
        ...state,
        navData: action.navData
      };
    case WEBSIT_LIST: 
      return {
        ...state,
        websiteList: action.websiteList
      };
    case SET_HASH: 
      return {
        ...state,
        hash: action.hash
      };
    default: return state;
  }
};

export default reducers;