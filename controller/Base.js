import TokenModel from '../model/Token'
import JWT from 'jsonwebtoken'

class Base{
  constructor () {
  }
  // 验证Token令牌
  async checkToken (key, value) {
    let search, result = true, message, content = {}
    try {
      search = await this.getToken(key, [value])
    } catch (e) {
      result = false
      message = '服务器内部错误'
    }
    // 验证 Token
    JWT.verify(value, 'BBS', (error, decoded) => {
      if (error) {
        result = false
        message = 'token验证失败'
        return
      }
      result = true
      content = decoded
      message = '验证tonken成功'
    })
    // 验证Token不存在或者Token过期
    if (search.length === 0) {
      result = false
      message = 'token不存在'
    } else if ((search.bbs_expire_time + 30 * 60 * 60 * 24 * 1000) < +new Date()) {
      result = false
      message = 'token过期'
    }
    return {result, message, content}
  }
  // 设置Token令牌
  async setToken (data, params) {
    let result
    try {
      result = await TokenModel.setToken(data, params)
    } catch (e) {
      return e
    }
    if (result.affectedRows) {

    }
    return await this.getToken(key, [params.id])
  }
  // 获取Token令牌
  async getToken (key, params) {
    return TokenModel.getToken(key, [params.id])
  }
}

export default Base
