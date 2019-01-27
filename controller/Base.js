import TokenModel from '../model/Token'

class Base{
  constructor () {
  }
  // 验证Token令牌
  async checkToken (key, value) {
    let search, result = true, message
    try {
      search = await this.getToken(key, value)
    } catch (e) {
      result = false
      message = '服务器内部错误'
    }
    // 验证Token不存在或者Token过期
    if (search.length === 0) {
      result = false
      message = 'token不存在'
    } else if ((search.bbs_expire_time + 30 * 60 * 60 * 24 * 1000) < +new Date()) {
      result = false
      message = 'token过期'
    }
    return {result, message}
  }
  // 设置Token令牌
  async setToken (params) {
    let obj = {result: true}
    try {
      obj = await this.checkToken('token', params.token)
    } catch (e) {
      obj = false
    }
    if (obj.result) {
      return await this.getToken(key, value)
    } else {
      return await this.setToken(params)
    }
  }
  // 获取Token令牌
  async getToken (key, value) {
    return TokenModel.getToken(key, value)
  }
}

export default Base
