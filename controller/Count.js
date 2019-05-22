import Base from './Base'
import QuestionMolde from '../model/Question'
import ArticleMolde from '../model/Article'
import ColumnMolde from '../model/Column'
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
        questions: (await QuestionMolde.getTotals({get: params}))[0].count,
        articles: (await ArticleMolde.getTotals({get: {...params, flag: 3}}))[0].count,
        columns: (await ColumnMolde.getTotals({get: params}))[0].count,
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
