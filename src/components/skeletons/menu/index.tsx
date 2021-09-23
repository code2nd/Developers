import { Skeleton } from 'antd';

const MenuSkeleton = () => {
  return <section style={{ padding: '0 30px' }}>
    <Skeleton active paragraph={{ rows: 4 }} />
  </section>
}

export default MenuSkeleton;