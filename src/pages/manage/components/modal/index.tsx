import React, { FC, useRef, memo } from "react";
import { Modal } from "antd";
import BaseForm, { DefaultFieldsValue } from "components/baseForm";
import { FormItem } from "types/form";

interface HandleModalProps {
  type: ModalType;
  visible: boolean;
  formItems: Array<FormItem>;
  defaultFieldsValue?: DefaultFieldsValue<any>;
  deleteTip?: string;
  onCancel?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  onOk?: (formData?: any) => void;
}

export type ModalType = "add" | "edit" | "delete";

const modalTitle = {
  add: "新增",
  edit: "修改",
  delete: "删除",
};

const HandleModal: FC<HandleModalProps> = (props) => {
  const { type, visible, formItems, defaultFieldsValue, deleteTip } = props;
  const baseFormRef = useRef<any>();

  const handleOk = () => {
    if (props.onOk) {
      if (baseFormRef.current) {
        props.onOk(baseFormRef.current.getFormFields());
      } else {
        props.onOk();
      }
    }
  };

  return (
    <Modal
      title={modalTitle[type]}
      visible={visible}
      cancelText="取消"
      okText="确认"
      onCancel={props.onCancel}
      onOk={handleOk}
      destroyOnClose={true}
    >
      {type === "delete" ? deleteTip : (
        <BaseForm
          ref={baseFormRef}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 18 }}
          layout="horizontal"
          defaultFieldsValue={defaultFieldsValue}
          formItems={formItems}
        />
      )}
    </Modal>
  );
};

export default memo(HandleModal);
