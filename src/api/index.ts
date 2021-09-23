import request from './request';
import {
  RegisterData,
  LoginData,
  WebsiteListData,
  WebInfoData,
  UpdateWebInfoData,
  BlogListData,
  BlogInfo,
  UpdateBlogInfo
} from 'types/api';

const baseUrl =  process.env.NODE_ENV === 'development' ? `http://${window.location.host}` : `https://${window.location.host}/api`;

// 注册
export const register = (register: RegisterData) => request(baseUrl + '/user/register', { ...register }, 'POST');

// 登录
export const login = (login: LoginData) => request(baseUrl + '/user/login', { ...login }, 'POST');

// 退出登录
export const logout = () => request(baseUrl + '/user/logout', {}, 'POST');

// 根据用户权限获取管理页菜单
export const getAuthMenu = () => request(baseUrl + '/user/menu', {}, 'GET');

// 获取用户信息
export const getUserInfo = () => request(baseUrl + '/user/userInfo', {}, 'GET');

// 获取网站列表（所有的分类数据）
export const getClassifiedWeblist = () => request(baseUrl + '/weblist', {}, 'GET');

// 获取网站列表
export const getWebsiteList = (websiteList: WebsiteListData) => request(baseUrl + '/web', websiteList, 'GET');

// 新增网站信息
export const addWebsite = (webInfo: WebInfoData) => request(baseUrl + '/web', webInfo,  'POST', 'logo'); // 最后一个参数为特殊请求（此处为文件上传，logo为字段名）

// 更新网站信息
export const updateWebsite = (updateWebInfo: UpdateWebInfoData) => request(baseUrl + '/web', updateWebInfo, 'PUT', 'logo');

// 删除网站信息
export const deleteWebsite = (key: string) => request(baseUrl + '/web', { key }, 'DELETE');

// 获取网站分类列表
export const getWebsiteCategories = () => request(baseUrl + '/web/category', {}, 'GET');

// 新增网站分类
export const addWebsiteCategory = (category: string) => request(baseUrl + '/web/category', { category },  'POST');

// 修改网站分类
export const updateWebsiteCategory = (key: number, category: string) => request(baseUrl + '/web/category', { key, category },  'PUT');

// 删除网站分类
export const deleteWebsiteCategory = (key: string) => request(baseUrl + '/web/category', { key },  'DELETE');

// 获取博客列表
export const getBlogList = (blogList: BlogListData) => request(baseUrl + '/blog', blogList, 'GET');

// 新增博客
export const addBlog = (blogInfo: BlogInfo) => request(baseUrl + '/blog', blogInfo, 'POST');

// 修改博客
export const updateBlog = (updateBlogInfo: UpdateBlogInfo) => request(baseUrl + '/blog', updateBlogInfo, 'PUT');

// 删除博客
export const deleteBlog = (key: string) => request(baseUrl + '/blog', { key }, 'DELETE');

// 获取博客分类列表
export const getBlogCategories = () => request(baseUrl + '/blog/category', {}, 'GET');

// 新增博客分类
export const addBlogCategory = (category: string) => request(baseUrl + '/blog/category', { category }, 'POST');

// 修改博客分类
export const updateBlogCategory = (key: number, category: string) => request(baseUrl + '/blog/category', { key, category }, 'PUT');

// 删除博客分类
export const deleteBlogCategory = (key: string) => request(baseUrl + '/blog/category', { key }, 'DELETE');