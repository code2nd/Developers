import { Route, Redirect } from 'react-router-dom';
import Storage from 'utils/storage';

const LStorage = new Storage('localStorage');

const AuthRoute = (props: any) => {
  const userInfo = LStorage.get('userInfo');
  if (userInfo && userInfo.isLogin) {
    return <Route {...props} />
  } else {
    return <Redirect to="/" />
  }
}

export default AuthRoute;