import { FormProps, FormInstance, RuleObject } from "antd/lib/form";
// import { ValidatorRule } from "rc-field-form/lib/interface";
import { ButtonType, ButtonHTMLType } from "antd/lib/button/button";
import { PickerMode } from "rc-picker/lib/interface";

export type { FormProps, FormInstance, ButtonType };

export enum FormType {
  INPUT = "input",
  SELECT = "select",
  SUBMIT = "submit",
  DATEPICKER = "datePicker",
  BUTTON = "button",
  RADIOGROUP = "radioGroup",
  UPLOAD = 'upload',
  TEXTAREA = 'textarea',
  RANGEPICKER = 'rangePicker'
}

export declare type KeyValue = {
  key: string;
  value: string;
}

export declare type OptionItem = KeyValue;
export declare type RadioItem = KeyValue;

export interface FormItem {
  type: string;
  field: string;
  label?: string;
  initialValue?: any;
  width?: number;
  placeholder?: string;
  allowClear?: boolean;
  rules?: RuleObject[];//Array<ValidatorRule>;
  options?: Array<OptionItem>;
  picker?: PickerMode;
  btnType?: ButtonType;
  btnHtmlType?: ButtonHTMLType;
  dateType?: string;
  btnText?: string;
  radios?: Array<RadioItem>;
  icon?: string;
  setDefaultValue?: boolean;
  prefix?: string;
  block?: boolean;
  inputType?: string;
};
