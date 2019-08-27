import Base from './Base'
import TokenModel from '../model/Token'
import UserModel from '../model/User'
import DataPermsModel from '../model/DataPerms'
import JWT from 'jsonwebtoken'

class Authority extends Base{
  constructor () {
    super()
    this.checkToken = this.checkToken.bind(this)
    this.setToken = this.setToken.bind(this)
    this.getToken = this.getToken.bind(this)
    this.permissions = this.permissions.bind(this)
  }
  // 验证Token令牌
  async checkToken (req, res, next) {
    const whiteList = ['/login', '/registered']
    // 登录和注册页面不作限制
    // TODO: 暂时不对获取数据的接口验证
    if (req.method.toLocaleLowerCase() === 'get' ||  whiteList.includes(req.path)) {
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
        code: 20201,
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
        code: 20201,
        success: false,
        content: {},
        message: '无效的token'
      })
      return
    }
    // 查询数据库中该token的相关信息
    try {
      search = await this.getToken({get: {[content.type + '_token']: token}})
    } catch (e) {
      res.json({
        code: 20200,
        success: false,
        content: {},
        message: '服务器内部错误'
      })
      return
    }
    // 验证Token不存在或者Token过期
    if (search.length === 0) {
      res.json({
        code: 20201,
        success: false,
        content: {},
        message: '无访问权限'
      })
      return
    } else if ((search[content.type + '_expire_time']) < +new Date()) {
      res.json({
        code: 20201,
        success: false,
        content: {},
        message: 'token过期'
      })
      return
    }
    next()
  }
  // 设置Token令牌
  async setToken (data, obj) {
    let result
    try {
      result = await TokenModel.setToken(data, obj)
    } catch (e) {
      throw e
    }
  }
  // 获取Token令牌
  async getToken (obj) {
    return TokenModel.getToken(obj)
  }
  // 验证用户是否有操作权限
  async permissions (req, res, next) {
    const baseUrl = req.baseUrl.split('/')
    const method = req.method
    const userInfo = await this.getUserInfo(req)
    const whiteList = ['/api/user/login', '/api/user/registered', '/api/user/loginOut', 
                      '/api/article/create', '/api/article/update',
                      '/api/articleComments/create', '/api/articleComments/delete',
                      '/api/draft/giveUp', '/api/draft/giveUpAll']
    let api = req.baseUrl + req.path
    // 如果是删除接口，将delete后面去掉再校验
    if (/delete/.test(api)) {
      api = api.replace(/\/[^/*]*$/, '')
    }
    // 当请求方式为get时或者登陆注册时，不需要验证数据权限
    if (method.toLocaleLowerCase() === 'get' || whiteList.includes(api) || whiteList.includes(req.originalUrl)) {
      next()
      return
    }
    // 查询当前接口是否配置权限
    const search = userInfo.id === 1 ? 
                  await DataPermsModel.getAll({get: {api}}) :
                  await DataPermsModel.getRoleDataPerms({get: {role_id: userInfo.role_id, api: api.replace('/api/', '')}})
    if (search.length > 0) {
      next()
    } else {
      res.json({
        code: 20001,
        success: false,
        content: {},
        message: '无操作权限'
      })
    }
  }
}

export default new Authority()
