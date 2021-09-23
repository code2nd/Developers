import { FC, ReactNode } from 'react';
import { Layout } from 'antd';
import './index.scss';

const { Sider } = Layout;

interface SiderCmpProps {
  children: ReactNode;
}

const SiderCmp: FC<SiderCmpProps> = (props) => {
  return (
    <Sider width={'100%'} className="site-sider">
      {props.children}
    </Sider>
  );
};

export default SiderCmp;
