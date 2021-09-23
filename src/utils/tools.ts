import md5 from 'md5';
import { CancelToken } from 'api/request';

export const cloneDeep = (obj: Object | Array<any>): Object | Array<any> => {
  let result: Object;
  if (obj instanceof Array) {
    result = [];
  } else {
    result = {};
  }

  for (let key in result) {
    if (obj.hasOwnProperty(key)) {
      Reflect.set(result, key, cloneDeep(Reflect.get(obj, key)));
    }
  }

  return result;
};

export const findIndex = (arr: Array<any>, key: string) => {
  return arr.findIndex(item => item[key] === key);
}

export const pMd5 = (username: string, password: string): string => {
  return md5(md5(password) + username)
}

export const handleCancelRequest = () => {
  window.source.cancel();
  window.source = CancelToken.source()
}