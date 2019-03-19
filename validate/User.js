import BaseValidate from './BaseValidate'

class User extends BaseValidate{
  constructor () {
    super()
    this.registered = this.registered.bind(this)
    this.login = this.login.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)
    this.userInfo = this.userInfo.bind(this)
    this.getAll = this.getAll.bind(this)
  }
  async registered (req, res, next) {
    const account = req.body.account,
          password = req.body.password,
          arr = [
            {label: '账号', value: account, rules: ['notnull']},
            {label: '密码', value: password, rules: ['notnull']}
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
          arr = [
            {label: '账号', value: account, rules: ['notnull']},
            {label: '密码', value: password, rules: ['notnull']}
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
    next()
  }
  async delete (req, res, next) {
    next()
  }
  async userInfo (req, res, next) {
    next()
  }
  async getAll (req, res, next) {
    next()
  }
}

export default new User()
