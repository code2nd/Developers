import { FC, memo } from "react";
import { Anchor } from "antd";
import { AnchorContainer } from "antd/lib/anchor/Anchor";
import { NavItem } from "types/website";
import "./index.scss";

const { Link } = Anchor;

interface AnchorMenuProps {
  hash?: string;
  navData?: Array<NavItem>;
  onAnchorChange?: (link: string) => void;
}

const AnchorNav: FC<AnchorMenuProps> = (props) => {
  const { hash, navData } = props;

  const generateDom = (data: Array<NavItem> | undefined) => {
    if (data && data.length) {
      return data.map((item) => (
        <li className="anchor-menu-group" key={item.key}>
          <Link
            className={`anchor-menu-item ${
              hash === String(item.key) ? "anchor-menu-item-selected" : ""
            }`}
            key={item.key}
            href={`#${item.key}`}
            title={item.value}
          />
          <i className="line" />
        </li>
      ));
    }

    return null;
  };

  const onAnchorChange = (link: string) => {
    props.onAnchorChange && props.onAnchorChange(link);
  };

  return (
    <>
      <section className="anchor-menu-wrap">
        <Anchor
          className="anchor-menu"
          getContainer={() =>
            document.getElementById("scroll-content") as AnchorContainer
          }
          onChange={onAnchorChange}
        >
          <ul className="anchor-menu-ul">{generateDom(navData)}</ul>
        </Anchor>
      </section>
    </>
  );
};

export default memo(AnchorNav);
