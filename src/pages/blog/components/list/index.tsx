import { FC, memo } from "react";
import { List, Tag, Spin, Space } from "antd";
import { BlogListItem } from "types/blog";
import { ListItemLayout } from "antd/lib/list";

interface BlogListProps {
  blogList: BlogListItem[];
  loading: boolean;
  hasMore: boolean;
  itemLayout: ListItemLayout | undefined;
}

const COLORS = [
  "magenta",
  "red",
  "volcano",
  "orange",
  "gold",
  "lime",
  "green",
  "cyan",
  "blue",
  "geekblue",
  "purple",
  "yellow",
  "pink",
  "plum",
  "powderblue",
  "rosybrown",
  "royalblue",
  "saddlebrown",
  "salmon",
  "sandybrown",
  "sapphire",
  "scarlet",
  "sienna",
  "skyblue",
  "slateblue",
  "peachpuff",
  "peru",
];

const BlogList: FC<BlogListProps> = (props) => {
  const { blogList, hasMore, loading, itemLayout } = props;

  return (
    <List
      className="blog-list"
      dataSource={blogList}
      itemLayout={itemLayout}
      locale={{
        emptyText: "暂无数据",
      }}
      renderItem={(item) => (
        <List.Item key={item.key} actions={[<span>{item.date}</span>]}>
          <List.Item.Meta
            title={
              <Space>
                <Tag color={COLORS[item.sort]}>{item.category}</Tag>
                <a href={item.url} target="_blank" rel="noreferrer">
                  {item.title}
                </a>
              </Space>
            }
            description={item.description}
          />
        </List.Item>
      )}
    >
      {loading && hasMore && (
        <div className="list-loading-container">
          <Spin />
        </div>
      )}
    </List>
  );
};

export default memo(BlogList);
