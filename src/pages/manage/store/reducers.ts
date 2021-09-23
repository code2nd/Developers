import _ from "lodash";
import { pageMap } from "../";
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
} from "./actionTypes";

import { ManageState, ManageAction, PageType } from "types/manage";
import { TableData } from "components/baseTable";

export const initialState: ManageState = {
  modalType: "add",
  modalVisible: false,
  pageType: 'blog',
  selectedRowKeys: [],
  tips: {
    show: false,
    level: "success",
    duration: 3,
    content: "成功",
  },
  tableData: [],
  page: 1,
  pageSize: 10,
  total: 0,
  categoryList: [],
  authMenu: [],
  requestComplete: false
};

const reducers = (state = initialState, action: ManageAction) => {
  switch (action.type) {
    case MODAL_TYPE:
      return {
        ...state,
        modalType: action.modalType,
      };
    case MODAL_VISIBLE:
      return {
        ...state,
        modalVisible: action.modalVisible,
      };
    case PAGE_TYPE:
      return {
        ...state,
        pageType: action.pageType,
      };
    case SELECTED_ROW_KEYS:
      return {
        ...state,
        selectedRowKeys: action.selectedRowKeys,
      };
    case TIPS:
      return {
        ...state,
        tips: action.tips,
      };
    case TABLE_DATA:
      if (action.handle) {
        const tableData = _.cloneDeep(action.tableData);
        return {
          ...state,
          tableData: handleTableData(tableData, action, state.pageType),
        };
      }

      return {
        ...state,
        tableData: action.tableData,
      };
    case PAGE:
      return {
        ...state,
        page: action.page,
      };
    case PAGE_SIZE:
      return {
        ...state,
        pageSize: action.pageSize,
      };
    case TOTAL:
      return {
        ...state,
        total: action.total,
      };

    case CATEGORY_LIST:
      return {
        ...state,
        categoryList: action.categoryList,
      };
    case AUTH_MENU:
      return {
        ...state,
        authMenu: action.authMenu,
      };
    case REQUEST_COMPLETE: 
      return {
        ...state,
        requestComplete: action.requestComplete
      }
    default:
      return state;
  }
};

export default reducers;

// 处理 tableData
function handleTableData(
  tableData: TableData,
  action: ManageAction,
  pageType: PageType
) {
  switch (action.handle) {
    case "add": {
      return handleTableDataAdd(tableData, action, pageType);
    }
    case "edit": {
      return hanldeTableDataUpdate(tableData, action, pageType);
    }
    case "delete": {
      return handleTableDataDelete(tableData, action, pageType);
    }
  }
}

function handleTableDataAdd(
  tableData: TableData,
  action: ManageAction,
  pageType: PageType
) {
  switch (pageType) {
    case pageMap.wc:
    case pageMap.bc: {
      const item = {
        key: Math.floor(Math.random() * 100) + 100,
        value: Reflect.get(action.tableData[0], "category"),
      };
      tableData.push(item);
      return tableData;
    }
    case pageMap.b:
      return {};
    default:
      return {};
  }
}

function hanldeTableDataUpdate(
  tableData: TableData,
  action: ManageAction,
  pageType: PageType
) {
  switch (pageType) {
    case pageMap.wc:
    case pageMap.bc: {
      const index = _.findIndex(tableData, [
        "key",
        Reflect.get(action.tableData[0], "key"),
      ]);
      tableData[index] = {
        key: Reflect.get(action.tableData[0], "key"),
        value: Reflect.get(action.tableData[0], "category"),
      };
      return tableData;
    }
    case pageMap.b:
      return {};
    default:
      return {};
  }
}

function handleTableDataDelete(
  tableData: TableData,
  action: ManageAction,
  pageType: PageType
) {
  switch (pageType) {
    case pageMap.wc:
    case pageMap.bc: {
      const len = action.tableData.length;
      for (let i = 0; i < len; i++) {
        const index = _.findIndex(tableData, [
          "key",
          Reflect.get(action.tableData[i], "key"),
        ]);
        tableData.splice(index, 1);
      }
      return tableData;
    }
    case pageMap.b:
      return {};
    default:
      return {};
  }
}
