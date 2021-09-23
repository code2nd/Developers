import React, {
  useRef,
  useState,
  useImperativeHandle,
  useCallback,
  forwardRef,
  useMemo,
  memo,
} from "react";
import {
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  Radio,
  Space,
  Upload,
} from "antd";
import * as Icon from "@ant-design/icons";
import { Moment } from "moment";
import "moment/locale/zh-cn";
import locale from "antd/es/date-picker/locale/zh_CN";
import {
  FormProps,
  FormInstance,
  FormType,
  FormItem,
  OptionItem,
  RadioItem,
} from "types/form";

const { Option } = Select;
const { RangePicker } = DatePicker;

export type DefaultFieldsValue<T> = { [key: string]: T };

export type HandleType = "add" | "edit" | "delete" | "register" | "login";

export interface BaseFormProps extends FormProps {
  formItems: Array<FormItem>;
  defaultFieldsValue?: DefaultFieldsValue<any>;
  onBtnClick?: (field: HandleType) => void;
  onSubmit?: (fieldsValue: any) => void;
}

const BaseForm = forwardRef<any, BaseFormProps>((props, ref) => {
  const {
    layout,
    labelCol,
    wrapperCol,
    formItems,
    defaultFieldsValue,
    onBtnClick,
    onSubmit
  } = props;

  const [imageUrl, setImageUrl] = useState("");

  const [form] = Form.useForm<MouseEvent>();
  const formRef = useRef<FormInstance<MouseEvent>>();

  useImperativeHandle(
    ref,
    () => {
      return {
        getFormFields() {
          return form.getFieldsValue();
        },
        resetFields() {
          return form.resetFields();
        }
      };
    },
    [form]
  );

  const handleFormSubmit = (e: MouseEvent) => {
    onSubmit && onSubmit(e);
    // console.log(e);
  };

  // 渲染 select 框的 options
  const renderOptionList = (options: Array<OptionItem>) => {
    return options.length
      ? options.map((item: OptionItem) => (
          <Option value={item.key} key={item.key}>
            {item.value}
          </Option>
        ))
      : null;
  };

  // 渲染 radioGroup 的 radio
  const renderRadioList = (radios: Array<RadioItem>) => {
    return radios.length
      ? radios.map((item: OptionItem) => (
          <Radio.Button value={item.key} key={item.key}>
            {item.value}
          </Radio.Button>
        ))
      : null;
  };

  // DatePicker 的 onChange 事件
  const onDatePickerChange = (date: Moment | null, dateString: string) => {
    // console.log(date, dateString);
  };

  // 按钮点击事件
  const btnClick = useCallback(
    (field: HandleType) => {
      onBtnClick && onBtnClick(field);
    },
    [onBtnClick]
  );

  function getBase64(
    img: Blob,
    callback: { (imageUrl: any): any; (arg0: string | ArrayBuffer | null): any }
  ) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  // 图片上传
  /*   const handleUploadChange = (info: any) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        {
          setImageUrl(imageUrl);
          setLoading(false);
        }
      );
    };
  }; */

  const normFile = useCallback((e: any) => {
    getBase64(e.file, (imageUrl) => {
      setImageUrl(imageUrl);
    });

    if (Array.isArray(e)) {
      return e;
    }
    return e && e.file;
  }, []);

  const initFormItems = useMemo(() => {
    const formItemNodeList: any[] = [];

    formItems.forEach((item: FormItem, index: number) => {
      const {
        type,
        label,
        field,
        initialValue,
        width = 174,
        placeholder,
        allowClear,
        rules,
        options,
        picker,
        // dateType,
        btnType,
        btnHtmlType,
        btnText,
        radios,
        icon,
        setDefaultValue,
        prefix,
        block,
        inputType
      } = item;

      const widthConfig = {
        width: !layout || layout === "inline" ? width : "100%",
      };

      switch (type) {
        // input 框
        case FormType.INPUT:
          const prefixProps =  prefix
          ? {
              prefix: React.createElement(Reflect.get(Icon, prefix as string)),
            }
          : null;
          const INPUT = (
            <Form.Item
              label={label}
              name={field}
              rules={rules}
              key={field}
              initialValue={
                initialValue ||
                (defaultFieldsValue && defaultFieldsValue[field])
              }
            >
              <Input
                placeholder={placeholder}
                allowClear={allowClear}
                type={inputType}
                style={{ ...widthConfig }}
                value={initialValue}
                {...prefixProps}
              />
            </Form.Item>
          );
          formItemNodeList.push(INPUT);
          break;
        // select 框
        case FormType.SELECT:
          const SELECT = (
            <Form.Item
              label={label}
              name={field}
              rules={rules}
              key={field}
              initialValue={
                initialValue ||
                (defaultFieldsValue && defaultFieldsValue[field]) ||
                (setDefaultValue && options?.[0].key)
              }
            >
              <Select
                style={{ ...widthConfig }}
                placeholder={placeholder}
                value={initialValue}
                allowClear={allowClear}
              >
                {renderOptionList(options as Array<OptionItem>)}
              </Select>
            </Form.Item>
          );
          formItemNodeList.push(SELECT);
          break;
        // Radio.Group
        case FormType.RADIOGROUP:
          const RADIOGROUP = (
            <Form.Item
              label={label}
              name={field}
              rules={rules}
              key={field}
              initialValue={
                initialValue ||
                (defaultFieldsValue && defaultFieldsValue[field])
              }
            >
              <Radio.Group buttonStyle="solid" value={initialValue}>
                {renderRadioList(radios as Array<RadioItem>)}
              </Radio.Group>
            </Form.Item>
          );
          formItemNodeList.push(RADIOGROUP);
          break;
        // datePicker
        case FormType.DATEPICKER:
          const DATEPICKER = (
            <Form.Item
              label={label}
              name={field}
              rules={rules}
              key={field}
              initialValue={
                initialValue ||
                (defaultFieldsValue && defaultFieldsValue[field])
              }
            >
              <DatePicker
                picker={picker}
                onChange={onDatePickerChange}
                value={initialValue}
                style={{ ...widthConfig }}
                locale={locale}
              />
            </Form.Item>
          );
          formItemNodeList.push(DATEPICKER);
          break;
        // rangePicker
        case FormType.RANGEPICKER:
          const RANGEPICKER = (
            <Form.Item
              label={label}
              name={field}
              rules={rules}
              key={field}
              initialValue={
                initialValue ||
                (defaultFieldsValue && defaultFieldsValue[field])
              }
            >
              <RangePicker picker={picker} locale={locale} />
            </Form.Item>
          );
          formItemNodeList.push(RANGEPICKER);
          break;
        // button
        case FormType.BUTTON:
          const iconProps = icon
            ? {
                icon: React.createElement(Reflect.get(Icon, icon as string)),
              }
            : null;

          const onClick =
            btnHtmlType === "submit"
              ? { htmlType: btnHtmlType }
              : { onClick: () => btnClick(field as HandleType) };

          const BUTTON = (
            <Form.Item label={label} name={field} rules={rules} key={field}>
              <Button type={btnType} block={block} {...onClick} {...iconProps}>
                {btnText}
              </Button>
            </Form.Item>
          );
          formItemNodeList.push(BUTTON);
          break;
        case FormType.UPLOAD:
          const url = imageUrl || (defaultFieldsValue && defaultFieldsValue[field]);
          const UPLOAD = (
            <Form.Item
              label={label}
              name={field}
              rules={rules}
              key={field}
              valuePropName="file"
              getValueFromEvent={normFile}
              initialValue={
                initialValue ||
                (defaultFieldsValue && defaultFieldsValue[field])
              }
            >
              <Upload
                // name="avatar"
                listType="picture-card"
                showUploadList={false}
                beforeUpload={(f, fList) => false}
                // onChange={handleUploadChange}
                style={{ width, height: width }}
              >
                {url ? (
                  <img src={url} alt="avatar" style={{ width: "100%" }} />
                ) : (
                  <div>
                    {
                      /* loading
                      ? React.createElement(
                          Reflect.get(Icon, "LoadingOutlined")
                        )
                      :  */ React.createElement(
                        Reflect.get(Icon, "PlusOutlined")
                      )
                    }
                    <div style={{ marginTop: 8 }}>上传</div>
                  </div>
                )}
              </Upload>
            </Form.Item>
          );
          formItemNodeList.push(UPLOAD);
          break;
        case FormType.TEXTAREA:
          const TEXTAREA = (
            <Form.Item
              label={label}
              name={field}
              rules={rules}
              key={field}
              initialValue={
                initialValue ||
                (defaultFieldsValue && defaultFieldsValue[field])
              }
            >
              <Input.TextArea placeholder={placeholder} />
            </Form.Item>
          );
          formItemNodeList.push(TEXTAREA);
          break;
        default:
          return formItemNodeList;
      }
    });

    return formItemNodeList;
  }, [formItems, layout, btnClick, defaultFieldsValue, imageUrl, normFile]);

  return (
    <Form
      form={form}
      layout={layout || "inline"}
      labelCol={labelCol}
      wrapperCol={wrapperCol}
      onFinish={handleFormSubmit}
      ref={formRef as React.Ref<FormInstance<MouseEvent>> | undefined}
    >
      {!layout || layout === "inline" ? (
        <Space direction="horizontal" wrap={true}>
          {initFormItems}
        </Space>
      ) : (
        initFormItems
      )}
    </Form>
  );
});

export default memo(BaseForm);
