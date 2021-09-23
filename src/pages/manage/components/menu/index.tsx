import { FC } from "react";
import { Menu } from "antd";
import { PageType, AuthMenu } from "types/manage";
import "./index.scss";

interface ManageMenuProps {
  data: AuthMenu[];
  currentSelected: PageType;
}

const ManageMenu: FC<ManageMenuProps> = (props) => {
  const { data, currentSelected /* , onSelect */ } = props;

  /*  const handleSelect = (info: SelectInfo) => {
    const { key } = info;
    onSelect && onSelect(key as PageType);
  }; */

  return (
    <section className="manage-manu-wrapper">
      <Menu selectedKeys={[currentSelected]}>
        {data.map((item) => (
          <Menu.Item key={item.key}>
            <a href={item.href}>{item.value}</a>
          </Menu.Item>
        ))}
      </Menu>
    </section>
  );
};

export default ManageMenu;
