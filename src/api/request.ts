import axios, { CancelTokenSource } from 'axios';
import Storage from 'utils/storage';

declare global {
  interface Window {
    source: CancelTokenSource
  }
}

export const CancelToken = axios.CancelToken;
window.source = CancelToken.source();

const LStorage = new Storage('localStorage');

export default function ajax(path: string, data = {}, type = 'GET', special = '') {
  let url = path;
  return new Promise((resolve: (param: any) => void, reject) => {
    let promise;
    type = type.toUpperCase();
    if (type === 'GET' || type === 'DELETE') {
      let dataStr = '';
      Object.keys(data).forEach((key) => {
        dataStr += `${key}=${
          // eslint-disable-next-line eqeqeq
          Reflect.get(data, key) == undefined ? '' : Reflect.get(data, key)
        }&`;
      });

      if (dataStr !== '') {
        url = `${url}?${dataStr.substring(0, dataStr.length - 1)}`;
      }

      promise = type === 'GET' ? axios.get(url, {
        cancelToken: window.source.token
      }) : axios.delete(url);

      /* promise = type === 'GET' ? axios.get(url, {
        cancelToken: new CancelToken(function excutor(c) {
          cancel = c
        })
      }) : axios.delete(url); */
    } else {
      if (special) {
        const file = Reflect.get(data, special);
        if (typeof file === 'string') {
          promise = type === 'POST' ? axios.post(url, data) : axios.put(url, data);
        } else {
          const formData = new FormData();
          const config = { headers: { 'Content-Type': 'multipart/form-data' } };
          formData.append(special, Reflect.get(data, special));
          const keys = Object.keys(data);
          for (let i = 0, len = keys.length; i < len; i++) {
            if (keys[i] !== special) {
              // eslint-disable-next-line eqeqeq
              const value = Reflect.get(data, keys[i]) == undefined ? '' : Reflect.get(data, keys[i]);
              formData.append(keys[i], value);
            }
          }
          promise = type === 'POST' ? axios.post(url, formData, config) : axios.put(url, formData, config);
        }
      } else {
        promise = type === 'POST' ? axios.post(url, data) : axios.put(url, data);
      }
    }

    promise
      .then((response) => {
        if (response) {
          resolve(response.data);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}


// 添加响应拦截器
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isCancel(error)) {
      // return Promise.reject(error);
    } else {
      // 返回状态码不为200时候的错误处理
      const res = error.response;
      switch(res.status) {
        case 403:
          LStorage.clear();
          LStorage.set('userInfo', { isLogin: false });
          window.location.href = '/'; break;
        default: return Promise.reject(error.response.data);
      }
    }
  }
);
