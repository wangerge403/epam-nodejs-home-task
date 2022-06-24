export const ERROR_CODES = {
    100001: "用户不存在",
    100003: "用户已存在",
    100005: ""
  };
  
  export default {
    getMessage(code) {
      return this.ERROR_CODES[code] || '';
    },
    ERROR_CODES
  };
  