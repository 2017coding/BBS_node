import user from './user'
import area from './area'
import role from './role'
import mod from './mod'
import log from './log'
import Authority from '../controller/Authority'

export default app => {
  /**
   * 路由中间件
   * 第一层验证Token
   * 第二层验证用户是否有操作权限
   * 第三层验证参数, 验证成功后再进行事件处理
   */
  app.use('/api/user', Authority.checkToken, Authority.permissions, user)
  app.use('/api/area', Authority.checkToken, Authority.permissions, area)
  app.use('/api/role', Authority.checkToken, Authority.permissions, role)
  app.use('/api/mod', Authority.checkToken, Authority.permissions, mod)
  app.use('/api/log', Authority.checkToken, Authority.permissions, log)
}
