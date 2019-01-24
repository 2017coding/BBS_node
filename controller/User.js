import userModel from '../model/User';
import query from '../mysql'
import Base from './Base';

class User extends Base {
  constructor () {
    super();
    this.login = this.login.bind(this)
		this.registered = this.registered.bind(this)
  }
  async registered (req, res, next) {
    const name = req.body.name
    const account = req.body.account
    const password = req.body.password
    const search = await query(`select * from bbs_user where account = '${account}'`)
    if (search.result.length === 0) {
      const sql = `INSERT INTO bbs_user (role_id, account, name, password, type, status) 
                VALUES ('1', '${account}', '${name}', '${password}', '2', '1')`
      const result = await query(sql)
      if (result.err) {
        res.json({
          code: 200,
          success: false,
          message: '错误'
        })
      } else {
        res.json({
          code: 200,
          success: false,
          content: result,
          message: '注册成功'
        })
      }
    } else {
      res.json({
        code: 200,
        success: false,
        message: '用户已存在'
      })
    }
  }
  async login (req, res, next) {
    const account = req.body.account
    const password = req.body.password
    const sql = `select * from bbs_user where account = '${account}' AND password = '${password}'`
    const search = await query(sql)
    if (search.err) {
      throw new Error(search.err)
    } else {
      res.json({
        code: 200,
        success: true,
        message: '登录成功'
      })
    }
  }
  async getUserInfo (req, res, next) {
    console.log(req.query)
    const id = req.query.id
    const sql = `select * from bbs_user where id = '${id}'`
    const search = await query(sql)
    if (search.err) {
      throw new Error(search.err)
    } else {
      res.json({
        code: 200,
        success: true,
        content: search.result,
        message: '操作成功'
      })
    }
  }
}

export default new User()
