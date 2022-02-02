/*一些校验规则*/
export const jiaoyan = {
  phone: /^1[3456789]\d{9}$/, //  手机号码
  password: /^[^\u4e00-\u9fa5]{6,16}$/, // 6-16位，没有中文
  fax: /^(?:\d{3,4}-)?\d{7,8}(?:-\d{1,6})?$/, //传真号码
  email: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, //  邮箱号码
  chinese: /[\u4e00-\u9fa5]/g, //  中文字符
  blank: /[ ]|[&nbsp;]/g, // 全局空格
  sBlank: /(^\s*)|(\s*$)/g, // 前后空格
  lineBreak: /[\r\n]/g, //换行符 ，回车符
  epubWordsReplace: /[\f\n\r\t\v]/g
}