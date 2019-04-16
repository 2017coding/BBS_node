import Base from './Base'

class DataPerms extends Base{
  constructor () {
    super()
    this.create = this.create.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)
    this.getRow = this.getRow.bind(this)
    this.getList = this.getList.bind(this)
    this.getAll = this.getAll.bind(this)
  }
  async create (req, res, next) {
    const params = req.body,
          arr = [
            {label: 'menu_id', value: params.menu_id, rules: ['notnull', 'number']},
            {label: '类型', value: params.type, rules: ['notnull', 'number']},
            {label: '编码', value: params.code, rules: ['notnull', 'noChinese']},
            {label: '名称', value: params.name, rules: ['notnull']},
            {label: '请求方式', value: params.method, rules: ['notnull', 'string']}
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
  async update (req, res, next) {
    const params = req.body,
          arr = [
            {label: 'ID', value: params.id, rules: ['notnull', 'number']},
            {label: 'menu_id', value: params.menu_id, rules: ['notnull', 'number']},
            {label: '类型', value: params.type, rules: ['notnull', 'number']},
            {label: '编码', value: params.code, rules: ['notnull', 'noChinese']},
            {label: '名称', value: params.name, rules: ['notnull']},
            {label: '请求方式', value: params.method, rules: ['notnull', 'string']}
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
  async getRow (req, res, next) {
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
  async getList (req, res, next) {
    const data = req.query,
          arr = [
            {label: 'curPage', value: data.curPage, rules: ['notnull', 'number']},
            {label: 'pageSize', value: data.curPage, rules: ['notnull', 'number']}
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
  async getRoleDataPerms (req, res, next) {
    next()
  }
  async getAll (req, res, next) {
    next()
  }
}

export default new DataPerms()
