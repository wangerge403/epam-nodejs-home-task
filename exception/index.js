import CodeMessage from './code-message';
export default class HttpException extends Error {
  constructor(ex) {
    super();
    if (ex && ex.code) {
      this.code = ex.code;
      this.message = CodeMessage.getMessage(ex.code);
    }
    if (ex && ex.message) {
      this.message = ex.message;
    }
  }
}