import { FC, memo } from "react";
import { Radio, RadioChangeEvent, Space } from "antd";
import moment from 'moment';
import { KeyValue } from "types/form";

interface FilterProps {
  blogCategory: KeyValue[];
  onCategoryChange: (category: number | undefined) => void;
  onDateChange: (date: string | undefined) => void;
}

const DATE_TYPE = {
  ALL: '0',
  YEAR: 'year',
  HALF_YEAR: 'half_year',
  MONTH: 'month',
  WEEK: 'week'
};

const Filter: FC<FilterProps> = (props) => {

  const { blogCategory, onCategoryChange, onDateChange } = props;

  const categoryChange = (e:RadioChangeEvent) => {
    const category = e.target.value;
    if (category === '0') {
      onCategoryChange(undefined);
    } else {
      onCategoryChange(category);
    }
  }

  const calcDate = (num: number, type: any) => {
    const YEAR_FORMAT = 'YYYY-MM-DD';
    return [moment().subtract(num, type).format(YEAR_FORMAT), moment().format(YEAR_FORMAT)].join(',');
  }
  
  const dateChange = (e:RadioChangeEvent) => {
    const dateType = e.target.value;
    let date;
    switch(dateType) {
      case DATE_TYPE.ALL: date = undefined; break;
      case DATE_TYPE.YEAR: date = calcDate(1, 'years'); break;
      case DATE_TYPE.HALF_YEAR: date = calcDate(.6, 'years'); break;
      case DATE_TYPE.MONTH: date = calcDate(1, 'months'); break;
      case DATE_TYPE.WEEK: date = calcDate(7, 'days'); break;
    }

    onDateChange(date);
  }
  
  return (
    <Space direction="vertical">
      <Radio.Group defaultValue='0' buttonStyle="solid" size="small" onChange={categoryChange}>
        <Space wrap={true}>
          {blogCategory.map((item) => (
            <Radio.Button value={item.key} key={item.key}>
              {item.value}
            </Radio.Button>
          ))}
        </Space>
      </Radio.Group>
      <Radio.Group defaultValue={ DATE_TYPE.ALL } buttonStyle="solid" size="small" onChange={dateChange}>
        <Space wrap={true}>
          <Radio.Button value={ DATE_TYPE.ALL }>全部</Radio.Button>
          <Radio.Button value={ DATE_TYPE.YEAR }>近一年</Radio.Button>
          <Radio.Button value={ DATE_TYPE.HALF_YEAR }>近半年</Radio.Button>
          <Radio.Button value={ DATE_TYPE.MONTH }>近一个月</Radio.Button>
          <Radio.Button value={ DATE_TYPE.WEEK }>近一周</Radio.Button>
        </Space>
      </Radio.Group>
    </Space>
  );
};

export default memo(Filter);
