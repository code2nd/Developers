import { FC } from "react";
import { Divider, List, Avatar, Popover } from "antd";
import { WebsiteItem } from "types/website";
import defaultAvatar from 'assests/images/default.png';
import "./index.scss";

interface ClassifyProps {
  data: WebsiteItem;
}

const Classify: FC<ClassifyProps> = (props) => {
  const { data } = props;

  return (
    <section className="classify-wrapper" id={data.key + ''}>
      <Divider orientation="left" style={{ fontWeight: 'bold' }}>{data.name}</Divider>
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
        dataSource={data.list}
        renderItem={(item) => (
          <List.Item>
            <a href={item.url} target="_blank" rel="noreferrer">
              <List.Item.Meta
                avatar={<Avatar size={48} src={defaultAvatar} srcSet={item.logo} alt={item.name} />}
                title={item.name}
                description={
                  <Popover
                    content={item.description}
                    placement="bottom"
                  >
                    <div
                        style={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item.description}
                      </div>
                  </Popover>
                }
              />
            </a>
          </List.Item>
        )}
      />
    </section>
  );
};

export default Classify;
