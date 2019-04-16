import TokenModel from '../model/Token'
import UserModel from '../model/User'
import JWT from 'jsonwebtoken'
import utils from '../lib/js/utils'

class Base{
  constructor () {
    this.utils = utils
  }
  // 获取到用户信息
  async getUserInfo (req) {
    let userInfo = {}, result
    JWT.verify(req.headers.authorization, 'BBS', (error, decoded) => {
      if (error) {
        return {}
      }
      userInfo = decoded
    })
    // 直接从数据库获取，能保证用户最新的数据
    result = await UserModel.getRow({get: {id: userInfo.id, flag: 1}})
    return result[0]
  }
  // 获取客户端IP
  getClientIp (req) {
    var ipAddress, forwardedIpsStr = req.header('x-forwarded-for')
    if (forwardedIpsStr) {
        var forwardedIps = forwardedIpsStr.split(',')
        ipAddress = forwardedIps[0]
    }
    if (!ipAddress) {
        ipAddress = req.connection.remoteAddress
    }
    return ipAddress
  }
  // 获取服务端地址
  getServiceAddr (req) {
    const headers = req.headers
    return req.protocol + '://' + headers.host
  }
  // TODO: 异常处理, 有时间扩展, 从这里转发到异常处理模块处理
  handleException (req, res, e) {
    res.json({
      code: e.errno || 20501,
      success: false,
      content: e,
      message: '服务器内部错误'
    })
  }
}

export default Base
