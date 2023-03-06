import BaseError from '../lib/BaseError';

export default {
  phone: function(str: string): boolean {
    const regex: RegExp = /^01([0|1|6|7|8|9])-?\d{3,4}-?\d{4}$/g;
    if(regex.test(str)) {
      return true;
    } else {
      throw new BaseError("BadRequest", "잘못된 휴대폰 번호입니다");
    }
  },
  email: function(str: string): boolean {
    const regex: RegExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if(regex.test(str)) {
      return true;
    } else {
      throw new BaseError("BadRequest", "잘못된 이메일 주소입니다");
    }
  },
}