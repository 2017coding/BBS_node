import Base from './Base'

class ArticleComments extends Base{
  constructor () {
    super()
    this.create = this.create.bind(this)
    this.delete = this.delete.bind(this)
    this.getAll = this.getAll.bind(this)
  }
  async create (req, res, next) {
    const params = req.body,
          arr = [
            {label: '文章ID', value: params.article_id, rules: ['notnull']},
            {label: 'pid', value: params.pid, rules: ['notnull']},
            {label: 'p_user_id', value: params.p_user_id, rules: ['notnull']},
            {label: '内容', value: params.content, rules: ['notnull']}
          ],
          result = this.check(arr)
    if (!result.success) {
      res.json({
        code: 20301,
        success: false,
        message: result.message
      })
      return
    }
    next()
  }
  async delete (req, res, next) {
    const ID = req.params.id,
          arr = [
            {label: 'ID', value: ID, rules: ['notnull']}
          ],
          result = this.check(arr)
    if (!result.success) {
      res.json({
        code: 20301,
        success: false,
        message: result.message
      })
      return
    }    
    next()
  }
  async getAll (req, res, next) {
    const query = req.query,
          arr = [
            {label: '文章ID', value: query.article_id, rules: ['notnull']},
            // {label: 'pid', value: query.pid, rules: ['notnull']}
          ],
          result = this.check(arr)
    if (!result.success) {
      res.json({
        code: 20301,
        success: false,
        message: result.message
      })
      return
    }
    next()
  }
}

export default new ArticleComments()
