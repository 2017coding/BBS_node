import userModel from '../model/User';
import query from '../mysql'
import Base from './Base';

class User extends Base {
  constructor () {
    super();
    this.login = this.login.bind(this)
		this.registered = this.registered.bind(this)
  }
  // 注册
  async registered (req, res, next) {
    let search 
    try {
      search = await userModel.getRow([account])
    } catch (e) {
      res.json({
        code: 200,
        success: false,
        content: e.sqlMessage,
        message: '错误'
      })
      return
    }
    if (search.length === 0) {
      let result
      try {
        result = await userModel.registered({
          role_id: 1,
          account: req.body.account,
          name: req.body.name,
          password: req.body.password,
          type: 2,
          status: 1
        })
      } catch (e) {
        res.json({
          code: 200,
          success: false,
          content: e.sqlMessage,
          message: '注册失败'
        })
        return
      }
      res.json({
        code: 200,
        success: false,
        content: result,
        message: '注册成功'
      })
    } else {
      res.json({
        code: 200,
        success: false,
        message: '用户已存在'
      })
    }
  }
  // 登录
  async login (req, res, next) {
    const account = req.body.account
    const password = req.body.password
    let search
    try {
      search = await userModel.login(account, password)
    } catch (e) {
      res.json({
        code: 200,
        success: false,
        content: e.sqlMessage,
        message: '注册失败'
      })
      return
    }
    if (search === 0) {
      res.json({
        code: 200,
        success: false,
        message: '账号或密码错误'
      })
    } else {
      res.json({
        code: 200,
        success: true,
        message: '登录成功'
      })
    }
  }
  // 编辑用户
  async update (req, res, next) {
    let id = req.body.id,
        data = JSON.parse(JSON.stringify(req.body))
        delete data.id
    const result = await userModel.update([data, id])
    res.json({
      code: 200,
      success: true,
      content: result,
      message: '操作成功'
    })
  }
  // 删除用户
  async delete (req, res, next) {
    let id = req.params.id
    const result = await userModel.delete(id)
    res.json({
      code: 200,
      success: true,
      content: result,
      message: '操作成功'
    })
  }
  // 获取用户信息
  async userInfo (req, res, next) {
    const id = req.query.id
    const sql = `select * from bbs_user where id = '${id}'`
    const search = await query(sql)
    if (search.length === 0) {
      res.json({
        code: 200,
        success: false,
        content: search,
        message: '用户不存在'
      })
    } else {
      res.json({
        code: 200,
        success: true,
        content: search,
        message: '操作成功'
      })
    }
  }
  // 查询用户列表
  async getList (req, res, next) {
    let curPage = req.query.curPage,
        pageSize = req.query.pageSize,
        result,
        length
    try {
      result = await userModel.getList(curPage, pageSize)
      length = await userModel.getTotals()
    } catch (e) {
    }
    res.json({
      code: 200,
      success: true,
      content: {
        result,
        curPage,
        pageSize,
        totals: length[0].count
      },
      message: '操作成功'
    })
  }
  // 获取所有用户
  async getAll (req, res, next) {
    const result = await userModel.getAll()
    res.json({
      code: 200,
      success: true,
      content: result,
      message: '操作成功'
    })
  }
}

export default new User()
