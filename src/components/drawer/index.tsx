import { FC, ReactNode, useState } from "react";
import { Drawer } from "antd";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";

import "./index.scss";

interface DrawerCmpProps {
  visible: boolean;
  menu: ReactNode;
  onClose: () => void;
  onIconClick: (visible: boolean) => void;
}

const DRAWER_WIDTH = 256;

const DrawerCmp: FC<DrawerCmpProps> = (props) => {
  const { visible, menu, onClose, onIconClick } = props;

  const [fakeBtnShow, setFakeBtnShow] = useState(true);

  const handleClick = () => {
    onIconClick(!visible);
  };

  const handleFakeBtnClick = () => {
    onIconClick(true);
    setFakeBtnShow(false);
  }

  return (
    <aside className="drawer-box">
      <div className="fake-drawer-handle-btn" style={{ display: fakeBtnShow ? 'block' : 'none' }} onClick={handleFakeBtnClick}>
        <MenuOutlined />
      </div>
      <Drawer
        className="custom-drawer"
        // title="Basic Drawer"
        placement="left"
        closable={false}
        onClose={onClose}
        visible={visible}
        width={DRAWER_WIDTH}
      >
        <div className="drawer-handle-btn" onClick={handleClick}>
          {visible ? <CloseOutlined /> : <MenuOutlined />}
        </div>
        {
          menu
        }
      </Drawer>
    </aside>
  );
};

export default DrawerCmp;
