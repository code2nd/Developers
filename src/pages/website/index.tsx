import { FC, useEffect } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import LeftRightLayout from "container/leftRightLayout";
import AnchorMenu from "./components/anchor";
import Classify from "./components/classify";
import { NavItem, WebsiteItem } from "types/website";
import { State } from "types/common";
import { actionCreators } from "./store";
import MenuSkeleton from "components/skeletons/menu";
import WebsiteSkeleton from 'components/skeletons/websiteSkeleton';
import "./index.scss";

interface WebsiteProps {
  navData: Array<NavItem>;
  websiteList: Array<WebsiteItem>;
  hash: string;
  handleGetNavData: () => void;
  handleGetWebsiteList: () => void;
  handleSetHash: (hash: string) => void;
}

const Website: FC<WebsiteProps> = (props) => {
  const {
    navData,
    websiteList,
    hash,
    handleGetNavData,
    handleGetWebsiteList,
    handleSetHash,
  } = props;

  const handleAnchorChange = (link: string) => {
    handleSetHash(link);
  };

  useEffect(() => {
    handleGetNavData();
    handleGetWebsiteList();
  }, [handleGetNavData, handleGetWebsiteList]);

  useEffect(() => {
    if (hash) {
      const AimDom = document.getElementById(hash);
      if (AimDom) {
        AimDom.scrollIntoView({
          block: "start",
          behavior: "smooth",
        });
      }
    }
  }, [hash]);

  return (
    <LeftRightLayout
      menu={
        navData.length ? 
        <AnchorMenu navData={navData} hash={hash} onAnchorChange={handleAnchorChange} /> : 
        <MenuSkeleton />
      }
      className="website-wrapper"
    >
      <>
        {
          websiteList.length > 0 ? 
            websiteList.map((item) => (
              <Classify data={item} key={item.key} />
            )) : <WebsiteSkeleton />
        }
      </>
    </LeftRightLayout>
  );
};

const mapStateToProps = (state: State) => {
  const {
    website: { navData, websiteList, hash },
  } = state;

  return {
    navData,
    websiteList,
    hash,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    handleGetNavData() {
      dispatch(actionCreators.actionGetNavData() as any);
    },
    handleGetWebsiteList() {
      dispatch(actionCreators.actionGetWebsiteList() as any);
    },
    handleSetHash(hash: string) {
      dispatch(actionCreators.setHash(hash));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Website);
