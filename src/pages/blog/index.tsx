import { FC, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Row, Col } from "antd";
import InfiniteScroll from "react-infinite-scroller";
import { State } from "types/common";
import { KeyValue } from "types/form";
import { BlogListData } from "types/api";
import { actionCreators } from "./store";
import { BlogListItem } from "types/blog";
import Filter from "./components/filter";
import BlogList from "./components/list";
import { initialState } from "./store";
import BlogSkelenton from 'components/skeletons/blogSkelenton';
import { handleCancelRequest } from "utils/tools";
import "./index.scss";

interface BlogProps {
  device: string;
  blogList: BlogListItem[];
  page: number;
  pageSize: number;
  total: number;
  loading: boolean;
  hasMore: boolean;
  blogCategory: KeyValue[];
  category: number | undefined;
  date: string | undefined;
  pageStart: number;
  handleGetBlogList: (blogListData: BlogListData, type: string) => void;
  handleSetPage: (page: number) => void;
  handleSetLoading: (loading: boolean) => void;
  handleSetHasMore: (hasMore: boolean) => void;
  handleSetBlogCategory: () => void;
  handleSetCategory: (category: number | undefined) => void;
  handleSetDate: (date: string | undefined) => void;
  handleInitState: () => void;
}

const Blog: FC<BlogProps> = (props) => {
  const {
    device,
    blogList,
    page,
    pageSize,
    total,
    loading,
    hasMore,
    category,
    date,
    blogCategory,
    handleGetBlogList,
    handleSetPage,
    handleSetLoading,
    handleSetHasMore,
    handleSetBlogCategory,
    handleSetCategory,
    handleSetDate,
    handleInitState,
  } = props;

  const flag = useRef(1);

  const handleInfiniteOnLoad = () => {
    handleSetLoading(true);
    if (blogList.length >= total) {
      handleSetHasMore(false);
      handleSetLoading(false);
      return;
    }
    flag.current++;
    handleSetPage(page+1);
  };

  const handleCategoryChange = (category: number | undefined) => {
    flag.current = 1;
    handleSetHasMore(true);
    handleSetPage(initialState.page);
    handleSetCategory(category);
  };

  const handleDateChange = (date: string | undefined) => {
    flag.current = 1;
    handleSetHasMore(true);
    handleSetPage(initialState.page);
    handleSetDate(date);
  };

  useEffect(() => {
    handleCancelRequest();
  }, [category, date]);

  useEffect(() => {
    handleSetBlogCategory();
  }, [handleSetBlogCategory]);

  useEffect(() => {
    if (hasMore) {
      if (flag.current === 1) {
        handleGetBlogList({ page, pageSize, category, date }, "set");
      } else {
        handleGetBlogList({ page, pageSize, category, date }, "add");
      }
    }
  }, [handleGetBlogList, page, pageSize, hasMore, category, date]);

  useEffect(() => {
    return () => {
      handleInitState();
    };
  }, [handleInitState]);

  return (
    <section className="blog-wrapper">
      <InfiniteScroll
        initialLoad={false}
        pageStart={0}
        loadMore={handleInfiniteOnLoad}
        hasMore={!loading && hasMore}
        useWindow={false}
      >
        <Row>
          <Col xl={{ span: 16, offset: 4 }} lg={{ span: 18, offset: 3 }}>
            <Filter
              blogCategory={blogCategory}
              onCategoryChange={handleCategoryChange}
              onDateChange={handleDateChange}
            />
            {loading && !blogList.length ? (
              <BlogSkelenton />
            ) : (
              <BlogList
                blogList={blogList}
                loading={loading}
                hasMore={hasMore}
                itemLayout={device === "pc" ? "horizontal" : "vertical"}
              />
            )}
          </Col>
        </Row>
      </InfiniteScroll>
    </section>
  );
};

const mapStateToProps = (state: State) => {
  const {
    common: { device },
    blog: {
      blogList,
      page,
      pageSize,
      total,
      loading,
      hasMore,
      blogCategory,
      category,
      date,
    },
  } = state;

  return {
    device,
    blogList,
    page,
    pageSize,
    total,
    loading,
    hasMore,
    blogCategory,
    category,
    date,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    handleGetBlogList(blogListData: BlogListData, type: string) {
      dispatch(actionCreators.actionGetBlogList(blogListData, type) as any);
    },
    handleSetPage(page: number) {
      dispatch(actionCreators.setPage(page));
    },
    handleSetLoading(loading: boolean) {
      dispatch(actionCreators.setLoading(loading));
    },
    handleSetHasMore(hasMore: boolean) {
      dispatch(actionCreators.setHasMore(hasMore));
    },
    handleSetBlogCategory() {
      dispatch(actionCreators.actionGetBlogCategory() as any);
    },
    handleSetCategory(category: number | undefined) {
      dispatch(actionCreators.setCategory(category));
    },
    handleSetDate(date: string | undefined) {
      dispatch(actionCreators.setDate(date));
    },
    handleInitState() {
      dispatch(actionCreators.initState());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Blog);
