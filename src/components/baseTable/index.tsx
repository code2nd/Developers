import { FC, useMemo } from "react";
import { Table } from "antd";
import _ from "lodash";
import { SizeType } from "antd/lib/config-provider/SizeContext";

export type TableData = Array<object | never>;

interface BaseTableProps {
  columns: TableData;
  dataSource: TableData;
  page?: number;
  pageSize?: number;
  total?: number;
  showNum?: boolean;
  size?: SizeType;
  selectedRowKeys?: Array<React.Key>;
  onRowSelected?: (selectedRowKeys: Array<React.Key>) => void;
  onPageChange?: (page: number, pageSize?: number) => void;
}

const BaseTable: FC<BaseTableProps> = (props) => {
  const {
    columns,
    dataSource,
    showNum,
    page,
    pageSize,
    total,
    size,
    onPageChange,
    selectedRowKeys,
    onRowSelected,
  } = props;

  // console.log(columns, dataSource);

  const handledColumns = useMemo(() => {
    let newColumns;
    if (showNum && page && pageSize) {
      newColumns = _.cloneDeep(columns);
      newColumns.unshift({
        title: '序号',
        align: 'center',
        /* width: '8%', */
        render: (text: any, record: any, index: number) =>
          `${(page - 1) * pageSize + index + 1}`,
      });
      return newColumns;
    } else {
      return columns;
    }
  }, [columns, showNum, page, pageSize]);

  const rowSelection = useMemo(
    () => ({
      selectedRowKeys,
      onChange: (selectedRowKeys: Array<React.Key>, selectedRows: any) => {
        onRowSelected && onRowSelected(selectedRowKeys);
      },
      onSelect: (record: any, selected: any, selectedRows: any) => {
        // console.log(record, selected, selectedRows);
      },
      onSelectAll: (selected: any, selectedRows: any, changeRows: any) => {
        // console.log(selected, selectedRows, changeRows);
      },
    }),
    [selectedRowKeys, onRowSelected]
  );

  const pagination = {
    current: page,
    pageSize,
    total,
    hideOnSinglePage: true,
    showSizeChanger: false,
    onChange(page: number, pageSize?: number) {
      onPageChange && onPageChange(page, pageSize);
    },
  };

  return (
    <Table
      className="base-table"
      dataSource={dataSource}
      columns={handledColumns}
      rowSelection={{ ...rowSelection }}
      pagination={pagination}
      size={size}
      locale={{
        emptyText: '暂无数据'
      }}
    />
  );
};

export default BaseTable;
