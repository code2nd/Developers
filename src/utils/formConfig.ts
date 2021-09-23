import { FormType, ButtonType, KeyValue } from "types/form";
import { ButtonHTMLType } from "antd/lib/button/button";

export const testForm = [
  {
    type: FormType.RADIOGROUP,
    field: "radio",
    initialValue: "1",
    radios: [
      {
        key: "1",
        value: "测试一",
      },
      {
        key: "2",
        value: "测试二",
      },
    ],
  },
  {
    type: FormType.INPUT,
    field: "input",
    placeholder: "输入框",
    allowClear: true,
  },
  {
    type: FormType.SELECT,
    field: "select",
    placeholder: "选择框",
    allowClear: true,
    options: [
      {
        key: "1",
        value: "测试一",
      },
      {
        key: "2",
        value: "测试二",
      },
    ],
  },
  {
    type: FormType.DATEPICKER,
    field: "datePicker",
    placeholder: "时间",
    allowClear: true,
  },
  {
    type: FormType.BUTTON,
    field: "button",
    btnType: "primary" as ButtonType,
    htmlType: "submit",
    btnText: "提交",
  },
];

// 管理页面tab按钮
export const manageTabBtns = [
  {
    type: FormType.RADIOGROUP,
    field: "radio",
    initialValue: "website",
    radios: [
      {
        key: "website",
        value: "网站",
      },
      {
        key: "blog",
        value: "博客",
      },
      {
        key: "websiteCategory",
        value: "网站分类",
      },
      {
        key: "blogCategory",
        value: "博客分类",
      },
    ],
  },
];

// 管理页面网站筛选表单
export const manageWebsiteFilterForm = (categories: Array<KeyValue>) => [
  {
    type: FormType.SELECT,
    field: "category",
    label: "类型",
    placeholder: "类型",
    allowClear: true,
    options: categories,
  },
  {
    type: FormType.INPUT,
    field: "keyword",
    label: "关键字",
    placeholder: "关键字",
    allowClear: true,
  },
  {
    type: FormType.BUTTON,
    field: "search",
    btnType: "primary" as ButtonType,
    btnHtmlType: "submit" as ButtonHTMLType,
    btnText: "查询",
    icon: "SearchOutlined",
  },
];

// 管理页面博客筛选表单
export const manageBlogFilterForm = (categories: Array<KeyValue>) => [
  {
    type: FormType.SELECT,
    field: "category",
    label: "类型",
    placeholder: "类型",
    allowClear: true,
    options: categories,
  },
  {
    type: FormType.RANGEPICKER,
    field: "date",
    label: "发表时间",
    // placeholder: "日期",
    allowClear: true,
  },
  {
    type: FormType.INPUT,
    field: "keyword",
    label: "关键字",
    placeholder: "关键字",
    allowClear: true,
  },
  {
    type: FormType.BUTTON,
    field: "search",
    btnType: "primary" as ButtonType,
    btnHtmlType: "submit" as ButtonHTMLType,
    btnText: "查询",
    icon: "SearchOutlined",
  },
];

// 管理页面网站提交表单
export const manageWebsiteSubmitForm = (categories: Array<KeyValue>) => [
  {
    type: FormType.INPUT,
    field: "name",
    label: "网站名称",
    placeholder: "网站名称",
    allowClear: true,
  },
  {
    type: FormType.SELECT,
    field: "category",
    label: "网站类型",
    placeholder: "网站类型",
    setDefaultValue: true,
    options: categories,
  },
  {
    type: FormType.INPUT,
    field: "url",
    label: "网站链接",
    placeholder: "网站链接",
    allowClear: true,
  },
  {
    type: FormType.TEXTAREA,
    field: "description",
    label: "网站描述",
    placeholder: "网站描述",
    allowClear: true,
  },
  {
    type: FormType.UPLOAD,
    field: "logo",
    label: "网站logo",
    placeholder: "网站logo",
  },
];

// 管理页面博客提交表单
export const manageBlogSubmitForm = (categories: Array<KeyValue>) => [
  {
    type: FormType.INPUT,
    field: "title",
    label: "博客标题",
    placeholder: "博客标题",
    allowClear: true,
  },
  {
    type: FormType.SELECT,
    field: "category",
    label: "博客类型",
    placeholder: "博客类型",
    setDefaultValue: true,
    options: categories,
  },
  {
    type: FormType.INPUT,
    field: "url",
    label: "博客地址",
    placeholder: "博客地址",
    allowClear: true,
  },
  {
    type: FormType.DATEPICKER,
    field: "date",
    label: "发表日期",
    placeholder: "发表日期",
  },
  {
    type: FormType.TEXTAREA,
    field: "description",
    label: "简要概述",
    placeholder: "简要概述",
    allowClear: true,
  },
];

// 管理页面操作按钮
export const manageTableBtns = [
  {
    type: FormType.BUTTON,
    field: "add",
    btnType: "primary" as ButtonType,
    btnText: "新增",
    icon: "PlusOutlined",
  },
  {
    type: FormType.BUTTON,
    field: "edit",
    btnType: "primary" as ButtonType,
    btnText: "修改",
    icon: "EditOutlined",
  },
  {
    type: FormType.BUTTON,
    field: "delete",
    btnType: "danger" as ButtonType,
    btnText: "删除",
    icon: "DeleteOutlined",
  },
];

// 管理页面筛选表单
/* export const manageHandleForm = [
  {
    type: FormType.SELECT,
    field: "category",
    label: "类型",
    placeholder: "类型",
    allowClear: true,
    options: [
      {
        key: "1",
        value: "常用推荐",
      },
      {
        key: "2",
        value: "大前端",
      },
    ],
  },
  {
    type: FormType.DATEPICKER,
    field: "dateTime",
    label: "时间",
    placeholder: "时间",
    allowClear: true,
  },
  {
    type: FormType.INPUT,
    field: "keyword",
    label: "关键字",
    placeholder: "关键字",
    allowClear: true,
  },
];
 */
// 添加分类
export const manageCategoryForm = [
  {
    type: FormType.INPUT,
    field: "category",
    label: "分类",
    placeholder: "分类",
    allowClear: true,
  },
];

export const loginForm = [
  {
    type: FormType.INPUT,
    field: "username",
    placeholder: "字母或数字组成",
    allowClear: true,
    prefix: "UserOutlined",
    rules: [{ required: true, message: "请输入用户名!" }],
  },
  {
    type: FormType.INPUT,
    field: "password",
    inputType: "password",
    allowClear: true,
    placeholder: "字母或数字组成",
    prefix: "LockOutlined",
    rules: [{ required: true, message: "请输入密码!" }],
  },
  {
    type: FormType.BUTTON,
    field: "loginBtn",
    btnHtmlType: 'submit' as ButtonHTMLType,
    btnType: "primary" as ButtonType,
    btnText: "登录",
    block: true,
  },
  {
    type: FormType.BUTTON,
    field: "register",
    btnType: "default" as ButtonType,
    btnText: "没有账号？去注册",
    block: true,
  }
];

export const registerForm = [
  {
    type: FormType.INPUT,
    field: "regUsername",
    allowClear: true,
    placeholder: "字母或数字组成",
    prefix: "UserOutlined",
    rules: [{ required: true, message: "请输入用户名!" }],
  },
  {
    type: FormType.INPUT,
    field: "password1",
    allowClear: true,
    placeholder: "字母或数字组成",
    inputType: "password",
    prefix: "LockOutlined",
    rules: [{ required: true, message: "请输入密码!" }],
  },
  {
    type: FormType.INPUT,
    field: "password2",
    allowClear: true,
    placeholder: "请重新输入密码",
    inputType: "password",
    prefix: "LockOutlined",
    rules: [
      {
        required: true,
        message: "请确认密码!",
      }/* ,
      ({ getFieldValue }: { getFieldValue: any }) => ({
        validator(rule: any, value: string) {
          if (!value || getFieldValue("password1") === value) {
            return Promise.resolve();
          }
          return Promise.reject("两次输入的密码不一致!");
        },
      }), */
    ],
  },
  {
    type: FormType.BUTTON,
    field: "registerBtn",
    btnText: "注册",
    btnType: "primary" as ButtonType,
    btnHtmlType: 'submit' as ButtonHTMLType,
    block: true,
  },
  {
    type: FormType.BUTTON,
    field: "login",
    btnText: "已有账号？返回登录",
    block: true,
    btnType: "default" as ButtonType,
  },
];
