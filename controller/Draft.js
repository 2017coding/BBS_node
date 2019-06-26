import Base from './Base'
import ArticleMolde from '../model/Article'
import QuestionMolde from '../model/Question'

class Draft extends Base {
  constructor () {
    super()
    this.getTotals = this.getTotals.bind(this)
    this.getAll = this.getAll.bind(this)
  }
  // 查询草稿数量
  async getTotals (req, res, next) {
    const userInfo = await this.getUserInfo(req)
    let question, article
    try {
      question = await QuestionMolde.getTotals({get: {create_user: userInfo.id, flag: 1}})
      article = await ArticleMolde.getTotals({get: {create_user: userInfo.id, flag: 1}})
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
      question = await QuestionMolde.getAll({get: {create_user: userInfo.id, flag: 1}})
      article = await ArticleMolde.getAll({get: {create_user: userInfo.id, flag: 1}})
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
}

export default new Draft()
