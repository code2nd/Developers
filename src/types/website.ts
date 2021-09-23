export type NavItem = {
  key: number;
  value: string;
};

export type WebsiteListItem = {
  key: number;
  name: string;
  url: string;
  description: string;
  logo: string;
  category: string;
  category_id: number;
};

export type WebsiteItem = {
  key: number;
  name: string;
  list: WebsiteListItem[];
};

export type WebsiteState = {
  navData: NavItem[];
  websiteList: WebsiteItem[];
  hash: string;
};

export interface WebsiteAction extends WebsiteState {
  type: string;
}