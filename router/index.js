import token from './token'
import user from './user'
import Authority from '../controller/Authority'

export default app => {
  /**
   * 加两层路由中间件，第一层验证Token, 第二层验证参数, 验证成功后再进行事件处理
   */
  app.use('/api/user', Authority.checkToken, user)
}
