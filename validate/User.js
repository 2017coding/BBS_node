import Base from './Base'

class User extends Base{
  constructor () {
    super()
    this.registered = this.registered.bind(this)
    this.login = this.login.bind(this)
    this.create = this.create.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)
    this.userInfo = this.userInfo.bind(this)
    this.getList = this.getList.bind(this)
    this.getAll = this.getAll.bind(this)
    this.getCreateUser = this.getCreateUser.bind(this)
    this.userTransfer = this.userTransfer.bind(this)
  }
  async registered (req, res, next) {
    const account = req.body.account,
          password = req.body.password,
          type = req.body.type,
          arr = [
            {label: '账号', value: account, rules: ['notnull', 'noChinese']},
            {label: '密码', value: password, rules: ['notnull']},
            {label: '账号类型', value: type, rules: ['notnull', 'number']}
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
  async login (req, res, next) {
    const account = req.body.account,
          password = req.body.password,
          type = req.body.type,
          arr = [
            {label: '账号', value: account, rules: ['notnull', 'noChinese']},
            {label: '密码', value: password, rules: ['notnull']},
            {label: '账号类型', value: type, rules: ['notnull', 'number']}
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
  async create (req, res, next) {
    const params = req.body,
          arr = [
            {label: '账号', value: params.account, rules: ['notnull', 'noChinese']},
            {label: '密码', value: params.password, rules: ['notnull']},
            {label: '账号类型', value: params.type, rules: ['notnull', 'number']},
            {label: '手机号码', value: params.phone, rules: ['phone']},
            {label: '微信', value: params.phone, rules: ['noChinese']},
            {label: 'qq', value: params.phone, rules: ['number']},
            {label: 'email', value: params.phone, rules: ['email']}
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
            {label: 'ID', value: params.id, rules: ['notnull']},
            {label: '账号', value: params.account, rules: ['notnull', 'noChinese']},
            {label: '密码', value: params.password, rules: ['notnull']},
            {label: '账号类型', value: params.type, rules: ['notnull', 'number']},
            {label: '手机号码', value: params.phone, rules: ['phone']},
            {label: '微信', value: params.wechat, rules: ['noChinese']},
            {label: 'qq', value: params.qq, rules: ['number']},
            {label: 'email', value: params.email, rules: ['email']}
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
    // 不能删除管理员
    if (ID === 1 || ID === '1') {
      res.json({
        code: 20202,
        success: false,
        message: '无法删除管理员'
      })
      return
    }
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
  async userInfo (req, res, next) {
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
  async getAll (req, res, next) {
    next()
  }
  async getPermissions (req, res, next) {
    next()
  }
  async getCreateUser (req, res, next) {
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
  async userTransfer (req, res, next) {
    const params = req.body,
          arr = [
            {label: '接收用户', value: params.toUser, rules: ['notnull', 'number']},
            {label: '转移用户', value: params.user, rules: ['notnull', 'number']},
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

export default new User()
