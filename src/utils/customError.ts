class CustomError extends Error {

  errorCode: number;
  msg: string;

  constructor (errorCode=10000, msg="出错了") {
    super()
    this.errorCode = errorCode
    this.msg = msg
  }
}

export {
  CustomError
};