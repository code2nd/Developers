import { CSSProperties, FC, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { Dispatch } from "redux";
import { Menu, Popover } from "antd";
import { UnorderedListOutlined } from "@ant-design/icons";
import { State } from "types/common";
import { MenuInfo } from "rc-menu/lib/interface";
import { actionCreators } from "store/common";
import { handleCancelRequest } from "utils/tools";

interface NaviProps {
  isLogin: boolean;
  currentPage: string;
  styles?: CSSProperties | undefined;
  isPC?: boolean;
  handleSetCurrentPage: (currentPage: string) => void;
}

interface VerticalNaviProps {
  isLogin: boolean;
  currentPage: string;
  onClick: (info: MenuInfo) => void;
}

const VerticalNavi: FC<VerticalNaviProps> = (props) => {
  const { isLogin, currentPage } = props;

  return (
    <Menu
      style={{ border: "none" }}
      theme="light"
      mode="vertical"
      // defaultSelectedKeys={["/"]}
      selectedKeys={[currentPage]}
      onClick={props.onClick}
    >
      <Menu.Item key="/">网站</Menu.Item>
      {isLogin ? <Menu.Item key="/blog">博客</Menu.Item> : null}
    </Menu>
  );
};

const Navi: FC<NaviProps> = (props) => {
  const { styles, isPC, isLogin, currentPage, handleSetCurrentPage } = props;

  const history = useHistory();
  const location = useLocation();

  const handleClick = (info: MenuInfo) => {
    const { key } = info;
    history.push(key);
    handleSetCurrentPage(key);

    handleCancelRequest();
  };

  useEffect(() => {
    handleSetCurrentPage(location.pathname);
  }, [location, handleSetCurrentPage]);

  return (
    <>
      {isPC ? (
        <Menu
          style={styles}
          theme="light"
          mode="horizontal"
          selectedKeys={[currentPage]}
          onClick={handleClick}
        >
          <Menu.Item key="/">网站</Menu.Item>
          {isLogin ? (
            <>
              <Menu.Item key="/blog">博客</Menu.Item>
              <Menu.Item key="/manage">管理</Menu.Item>
            </>
          ) : null}
        </Menu>
      ) : (
        <Popover
          placement="bottomRight"
          content={
            <VerticalNavi
              isLogin={isLogin}
              onClick={handleClick}
              currentPage={currentPage}
            />
          }
          trigger="click"
        >
          <UnorderedListOutlined />
        </Popover>
      )}
    </>
  );
};

Navi.defaultProps = {
  isPC: true,
};

const mapStateToProps = (state: State) => {
  const {
    common: { currentPage },
  } = state;
  return {
    currentPage,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    /*     hansleSetCurrenPage(currentPage: string) {
      dispatch(actionCreators.setCurrentPage(currentPage));
    }, */
    handleSetCurrentPage(currentPage: string) {
      dispatch(actionCreators.setCurrentPage(currentPage));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navi);
