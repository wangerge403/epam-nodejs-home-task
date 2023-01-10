export const ERROR_CODES = {
    100001: "用户不存在",
    100003: "用户已存在",
    100005: "",
    400001: "分组不存在",
    400002: "分组已存在"
  };
  
  export default {
    getMessage(code) {
      return this.ERROR_CODES[code] || '';
    },
    ERROR_CODES
  };
  