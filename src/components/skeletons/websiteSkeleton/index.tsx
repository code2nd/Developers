import { Skeleton, Divider, List } from "antd";
import "./index.scss";

const WebsiteSkeleton = () => {
  return (
    <section className="classify-wrapper-skeleton">
      <Divider orientation="left">
        <Skeleton.Button active size="small" shape="square" />
      </Divider>
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 1,
          md: 1,
          lg: 2,
          xl: 3,
          xxl: 4,
        }}
        dataSource={Array(8).fill(0)}
        renderItem={() => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Skeleton avatar active />
              }
              title={<Skeleton title active paragraph={{ rows: 1 }} />}
              /* description={
                <Skeleton active paragraph={{ rows: 1 }} />
              } */
            />
          </List.Item>
        )}
      />
    </section>
  );
};

export default WebsiteSkeleton;
