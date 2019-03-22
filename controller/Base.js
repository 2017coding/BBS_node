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
}

export default Base
