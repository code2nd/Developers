import { FC, useLayoutEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Router from 'router/index';
import { Device } from 'types/common';
import { actionCreators } from 'store/common';
import './App.scss';

interface AppProps {
  handleSetDevice: (device: Device) => void;
}

const App: FC<AppProps> = (props) => {

  const { handleSetDevice } = props;

  const resizeFn = useCallback(() => {
    const clientWidth = document.documentElement.clientWidth;
    if (clientWidth < 768) {
      handleSetDevice('mobile');
    } else {
      handleSetDevice('pc');
    }
  }, [handleSetDevice]);

  useLayoutEffect(() => {
    resizeFn();
    window.addEventListener('resize', resizeFn);

    return () => {
      window.removeEventListener('resize', resizeFn);
    };
  }, [resizeFn]);

  return (
    <div className="App">
      <Router />
    </div>
  );
};

const mapStateToDispatch = (dispatch: Dispatch) => {
  return {
    handleSetDevice(device: Device) {
      dispatch(actionCreators.setDevice(device));
    }
  };
};

export default connect(null, mapStateToDispatch)(App);
