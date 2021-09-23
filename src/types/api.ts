// 注册
export type RegisterData = {
  username: string;
  password1: string;
  password2: string;
};

// 登录

export type LoginData = {
  username: string;
  password: string;
}

// 获取网站列表
export type WebsiteListData = {
  page: number;
  pageSize: number;
  category?: number;
  keyword?: string;

}

// 添加网站信息
export interface WebInfoData {
  name: string;
  url: string;
  description: string;
  logo: File | string;
  category: number;
  // file: File;      // File
}

// 修改网站信息
export interface UpdateWebInfoData extends Partial<WebInfoData> {
  key: string;
};

// 获取文章列表
export type BlogListData = {
  page: number;
  pageSize: number;
  category?: number;
  keyword?: string;
  date?: string;
};

export interface BlogInfo {
  title: string;
  url: string;
  category: number;
  date: string;
  description: string;
}

export interface UpdateBlogInfo extends Partial<BlogInfo> {
  key: string;
}