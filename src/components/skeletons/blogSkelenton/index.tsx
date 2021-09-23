import { Skeleton } from 'antd';

const MenuSkeleton = () => {
  return <section style={{ marginTop: '16px', padding: '20px', background: '#ffffff', width: '100%' }}>
    <Skeleton active paragraph={{ rows: 4 }} />
  </section>
}

export default MenuSkeleton;