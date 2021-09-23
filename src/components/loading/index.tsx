import { Spin } from 'antd';

const Loading = () => {
  return (
    <section style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Spin size="large" />
    </section>
  );
}

export default Loading;