import React from "react";
import { TableData } from "components/baseTable";
import { HandleType } from "components/baseForm";
import {
  BlogInfo,
  BlogListData,
  UpdateBlogInfo,
  UpdateWebInfoData,
  WebInfoData,
  WebsiteListData,
} from "types/api";
import { ModalType } from "pages/manage/components/modal";
import { KeyValue } from "./form";

export interface ManageProps extends ManageState {
  currentPage: string;
  handleSetModalType: (type: ModalType) => void;
  handleSetModalVisible: (visible: boolean) => void;
  handleSetPageType: (pageType: PageType) => void;
  handleSetSelectedRowKeys: (selectedRowKeys: Array<React.Key>) => void;
  handleSetTips: (tips: Tips) => void;
  handleSetTableData: (tableData: TableData) => void;
  handleSetPage: (page: number) => void;
  handleSetPageSize: (pageSize: number) => void;
  handleSetTotal: (total: number) => void;
  hanldeClearTableData: () => void;
  handleGetWebsiteCategory: (type: string) => void;
  handleGetBlogCategory: (type: string) => void;
  handleGetBlogData: ({ page, pageSize }: BlogListData) => void;
  handleGetWebsiteData: ({ page, pageSize }: WebsiteListData) => void;
  handleAddWebsiteCategory: (category: string) => void;
  handleUpdateWebsiteCategory: (key: number, category: string) => void;
  handleDeleteWebsiteCategory: (key: string) => void;
  handleAddWebsite: (webInfo: WebInfoData) => void;
  handleUpdateWebsite: (
    updateWebInfo: UpdateWebInfoData,
    searchParam: ManageSearchParam
  ) => void;
  handleDeleteWebsite: (key: string, searchParam: ManageSearchParam) => void;
  handleAddBlogCategory: (category: string) => void;
  handleUpdateBlogCategory: (key: number, category: string) => void;
  handleDeleteBlogCategory: (key: string) => void;
  handleAddBlog: (blogInfo: BlogInfo) => void;
  handleUpdateBlog: (
    updateBlogInfo: UpdateBlogInfo,
    searchParam: ManageSearchParam
  ) => void;
  handleDeleteBlog: (key: string, searchParam: ManageSearchParam) => void;
  handleGetMenu: () => void;
}

export interface ManageState {
  modalType: ModalType;
  modalVisible: boolean;
  pageType: PageType;
  selectedRowKeys: Array<React.Key>;
  tips: Tips;
  tableData: TableData;
  page: number;
  pageSize: number;
  total: number;
  categoryList: Array<KeyValue>;
  authMenu: Array<AuthMenu>;
  requestComplete: boolean;
}

export interface ManageAction extends ManageState {
  type: string;
  handle?: HandleType;
}

export type PageType =
  | "website"
  | "blog"
  | "websiteCategory"
  | "blogCategory"
  | "";

export type TipsLevel =
  | "success"
  | "error"
  | "info"
  | "warning"
  | "warn"
  | "loading";

export interface Tips {
  show: boolean;
  level: TipsLevel;
  duration?: number;
  content?: string;
}

export interface ManageSearchParam {
  page: number;
  pageSize: number;
  category?: number;
  keyword?: string;
  dateTime?: string;
}

export interface AuthMenu {
  key: string;
  href: string;
  value: string;
}
