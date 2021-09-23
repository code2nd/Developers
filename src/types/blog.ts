import { KeyValue } from 'types/form';

export interface BlogState {
  blogList: BlogListItem[];
  page: number;
  pageSize: number;
  total: number;
  loading: boolean;
  hasMore: boolean;
  blogCategory: KeyValue[];
  category: number | undefined;
  date: string | undefined;
};

export interface BlogAction extends BlogState {
  type: string;
}

export type BlogListItem = {
  key: number;
  title: string;
  url: string;
  description: string;
  date: string;
  category: string;
  category_id: number;
  sort: number;
};

export interface WebsiteAction extends BlogListItem {
  type: string;
};