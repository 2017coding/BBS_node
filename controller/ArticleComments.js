import Base from './Base'
import ArticleCommentsModel from '../model/ArticleComments'
import mqttClient from '../mqtt/client'

class ArticleComments extends Base {
  constructor () {
    super()
    this.create = this.create.bind(this)
    this.delete = this.delete.bind(this)
    this.getAll = this.getAll.bind(this)
  }
  // 创建评论
  async create (req, res, next) {
    let data = JSON.parse(JSON.stringify(req.body)),
        userInfo = await this.getUserInfo(req), result
    try {
      // 参数处理
      data.create_user = userInfo.id,
      data.create_time = new Date()
      result = await ArticleCommentsModel.create({
        set: data
      })
    } catch (e) {
      this.handleException(req, res, e)
      return
    }
    // 推送mqtt消息
    mqttClient.publish(`/message/user/${data.p_user_id}`, JSON.stringify({
      topic: `/message/user/${data.p_user_id}`,
      data: data
    }))
    res.json({
      code: 20000,
      success: true,
      message: '创建成功'
    })
  }
  // 删除评论
  async delete (req, res, next) {
    const userInfo = await this.getUserInfo(req),
      result = await ArticleCommentsModel.update({set: {flag: 0, delete_user: userInfo.id, delete_time: new Date()}, get: {id: req.params.id}})
    if (result.affectedRows) {
      res.json({
        code: 20000,
        success: true,
        message: '删除成功'
      })
    } else {
      res.json({
        code: 20001,
        success: true,
        message: '删除失败'
      })
    }
  }
  // 获取评论
  async getAll (req, res, next) {
    let result, query = req.query, totals
    try {
      result = await ArticleCommentsModel.getAll({get: {...query, flag: 1}})
      totals = await ArticleCommentsModel.getTotals({get: {...query, flag: 1}})
    } catch (e) {
      this.handleException(req, res, e)
      return
    }
    res.json({
      code: 20000,
      success: true,
      content: result,
      totals: totals[0].count,
      message: '操作成功'
    })
  }
}

export default new ArticleComments()
