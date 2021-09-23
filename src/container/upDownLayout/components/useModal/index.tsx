import { FC, memo } from "react";
import { Modal, Result, Button, message } from "antd";
import BaseForm from "components/baseForm";
import { registerForm, loginForm } from "utils/formConfig";
import { HandleType } from 'components/baseForm';
import { pMd5 } from "utils/tools";
import { RegisterData, LoginData } from 'types/api';

interface UserModalProps {
  type: string;
  device: string;
  showLoginModal: boolean;
  onCancel: (isShow: boolean) => void;
  onSubmit: (param: RegisterData | LoginData) => void;
  setType: (type: string) => void;
}

const UserModal: FC<UserModalProps> = (props) => {
  const { type, device, showLoginModal, onSubmit, setType } = props;

  const onCancel = () => {
    props.onCancel(false)
    setType('login');
  };

  const handleToLogin = () => {
    setType('login');
  };

  const handleToRegister = () => {
    setType('register');
  };

  const handleBtnClick = (field: HandleType) => {
    setType(field);
  }

  const handleLogin = async (fields: any) => {
    let { username, password } = fields;
    password = pMd5(username, password);
    onSubmit({username, password});
  };

  const handleRegister = async (fields: any) => {
    // console.log(fields)
    let { regUsername: username, password1, password2 } = fields;
    if (password1 !== password2) {
      message.warn("两次输入的密码不一致！");
    } else {
      password1 = pMd5(username, password1);
      password2 = pMd5(username, password2);
      onSubmit({username, password1, password2});
    }
  };

  const getTitle = (type: string) => {
    switch(type) {
      case 'login': 
      case 'loginSuccess':
        return '登录';
      case 'register': 
      case 'registerSuccess':
        return '注册';
      default: return '登录';
    }
  }

  const Content = (type: string) => {
    switch (type) {
      // 登录
      case "login":
        return (
          <BaseForm
            layout="vertical"
            formItems={loginForm}
            onBtnClick={handleBtnClick}
            onSubmit={handleLogin}
          />
        );
      // 注册
      case "register":
        return (
          <BaseForm
            layout="vertical"
            onBtnClick={handleBtnClick}
            formItems={registerForm}
            onSubmit={handleRegister}
          />
        );
      case "registerSuccess":
        return (
          <Result
            status="success"
            title="注册成功"
            extra={[
              <Button type="primary" key="toLogin" onClick={handleToLogin}>
                去登录
              </Button>,
            ]}
          />
        );
      case "registerRepeated":
        return (
          <Result
            status="error"
            title="用户名已被注册"
            extra={[
              <Button
                type="primary"
                key="toRegister"
                onClick={handleToRegister}
              >
                重新注册
              </Button>,
            ]}
          />
        );
      case "loginSuccess":
        return <Result status="success" title="登录成功，跳转中..." />;
    }
  };

  return (
    <Modal
      title={getTitle(type)}
      zIndex={100}
      visible={showLoginModal}
      destroyOnClose={true}
      footer={null}
      style={{
        width: 200,
      }}
      bodyStyle={{
        padding: device === 'pc' ? "24px 124px" : "24px",
      }}
      onCancel={onCancel}
    >
      {Content(type)}
    </Modal>
  );
};

export default memo(UserModal);
