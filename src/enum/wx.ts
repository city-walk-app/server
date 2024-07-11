/**
 * 微信 API 接口
 */
export enum Wx {
  /**
   * 获取 access_token
   */
  CgiBinToken = 'https://api.weixin.qq.com/cgi-bin/token',

  /**
   * 生成二维码
   */
  WxaGetwxacode = 'https://api.weixin.qq.com/wxa/getwxacode',

  /**
   * 获取 open id 登录参数
   */
  SnsJscode2session = 'https://api.weixin.qq.com/sns/jscode2session',

  /**
   * 获取手机号
   *
   * @see 获取手机号 https://developers.weixin.qq.com/miniprogram/dev/OpenApiDoc/user-info/phone-number/getPhoneNumber.html
   */
  Getuserphonenumber = 'https://api.weixin.qq.com/wxa/business/getuserphonenumber'
}
