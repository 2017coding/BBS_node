import Base from './Base'
import QuestionModel from '../model/Question'
import ArticleModel from '../model/Article'
import ColumnModel from '../model/Column'
import UserModel from '../model/User'

class Count extends Base {
  constructor () {
    super()
  }
  // 平台相关数据统计
  async platformDataCount (req, res, next) {
    let params = {flag: 1}, result
    try {
      result = {
        questions: (await QuestionModel.getTotals({get: params}))[0].count,
        articles: (await ArticleModel.getTotals({get: {...params, flag: 3}}))[0].count,
        columns: (await ColumnModel.getTotals({get: params}))[0].count,
        users: (await UserModel.getTotals({get: {...params, create_user: 1}}))[0].count + 1
      }
    } catch (e) {
      this.handleException(req, res, e)
      return
    }
    res.json({
      code: 20000,
      success: true,
      content: result,
      message: '操作成功'
    })
  }
}

export default new Count()
