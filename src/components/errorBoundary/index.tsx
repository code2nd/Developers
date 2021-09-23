import React from "react";

type PropsType = {

};

type StateType = {
  hasError: boolean;
};

class ErrorBoundary extends React.Component<PropsType, StateType>  {
  constructor(props: PropsType | Readonly<PropsType>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: ErrorBoundary) {
    console.log(error);
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;