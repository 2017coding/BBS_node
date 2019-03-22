import TokenModel from '../model/Token'
import JWT from 'jsonwebtoken'

class Base{
  // 获取到用户信息
  getUserInfo (req) {
    let userInfo = {}
    JWT.verify(req.headers.authorization, 'BBS', (error, decoded) => {
      if (error) {
        return {}
      }
      userInfo = decoded
    })
    return userInfo
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
