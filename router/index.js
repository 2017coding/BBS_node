import Authority from '../controller/Authority'
import user from './user'
import area from './area'
import role from './role'
import menu from './menu'
import dataPerms from './dataPerms'
import roleRelation from './roleRelation'
import log from './log'
import folder from './folder'
import file from './file'
import tag from './tag'
import tagType from './tagType'
import tagRelation from './tagRelation'
import carousel from './carousel'
import techSquare from './techSquare'
import notices from './notices'
import question from './question'
import column from './column'
import article from './article'
import draft from './draft'
import count from './count'
import charts from './charts'
import topic from './topic'

/**
 * 路由中间件
 * 第一层验证Token
 * 第二层验证用户是否有操作权限
 * 第三层验证参数, 验证成功后再进行事件处理
 */
export default app => {
  // 图表数据
  app.use('/api/charts', Authority.checkToken, Authority.permissions, charts)
  // 数据统计
  app.use('/api/count', Authority.checkToken, Authority.permissions, count)
  // 运维中心
  app.use('/api/question', Authority.checkToken, Authority.permissions, question)
  app.use('/api/column', Authority.checkToken, Authority.permissions, column)
  app.use('/api/article', Authority.checkToken, Authority.permissions, article)
  app.use('/api/draft', Authority.checkToken, Authority.permissions, draft)
  // 论坛配置
  app.use('/api/carousel', Authority.checkToken, Authority.permissions, carousel)
  app.use('/api/techSquare', Authority.checkToken, Authority.permissions, techSquare)
  app.use('/api/notices', Authority.checkToken, Authority.permissions, notices)
  app.use('/api/tagRelation', Authority.checkToken, Authority.permissions, tagRelation)
  app.use('/api/tagType', Authority.checkToken, Authority.permissions, tagType)
  app.use('/api/tag', Authority.checkToken, Authority.permissions, tag)
  // 文件库
  app.use('/api/folder', Authority.checkToken, Authority.permissions, folder)
  app.use('/api/file', Authority.checkToken, Authority.permissions, file)
  // 系统设置
  app.use('/api/user', Authority.checkToken, Authority.permissions, user)
  app.use('/api/area', Authority.checkToken, Authority.permissions, area)
  app.use('/api/role', Authority.checkToken, Authority.permissions, role)
  app.use('/api/menu', Authority.checkToken, Authority.permissions, menu)
  app.use('/api/dataPerms', Authority.checkToken, Authority.permissions, dataPerms)
  app.use('/api/roleRelation', Authority.checkToken, Authority.permissions, roleRelation)
  app.use('/api/log', Authority.checkToken, Authority.permissions, log)
  app.use('/api/topic', Authority.checkToken, Authority.permissions, topic)
}
