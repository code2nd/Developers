import React, {
  FC,
  useCallback,
  useLayoutEffect,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { Layout, message } from "antd";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { useLocation } from "react-router-dom";
import _ from "lodash";
import moment from "moment";
import { SizeType } from "antd/lib/config-provider/SizeContext";
import {
  manageWebsiteFilterForm,
  manageTableBtns,
  manageCategoryForm,
  manageWebsiteSubmitForm,
  manageBlogSubmitForm,
  manageBlogFilterForm,
} from "utils/formConfig";
import LeftRightLayout from "container/leftRightLayout";
import Menu from "./components/menu";
import BaseForm from "components/baseForm";
import BaseTable from "components/baseTable";
import Modal from "./components/modal";
import { ManageProps, ManageSearchParam } from "types/manage";
import { State } from "types/common";
import { initialState, actionCreators } from "./store";
import { PageType, Tips } from "types/manage";
import { HandleType } from "components/baseForm";
import ErrorBoundary from "components/errorBoundary";
import {
  BlogListData,
  WebsiteListData,
  WebInfoData,
  UpdateWebInfoData,
  UpdateBlogInfo,
  BlogInfo,
} from "types/api";
import {
  categoryColumns,
  websiteListColumns,
  blogListColumns,
} from "utils/tableConfig";
import Storage from "utils/storage";
import { handleCancelRequest } from "utils/tools";
import "./index.scss";

const { Content, Header } = Layout;
const LStorage = new Storage("localStorage", 60 * 24);

export const pageMap = {
  w: "website",
  wc: "websiteCategory",
  b: "blog",
  bc: "blogCategory",
};

const Manage: FC<ManageProps> = (props) => {
  const {
    modalType,
    modalVisible,
    pageType,
    selectedRowKeys,
    tips,
    tableData,
    page,
    pageSize,
    total,
    categoryList,
    authMenu,
    requestComplete,
    currentPage,
    handleSetPage,
    handleSetTotal,
    handleSetPageType,
    handleSetSelectedRowKeys,
    handleSetTips,
    hanldeClearTableData,
    handleGetWebsiteCategory,
    handleGetBlogCategory,
    handleGetBlogData,
    handleGetWebsiteData,
    handleAddWebsiteCategory,
    handleUpdateWebsiteCategory,
    handleDeleteWebsiteCategory,
    handleAddWebsite,
    handleUpdateWebsite,
    handleDeleteWebsite,
    handleAddBlogCategory,
    handleUpdateBlogCategory,
    handleDeleteBlogCategory,
    handleAddBlog,
    handleUpdateBlog,
    handleDeleteBlog,
    handleGetMenu,
  } = props;
  const location = useLocation();

  // 存储搜索参数
  const searchParamRef = useRef<ManageSearchParam | {}>({});
  const baseFormRef = useRef<any>();

  // 存储搜索参数
  const memoedPagenation = useMemo(() => {
    return {
      page,
      pageSize,
    };
  }, [page, pageSize]);

  const columns = useMemo(() => {
    switch (pageType) {
      case pageMap.wc:
      case pageMap.bc:
        return categoryColumns;
      case pageMap.b:
        return blogListColumns;
      case pageMap.w:
        return websiteListColumns;
      default:
        return [];
    }
  }, [pageType]);

  // 表格大小
  const tableSize = useMemo(() => {
    if (pageType === pageMap.w || pageType === pageMap.b) {
      return "middle" as SizeType;
    } else {
      return "default" as SizeType;
    }
  }, [pageType]);

  const defaultFieldsValue = useMemo(() => {
    if (tableData.length && selectedRowKeys.length && modalType !== "delete") {
      const data = _.find(tableData, ["key", selectedRowKeys[0]]);
      switch (pageType) {
        case pageMap.wc:
        case pageMap.bc:
          return {
            category: (data as any).value,
          };
        case pageMap.b:
        case pageMap.w:
          let date = Reflect.get(data as object, "date");
          date = date ? { date: moment(date) } : {};
          const { category, category_id, ...rest } = data as any;
          return { ...rest, category: category_id, ...date };
      }
    }
    return {};
  }, [tableData, selectedRowKeys, pageType, modalType]);

  const deleteTip = useMemo(() => {
    const tipWithCategory =
      "删除分类会同时删除该分类下的所有数据，您确认要这么做吗？";
    const tip = "确定删除该条记录吗？";
    switch (pageType) {
      case pageMap.wc:
      case pageMap.bc:
        return tipWithCategory;
      case pageMap.w:
      case pageMap.b:
        return tip;
      default:
        return tip;
    }
  }, [pageType]);

  const memoedFilterForm = useMemo(() => {
    return location.hash.substring(1) === "w"
      ? manageWebsiteFilterForm(categoryList)
      : manageBlogFilterForm(categoryList);
  }, [location, categoryList]);

  const memoedSubmitForm = useMemo(() => {
    const flag = location.hash.substring(1);
    return ["wc", "bc"].includes(flag) ||
      [pageMap.wc, pageMap.bc].includes(pageType)
      ? manageCategoryForm
      : flag === "w" || pageType === "website"
      ? manageWebsiteSubmitForm(categoryList)
      : manageBlogSubmitForm(categoryList);
  }, [location, categoryList, pageType]);

  const memoedTableData = useMemo(() => {
    if (!tableData[0] && !requestComplete) {
      return {
        total: handleGetStoragedData(pageType)?.length || 0,
        dataSource: handleGetStoragedData(pageType) || [],
      };
    }

    return {
      total,
      dataSource: tableData,
    };
  }, [tableData, pageType, total, requestComplete]);

  const handleBtnClick = (field: HandleType) => {
    switch (field) {
      case "add":
        props.handleSetSelectedRowKeys([]);
        props.handleSetModalType(field);
        props.handleSetModalVisible(true);
        break;
      case "edit":
        {
          const keysLen = selectedRowKeys.length;
          if (keysLen > 1) {
            handleSetTips({
              show: true,
              level: "warn",
              content: "每次只能选择一项进行修改！",
            });
          } else if (!keysLen) {
            handleSetTips({
              show: true,
              level: "warn",
              content: "请选择一项进行修改！",
            });
          } else {
            props.handleSetModalType(field);
            props.handleSetModalVisible(true);
          }
        }
        break;
      case "delete":
        {
          const keysLen = selectedRowKeys.length;
          if (!keysLen) {
            handleSetTips({
              show: true,
              level: "warn",
              content: "请至少选择一项进行删除！",
            });
          } else {
            props.handleSetModalType(field);
            props.handleSetModalVisible(true);
          }
        }
        break;
      /* case "search":
        console.log(field);
        break; */
    }
  };

  const handleCancel = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    props.handleSetModalVisible(false);
    handleSetTips(initialState.tips);
  };

  // 新增
  const handleAdd = useCallback(
    (data: any) => {
      switch (pageType) {
        case pageMap.w:
          baseFormRef.current = {};
          handleAddWebsite(data);
          break;
        case pageMap.wc:
          {
            const { category } = data;
            handleAddWebsiteCategory(category);
          }
          break;
        case pageMap.b:
          baseFormRef.current = {};
          handleAddBlog({
            ...data,
            date: moment(data.date).format("YYYY-MM-DD"),
          });
          break;
        case pageMap.bc:
          {
            const { category } = data;
            handleAddBlogCategory(category);
          }
          break;
      }
    },
    [
      pageType,
      handleAddWebsiteCategory,
      handleAddBlogCategory,
      handleAddWebsite,
      handleAddBlog,
    ]
  );

  // 修改
  const handleUpdate = useCallback(
    (formData: any) => {
      const momedSearchParam = {
        ...memoedPagenation,
        ...searchParamRef.current,
      };
      switch (pageType) {
        case pageMap.w:
          handleUpdateWebsite(formData, momedSearchParam);
          break;
        case pageMap.wc:
          {
            const { category } = formData;
            handleUpdateWebsiteCategory(selectedRowKeys[0] as number, category);
          }
          break;
        case pageMap.b:
          handleUpdateBlog(
            { ...formData, date: moment(formData.date).format("YYYY-MM-DD") },
            momedSearchParam
          );
          break;
        case pageMap.bc:
          {
            const { category } = formData;
            handleUpdateBlogCategory(selectedRowKeys[0] as number, category);
          }
          break;
      }
    },
    [
      pageType,
      selectedRowKeys,
      handleUpdateWebsiteCategory,
      handleUpdateBlogCategory,
      handleUpdateWebsite,
      handleUpdateBlog,
      memoedPagenation,
    ]
  );

  // 删除
  const handleDelete = useCallback(() => {
    const key = selectedRowKeys.join(",");
    const momedSearchParam = { ...memoedPagenation, ...searchParamRef.current };
    switch (pageType) {
      case pageMap.w:
        handleDeleteWebsite(key, momedSearchParam);
        break;
      case pageMap.wc:
        handleDeleteWebsiteCategory(key);
        break;
      case pageMap.b:
        handleDeleteBlog(key, momedSearchParam);
        break;
      case pageMap.bc:
        handleDeleteBlogCategory(key);
        break;
    }
  }, [
    pageType,
    selectedRowKeys,
    handleDeleteWebsiteCategory,
    handleDeleteBlogCategory,
    handleDeleteWebsite,
    handleDeleteBlog,
    memoedPagenation,
  ]);

  const handleOk = useCallback(
    (formData: any) => {
      switch (modalType) {
        case "add":
          handleAdd(formData);
          break;
        case "edit":
          handleUpdate({ ...formData, key: selectedRowKeys[0] });
          break;
        case "delete":
          handleDelete();
          break;
      }
    },
    [modalType, handleAdd, handleUpdate, handleDelete, selectedRowKeys]
  );

  // 搜索
  const handleSearch = useCallback(
    (fieldsValue: any) => {
      const { search, ...rest } = fieldsValue;
      const initialPagenation = {
        page: initialState.page,
        pageSize: initialState.pageSize,
      };
      if (pageType === "blog") {
        let { date } = rest;
        if (date) {
          date = [
            date[0].format("YYYY-MM-DD"),
            date[1].format("YYYY-MM-DD"),
          ].join(",");
        }
        handleGetBlogData({ ...initialPagenation, ...rest, date });
      } else {
        handleGetWebsiteData({ ...initialPagenation, ...rest });
      }

      handleSetPage(1);
      searchParamRef.current = { page: 1, pageSize: 10, ...rest };
    },
    [pageType, handleSetPage, handleGetBlogData, handleGetWebsiteData]
  );

  const handleTableRowSelected = (selectedRowKeys: Array<React.Key>) => {
    handleSetSelectedRowKeys(selectedRowKeys);
  };

  const handlePageChange = useCallback(
    (page: number, pageSize?: number) => {
      if (selectedRowKeys[0]) {
        handleSetSelectedRowKeys([]);
      }

      handleSetPage(page);
    },
    [selectedRowKeys, handleSetPage, handleSetSelectedRowKeys]
  );

  function handleGetStoragedData(pageType: PageType) {
    switch (pageType) {
      case pageMap.w:
        return LStorage.get("manageWebsiteList") || [];
      case pageMap.wc:
        return LStorage.get("websiteCategory") || [];
      case pageMap.b:
        return LStorage.get("manageBlogList") || [];
      case pageMap.bc:
        return LStorage.get("blogCategory") || [];
      default:
        return [];
    }
  }

  useEffect(() => {
    if (!location.hash) {
      window.location.hash = "#b";
    }
  }, [location]);

  useEffect(() => {
    function hashchange() {
      baseFormRef.current && baseFormRef.current.resetFields();
      handleSetSelectedRowKeys([]);
      hanldeClearTableData();
      handleSetPage(1);
      handleSetTotal(0);
    }

    window.addEventListener("hashchange", hashchange);

    return () => {
      window.removeEventListener("hashchange", hashchange);
    };
  }, [
    handleSetSelectedRowKeys,
    hanldeClearTableData,
    handleSetPage,
    handleSetTotal,
  ]);

  useEffect(() => {
    handleCancelRequest();
  }, [pageType]);

  useEffect(() => {
    handleGetMenu();
  }, [handleGetMenu]);

  useEffect(() => {
    searchParamRef.current = {};
    const hash = location.hash.substring(1) as string;
    if (hash) {
      handleSetPageType(
        Reflect.get(pageMap, location.hash.substring(1) as string)
      );
    }
  }, [location, handleSetPageType]);

  useEffect(() => {
    const { show, level, duration = 3, content } = tips;
    if (show) {
      message[level](content, duration, () => {
        handleSetTips(initialState.tips);
      });
    }
  }, [tips, handleSetTips]);

  useEffect(() => {
    switch (pageType) {
      case pageMap.b:
        handleGetBlogData({ ...searchParamRef.current, page, pageSize });
        break;
      case pageMap.w:
        handleGetWebsiteData({ ...searchParamRef.current, page, pageSize });
        break;
      case pageMap.bc:
        handleGetBlogCategory(pageMap.bc);
        break;
      case pageMap.wc:
        handleGetWebsiteCategory(pageMap.wc);
        break;
    }
  }, [
    pageType,
    page,
    pageSize,
    handleGetBlogData,
    handleGetWebsiteData,
    handleGetBlogCategory,
    handleGetWebsiteCategory,
  ]);

  useEffect(() => {
    if (pageType) {
      if (pageType === pageMap.b) {
        handleGetBlogCategory(pageMap.b);
      } else if (pageType === pageMap.w) {
        handleGetWebsiteCategory(pageMap.w);
      }
    }
  }, [pageType, handleGetBlogCategory, handleGetWebsiteCategory]);

  useEffect(() => {
    return () => {
      handleSetPageType(pageMap.b as PageType);
    };
  }, [currentPage, handleSetPageType]);

  return (
    <LeftRightLayout menu={<Menu data={authMenu} currentSelected={pageType} />}>
      <Layout className="manage-wrapper">
        {["wc", "bc"].includes(location.hash.substring(1)) ? null : (
          <Header>
            <BaseForm
              ref={baseFormRef}
              formItems={memoedFilterForm}
              onBtnClick={handleBtnClick}
              onSubmit={handleSearch}
            />
          </Header>
        )}
        <Content>
          <section className="table-handles">
            <BaseForm formItems={manageTableBtns} onBtnClick={handleBtnClick} />
          </section>
          <ErrorBoundary>
            <BaseTable
              showNum={true}
              columns={columns}
              page={page}
              pageSize={pageSize}
              total={memoedTableData.total}
              size={tableSize}
              dataSource={memoedTableData.dataSource}
              selectedRowKeys={selectedRowKeys}
              onRowSelected={handleTableRowSelected}
              onPageChange={handlePageChange}
            />
          </ErrorBoundary>
          <Modal
            type={modalType}
            visible={modalVisible}
            onCancel={handleCancel}
            onOk={handleOk}
            defaultFieldsValue={defaultFieldsValue}
            deleteTip={deleteTip}
            formItems={memoedSubmitForm} // formItems
          />
        </Content>
      </Layout>
    </LeftRightLayout>
  );
};

const mapStateToProps = (state: State) => {
  const {
    manage: {
      modalType,
      modalVisible,
      pageType,
      selectedRowKeys,
      tips,
      tableData,
      page,
      pageSize,
      total,
      categoryList,
      authMenu,
      requestComplete,
    },
    common: { currentPage },
  } = state;

  return {
    modalType,
    modalVisible,
    pageType,
    selectedRowKeys,
    tips,
    tableData,
    page,
    pageSize,
    total,
    categoryList,
    authMenu,
    requestComplete,
    currentPage,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    handleSetModalType(modalType: string) {
      dispatch(actionCreators.setModalType(modalType));
    },
    handleSetModalVisible(modalVisible: boolean) {
      dispatch(actionCreators.setModalVisible(modalVisible));
    },
    handleSetPageType(pageType: PageType) {
      dispatch(actionCreators.setPageType(pageType));
    },
    handleSetSelectedRowKeys(selectedRowKeys: Array<React.Key>) {
      dispatch(actionCreators.setSelectedRowKeys(selectedRowKeys));
    },
    handleSetTips(tips: Tips) {
      dispatch(actionCreators.setTips(tips));
    },
    handleSetPage(page: number) {
      dispatch(actionCreators.setPage(page));
    },
    handleSetPageSize(pageSize: number) {
      dispatch(actionCreators.setPage(pageSize));
    },
    handleSetTotal(total: number) {
      dispatch(actionCreators.setTotal(total));
    },
    hanldeClearTableData() {
      dispatch(actionCreators.setTableData([]));
    },
    // 获取菜单
    handleGetMenu() {
      dispatch(actionCreators.actionGetMenu() as any);
    },
    // 获取网站分类
    handleGetWebsiteCategory(type: string) {
      dispatch(actionCreators.actionGetWebsiteCategory(type) as any);
    },
    // 新增网站分类
    handleAddWebsiteCategory(category: string) {
      dispatch(actionCreators.actionAddWebsiteCategory(category) as any);
    },
    // 修改网站分类
    handleUpdateWebsiteCategory(key: number, category: string) {
      dispatch(
        actionCreators.actionUpdateWebsiteCategory(key, category) as any
      );
    },
    // 删除网站分类
    handleDeleteWebsiteCategory(key: string) {
      dispatch(actionCreators.actionDeleteWebsiteCategory(key) as any);
    },
    // 获取网站数据
    handleGetWebsiteData(websiteListData: WebsiteListData) {
      dispatch(actionCreators.actionGetWebsiteData(websiteListData) as any);
    },
    // 新增网站
    handleAddWebsite(webInfo: WebInfoData) {
      dispatch(actionCreators.actionAddWebsiteData(webInfo) as any);
    },
    // 修改网站信息
    handleUpdateWebsite(
      updateWebInfo: UpdateWebInfoData,
      searchParam: ManageSearchParam
    ) {
      dispatch(
        actionCreators.actionUpdateWebsiteData(
          updateWebInfo,
          searchParam
        ) as any
      );
    },
    // 删除网站
    handleDeleteWebsite(key: string, searchParam: ManageSearchParam) {
      dispatch(actionCreators.actionDeleteWebsiteData(key, searchParam) as any);
    },
    // 获取博客分类
    handleGetBlogCategory(type: string) {
      dispatch(actionCreators.actionGetBlogCategory(type) as any);
    },
    // 新增博客分类
    handleAddBlogCategory(category: string) {
      dispatch(actionCreators.actionAddBlogCategory(category) as any);
    },
    // 修改博客分类
    handleUpdateBlogCategory(key: number, category: string) {
      dispatch(actionCreators.actionUpdateBlogCategory(key, category) as any);
    },
    // 删除博客分类
    handleDeleteBlogCategory(key: string) {
      dispatch(actionCreators.actionDeleteBlogCategory(key) as any);
    },
    // 获取博客数据
    handleGetBlogData(blogListData: BlogListData) {
      dispatch(actionCreators.actionGetBlogData(blogListData) as any);
    },
    // 新增博客
    handleAddBlog(blogInfo: BlogInfo) {
      dispatch(actionCreators.actionAddBlogData(blogInfo) as any);
    },
    // 修改博客
    handleUpdateBlog(
      updateBlogInfo: UpdateBlogInfo,
      searchParam: ManageSearchParam
    ) {
      dispatch(
        actionCreators.actionUpdateBlogData(updateBlogInfo, searchParam) as any
      );
    },
    // 删除博客
    handleDeleteBlog(key: string, searchParam: ManageSearchParam) {
      dispatch(actionCreators.actionDeleteBlogData(key, searchParam) as any);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Manage);
