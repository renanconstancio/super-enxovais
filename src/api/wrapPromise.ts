import { AxiosPromise } from 'axios';
export function wrapPromise(promise: AxiosPromise | any) {
  let status = 'loading';
  let result: any;
  let suspender = promise.then(
    (data: any) => {
      status = 'success';
      result = data;
    },
    () => {
      status = 'error';
      result = [];
    }
  );

  return {
    read() {
      if (status === 'loading') {
        throw suspender;
      } else if (status === 'error') {
        throw result;
      } else if (status === 'success') {
        return result;
      }
    }
  };
}
