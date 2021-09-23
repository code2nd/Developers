import { FC, useCallback, useMemo, ReactChild, ReactNode } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Layout, Row, Col } from "antd";
import DrawerCmp from "components/drawer";
import SiderCmp from "components/sider";
import { actionCreators } from "store/common";
import { State, Device } from "types/common";
import "./index.scss";

const { Content } = Layout;

interface LeftRightLayoutProps {
  device: Device;
  drawerVisible: boolean;
  menu: ReactNode;
  children: ReactChild;
  className?: string; 
  handleSetDrawerVisible: (drawerVisible: boolean) => void;
}

const LeftRightLayout: FC<LeftRightLayoutProps> = (props) => {
  const { device, drawerVisible, menu, className, handleSetDrawerVisible } = props;

  const onClose = useCallback(() => {
    handleSetDrawerVisible(!drawerVisible);
  }, [drawerVisible, handleSetDrawerVisible]);

  const hanldeDrawerIconClick = (visible: boolean) => {
    handleSetDrawerVisible(visible);
  };

  const isPC = useMemo(() => device === "pc", [device]);

  return (
    <Layout className={`left-right-layout ${className}`}>
      <Row>
        {isPC ? (
          <Col xl={4} md={6}>
            <SiderCmp>{menu}</SiderCmp>
          </Col>
        ) : (
          <DrawerCmp
            menu={menu}
            onClose={onClose}
            onIconClick={hanldeDrawerIconClick}
            visible={drawerVisible}
          />
        )}
        <Col
          className="content-wrapper"
          xl={isPC ? 20 : 24}
          md={isPC ? 18 : 24}
          sm={24}
          xs={24}
        >
          <Content
            id="scroll-content"
            className="content-main"
            // style={{ padding: isPC ? "0 64px" : "0 16px" }}
          >
            {props.children}
          </Content>
        </Col>
      </Row>
    </Layout>
  );
};

const maStateToProps = (state: State) => {
  const {
    common: { device, drawerVisible },
  } = state;

  return {
    device,
    drawerVisible,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    handleSetDrawerVisible(drawerVisible: boolean) {
      dispatch(actionCreators.setDrawerVisible(drawerVisible));
    },
  };
};

export default connect(maStateToProps, mapDispatchToProps)(LeftRightLayout);
