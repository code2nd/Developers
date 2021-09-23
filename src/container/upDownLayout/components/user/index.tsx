import { FC, memo } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Avatar, Popover, List } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { UserInfo, State } from "types/common";
import UserModal from "../useModal";
import { actionCreators } from "store/common";
import { RegisterData, LoginData } from "types/api";
/* import { setShowLoginModal } from 'store/header/actionCreators'
import { logout } from 'api'
 */

interface UserProps {
  loginType: string;
  userInfo: UserInfo;
  showLoginModal: boolean;
  device: string;
  handleDispatchShowLoginModal: (isShow: boolean) => void;
  handleLogin: (data: LoginData) => void;
  handleRegister: (data: RegisterData) => void;
  handleSetType: (type: string) => void;
  handleLogout: () => void;
}

interface MenuProps {
  handleLogout: () => void;
}

const data = [
  /* {
    key: 1,
    title: "个人中心",
    action: "personal",
  }, */
  {
    key: 2,
    title: "退出登录",
    action: "logout",
  },
];

const Menu = (props: MenuProps) => {
  const { handleLogout } = props;

  const onListClick = (e: any) => {
    const action = e.target.getAttribute("data-action");
    switch (action) {
      case "logout":
        handleLogout();
        break;
      default:
        break;
    }
  };

  return (
    <List
      size="small"
      dataSource={data}
      renderItem={(item) => (
        <List.Item
          data-action={item.action}
          onClick={onListClick}
          style={{ cursor: "pointer" }}
        >
          {item.title}
        </List.Item>
      )}
    />
  );
};

const User: FC<UserProps> = memo((props) => {
  const {
    device,
    loginType,
    userInfo,
    showLoginModal,
    handleDispatchShowLoginModal,
    handleLogin,
    handleRegister,
    handleSetType,
    handleLogout,
  } = props;

  const handleAvatarClick = () => {
    handleDispatchShowLoginModal(true);
  };

  const handleCancel = () => {
    handleDispatchShowLoginModal(false);
  };

  const handleSubmit = (param: RegisterData | LoginData) => {
    const len = Object.keys(param).length;
    if (len === 2) {
      // 登录
      handleLogin(param as LoginData);
    } else if (len === 3) {
      // console.log(param);
      // 注册
      handleRegister(param as RegisterData);
    }
  };

  return (
    <>
      {userInfo.isLogin ? (
        <Popover
          placement="bottomRight"
          content={<Menu handleLogout={handleLogout} />}
          trigger="click"
        >
          <Avatar
            size={32}
            src={userInfo.avatar}
            style={{ cursor: "pointer" }}
            alt="avatar"
          />
        </Popover>
      ) : (
        <span onClick={handleAvatarClick}>
          <Avatar
            size={32}
            icon={<UserOutlined />}
            style={{ cursor: "pointer" }}
          />
        </span>
      )}
      <UserModal
        type={loginType}
        showLoginModal={showLoginModal}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
        setType={handleSetType}
        device={device}
      />
    </>
  );
});

const mapStateToState = (state: State) => {
  const {
    common: { loginType, showLoginModal, device },
  } = state;

  return {
    device,
    loginType,
    showLoginModal,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    handleDispatchShowLoginModal(isShow = false) {
      dispatch(actionCreators.setShowLoginModal(isShow));
    },
    handleLogin(data: LoginData) {
      dispatch(actionCreators.actionLogin(data) as any);
    },
    handleRegister(data: RegisterData) {
      dispatch(actionCreators.actionRegister(data) as any);
    },
    handleSetType(type: string) {
      dispatch(actionCreators.setLoginType(type));
    },
    handleLogout() {
      dispatch(actionCreators.actionLogout() as any);
    },
  };
};

export default connect(mapStateToState, mapDispatchToProps)(User);
