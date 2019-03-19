import TokenModel from '../model/Token'
import JWT from 'jsonwebtoken'

class Authority{
  constructor () {
    this.checkToken = this.checkToken.bind(this)
    this.setToken = this.setToken.bind(this)
    this.getToken = this.getToken.bind(this)
  }
  // 验证Token令牌
  async checkToken (req, res, next) {
    // 登录和注册页面不作限制
    if (req.path === '/login' || req.path === 'registered') {
      next()
      return
    }
    let token = req.headers.authorization,
        message = '',
        success = false,
        content = {},
        search
    // token不存在
    if (!token) {
      res.json({
        code: 500,
        success: false,
        content: {},
        message: '无访问权限'
      })
      return
    }
    // 验证 Token
    JWT.verify(token, 'BBS', (error, decoded) => {
      if (error) {
        success = false
        message = 'token验证失败'
        return
      }
      success = true
      content = decoded
      message = '验证tonken成功'
    })
    // 验证token格式失败
    if (!success) {
      res.json({
        code: 500,
        success: false,
        content: {},
        message: '无效的token'
      })
      return
    }
    // 查询数据库中该token的相关信息
    try {
      search = await this.getToken([{[content.type + '_token']: token}])
    } catch (e) {
      res.json({
        code: 500,
        success: false,
        content: {},
        message: '服务器内部错误'
      })
      return
    }
    // 验证Token不存在或者Token过期
    if (search.length === 0) {
      res.json({
        code: 500,
        success: false,
        content: {},
        message: '无访问权限'
      })
      return
    } else if ((search.bbs_expire_time + 30 * 60 * 60 * 24 * 1000) < +new Date()) {
      res.json({
        code: 500,
        success: false,
        content: {},
        message: '无效token'
      })
      return
    }
    next()
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
    return await this.getToken([{user_id: params[1]}])
  }
  // 获取Token令牌
  async getToken (params) {
    return TokenModel.getToken(params)
  }
}

export default new Authority()
