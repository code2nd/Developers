import { Avatar, Button, Popover } from 'antd';

// 网站分类 博客分类
export const categoryColumns = [
  {
    title: '分类',
    dataIndex: 'value',
    key: 'value',
    width: '90%',
    align: 'center'
  },
];

// 网站列表
export const websiteListColumns = [
  {
    key: 'name',
    title: '网站名称',
    dataIndex: 'name',
    align: 'center',
    width: '10%'
  },
  {
    key: 'url',
    title: '网站地址',
    dataIndex: 'url',
    align: 'center',
    width: '30%',
    render: (text: string) => (
      <Button type='link' href={text} target='_blank'>
        {text}
      </Button>
    ),
  },
  {
    key: 'logo',
    title: '网站logo',
    dataIndex: 'logo',
    align: 'center',
    width: '10%',
    render: (text: string) => <Avatar src={text} />,
  },
  {
    key: 'category',
    title: '网站分类',
    dataIndex: 'category',
    align: 'center',
    width: '10%'
  },
  {
    key: 'description',
    title: '网站描述',
    dataIndex: 'description',
    align: 'center',
    width: '30%'
  },
];

// 博客列表
export const blogListColumns = [
  {
    key: 'title',
    title: '博客标题',
    dataIndex: 'title',
    align: 'center',
    width: '30%',
    ellipsis: true,
    render: (text: string) => (
      <Popover placement='bottom' content={text} trigger='hover'>
        {text}
      </Popover>
    ),
  },
  {
    key: 'url',
    title: '博客地址',
    dataIndex: 'url',
    align: 'center',
    width: '10%',
    render: (text: string) => (
      <Popover placement='bottom' content={text} trigger='hover'>
        <Button type='link' href={text} target='_blank'>
          地址
        </Button>
      </Popover>
    ),
  },
  {
    key: 'category',
    title: '博客分类',
    dataIndex: 'category',
    align: 'center',
    width: '10%',
  },
  {
    key: 'description',
    title: '简要概述',
    dataIndex: 'description',
    align: 'center',
    width: '30%',
    ellipsis: true,
    render: (text: string) => (
      <Popover placement='bottom' content={text} trigger='hover'>
        {text}
      </Popover>
    ),
  },
  {
    key: 'date',
    title: '发表时间',
    dataIndex: 'date',
    align: 'center',
    width: '10%',
  },
];
