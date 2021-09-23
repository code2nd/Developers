import { FC, memo } from 'react';
import { Button } from 'antd';
import BaseForm from 'components/baseForm';
import { loginForm } from 'utils/formConfig';

interface LoginProps {
  handleSwichToReg: (field: string) => void;
  handleFormSubmit: (fields: any) => void;
}

const Login: FC<LoginProps> = memo((props) => {

  const handleSwichToReg = (field: any) => {
    console.log(field);
    props.handleSwichToReg('register')
  }

  const handleBtnClick = (type: string) => {
    console.log(type)
  }

  return <div className="login-module">
    <BaseForm 
      layout='vertical'
      formItems={loginForm}
      onBtnClick={handleBtnClick}
      // formSubmit={props.handleFormSubmit}
    />
    <Button block onClick={handleSwichToReg}>注册新账号</Button>
  </div>
});

export default Login;