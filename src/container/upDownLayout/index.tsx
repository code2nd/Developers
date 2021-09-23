import { FC, ReactChild, useEffect, useLayoutEffect, useMemo } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { useLocation, useHistory } from "react-router-dom";
import { Row, Col, Layout, message } from "antd";
import { State, Device, UserInfo } from "types/common";
import User from "./components/user";
import Navi from "./components/navi";
import Logo from "./components/logo";
import { actionCreators } from "store/common";
import Storage from "utils/storage";
import "./index.scss";

const LStorage = new Storage("localStorage");

const { Header } = Layout;

interface UpDownLayoutProps {
  userInfo: UserInfo;
  device: Device;
  drawerVisible: boolean;
  errorMsg: string;
  children: ReactChild;
  handleGetUserInfo: () => void;
  handleSetUserInfo: (userInfo: UserInfo) => void;
  handleSetErrorMsg: (errorMsg: string) => void;
}

const UpDownLayout: FC<UpDownLayoutProps> = (props) => {
  const {
    userInfo,
    device,
    drawerVisible,
    errorMsg,
    handleGetUserInfo,
    handleSetUserInfo,
    handleSetErrorMsg
  } = props;
  const history = useHistory();
  const location = useLocation();

  useLayoutEffect(() => {
    if (device === "mobile" && location.pathname === "/manage") {
      history.push("/");
    }
  }, [location, device, history]);

  useEffect(() => {
    if (errorMsg) {
      message.error(errorMsg, () => {
        handleSetErrorMsg('');
      });
    }
  }, [errorMsg, handleSetErrorMsg]);

  useEffect(() => {
    const storagedUserInfo = LStorage.get("userInfo");
    if (
      !userInfo.isLogin &&
      (!(storagedUserInfo && storagedUserInfo.isLogin) || !storagedUserInfo) &&
      location.pathname !== "/"
    ) {
      history.push("/");
    }
  }, [userInfo, location, history]);

  useEffect(() => {
    const userInfo = LStorage.get("userInfo");
    if (userInfo && userInfo.isLogin) {
      handleSetUserInfo(userInfo);
    } else {
      handleGetUserInfo();
    }
  }, [handleGetUserInfo, handleSetUserInfo]);

  const isPC = useMemo(() => device === "pc", [device]);

  const content = <Layout className={`up-down-layout ${drawerVisible ? "drawer-open" : ""}`}>
  <Header className="header">
    <Row align="middle">
      <Col xl={isPC ? 4 : 24} md={isPC ? 6 : 24}>
        <h1 className="web-title">
          <Logo />
          {isPC ? null : (
            <div className="user-wrap">
              <Navi isPC={isPC} isLogin={userInfo.isLogin} />
              <User userInfo={userInfo} />
            </div>
          )}
        </h1>
      </Col>
      {isPC ? (
        <Col className="nav-wrap" xl={18} md={16}>
          <span className="divider" />
          <Navi isLogin={userInfo.isLogin} styles={{ flex: 1 }} />
        </Col>
      ) : null}
      <Col span={2} style={{ textAlign: "center" }}>
        {isPC ? <User userInfo={userInfo} /> : null}
      </Col>
    </Row>
  </Header>
  <section className="main-content">{props.children}</section>
</Layout>

  return (
    <>
      {
        isPC ? content : 
        <section className="mobile-main">
          <div className="blank" style={{ width: `${drawerVisible ? "256px" : "0"}` }} />
          <div style={{ flex: 1, overflowX: 'hidden' }}>
            { content }
          </div>
        </section>
      }
    </>
  );
};

const mapStateToProps = (state: State) => {
  const {
    common: { userInfo, device, drawerVisible, currentPage, errorMsg },
  } = state;

  return {
    userInfo,
    device,
    drawerVisible,
    currentPage,
    errorMsg
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    handleGetUserInfo() {
      dispatch(actionCreators.actionGetUserInfo() as any);
    },
    handleSetUserInfo(userInfo: UserInfo) {
      dispatch(actionCreators.setUserInfo(userInfo));
    },
    handleSetErrorMsg(errorMsg: string) {
      dispatch(actionCreators.setErrorMsg(errorMsg));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpDownLayout);
