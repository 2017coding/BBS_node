import Base from './Base'
import ArticleModel from '../model/Article'
import QuestionModel from '../model/Question'

class Draft extends Base {
  constructor () {
    super()
    this.getTotals = this.getTotals.bind(this)
    this.getAll = this.getAll.bind(this)
    this.giveUp = this.giveUp.bind(this)
    this.giveUpAll = this.giveUpAll.bind(this)
  }
  // 查询草稿数量
  async getTotals (req, res, next) {
    const userInfo = await this.getUserInfo(req)
    let question, article
    try {
      question = await QuestionModel.getTotals({get: {create_user: userInfo.id, flag: 1}})
      article = await ArticleModel.getTotals({get: {create_user: userInfo.id, flag: 1}})
    } catch (e) {
      this.handleException(req, res, e)
      return
    }
    res.json({
      code: 20000,
      success: true,
      content: {
        totals: question[0].count + article[0].count
      },
      message: '操作成功'
    })
  }
  // 查询所有的草稿
  async getAll (req, res, next) {
    const userInfo = await this.getUserInfo(req)
    let question, article, result
    try {
      question = await QuestionModel.getAll({get: {create_user: userInfo.id, flag: 1}})
      article = await ArticleModel.getAll({get: {create_user: userInfo.id, flag: 1}})
    } catch (e) {
      this.handleException(req, res, e)
      return
    }
    // 排序，处理
    result = [...question.map(item => {
      item.dataType = 1
      return item
    }), ...article.map(item => {
      item.dataType = 2
      return item
    })].sort((a, b) =>  b.id - a.id)
    res.json({
      code: 20000,
      success: true,
      content: result,
      message: '操作成功'
    })
  }
  // 舍弃草稿
  async giveUp (req, res, next) {
    let data = JSON.parse(JSON.stringify(req.body)),
        userInfo = await this.getUserInfo(req),
        result
    // dataType 1 问题 2 文章
    if (data.dataType === 1) {
      result = await QuestionModel.update({get: {id: data.id, create_user: userInfo.id}, set: {flag: 0}})
    } else if (data.dataType === 2) {
      result = await ArticleModel.update({get: {id: data.id, create_user: userInfo.id}, set: {flag: 0}})
    } else {
      return
    }
    if (!result) {
      res.json({
        code: 20001,
        success: false,
        content: '操作人和操作数据不匹配',
        message: '操作失败'
      })
      return
    }
    res.json({
      code: 20000,
      success: true,
      content: result,
      message: '操作成功'
    })
  }
  // 舍弃全部草稿
  async giveUpAll (req, res, next) {
    const userInfo = await this.getUserInfo(req)
    try {
      await QuestionModel.update({get: {create_user: userInfo.id, flag: 1}, set: {flag: 0}})
      await ArticleModel.update({get: {create_user: userInfo.id, flag: 1}, set: {flag: 0}})
    } catch (e) {
      this.handleException(req, res, e)
      return
    }
    res.json({
      code: 20000,
      success: true,
      message: '操作成功'
    })
  }
}

export default new Draft()
