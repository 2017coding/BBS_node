import userModel from '../model/User'
import Authority from './Authority'
import Base from './Authority'
import JWT from 'jsonwebtoken'
import crypto from 'crypto'

class User {
  constructor () {
    // super()
    // // 继承Base的方法
    // this.registered = this.registered.bind(this)
    // this.login = this.login.bind(this)
    // this.update = this.update.bind(this)
    // this.delete = this.delete.bind(this)
    // this.userInfo = this.userInfo.bind(this)
    // this.getList = this.getList.bind(this)
    // this.getAll = this.getAll.bind(this)
  }
  // 注册
  async registered (req, res, next) {
    let search, result
    // 查询用户是否存在
    try {
      search = await userModel.getRow({account: req.body.account})
    } catch (e) {
      res.json({
        code: 500,
        success: false,
        content: e,
        message: '服务器内部错误'
      })
      return
    }
    // 用户不存在创建用户，存在则提示
    if (search.length === 0) {
      try {
        result = await userModel.registered({
          role_id: 1,
          account: req.body.account,
          name: req.body.name || req.body.account,
          password: req.body.password,
          type: req.body.type || 2,
          status: req.body.status || 1
        })
      } catch (e) {
        res.json({
          code: 500,
          success: false,
          content: e,
          message: '服务器内部错误'
        })
        return
      }
      res.json({
        code: 200,
        success: true,
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
    const type = req.body.type || 'bbs'
    let search,
        token
    // 查询用户名密码是否正确, 以及为用户设置登录成功后的token
    try {
      search = await userModel.login([account, password])
      let data = JSON.parse(JSON.stringify(search[0]))
      for (let key in data) {
        if (!data[key]) {
          delete data[key]
        }
      }
      if (data) {
        data.type = type
        token = await Authority.setToken(data, [
          {[type + '_token']: JWT.sign(data, 'BBS', {}), user_id: data.id},
          data.id
        ])
      }
    } catch (e) {
      res.json({
        code: 200,
        success: false,
        content: e,
        message: '登录失败'
      })
      return
    }
    // 查询为空即用户信息不正确，不为空说明查询成功
    if (search.length === 0) {
      res.json({
        code: 200,
        success: false,
        message: '账号或密码错误'
      })
    } else {
      res.json({
        code: 200,
        success: true,
        content: {data: search[0]},
        token: token[0] ? token[0][type + '_token'] : '',
        message: '登录成功'
      })
    }
  }
  // 编辑用户
  async update (req, res, next) {
    let id = req.body.id,
        data = JSON.parse(JSON.stringify(req.body)),
        result
        delete data.id
    try {
      result = await userModel.update([data, id])
    } catch (e) {
      res.json({
        code: 500,
        success: false,
        content: e,
        message: '编辑失败'
      })
      return
    }
    if (result.affectedRows) {
      res.json({
        code: 200,
        success: true,
        message: '编辑成功'
      })
    } else {
      res.json({
        code: 200,
        success: true,
        message: '编辑失败'
      })
    }
  }
  // 删除用户
  async delete (req, res, next) {
    let id = req.params.id
    // 不能删除管理员
    if (id === 1 || id === '1') {
      res.json({
        code: 300,
        success: false,
        message: '无法删除管理员'
      })
      return
    }
    const result = await userModel.delete(id)
    if (result.affectedRows) {
      res.json({
        code: 200,
        success: true,
        message: '删除成功'
      })
    } else {
      res.json({
        code: 200,
        success: true,
        message: '删除失败'
      })
    }
  }
  // 获取用户信息
  async userInfo (req, res, next) {
    const id = req.query.id
    const search = await userModel.getRow({id})
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
        params = JSON.parse(JSON.stringify(req.query)),
        result,
        length
        delete params.curPage
        delete params.pageSize
    try {
      result = await userModel.getList(curPage, pageSize, params)
      length = await userModel.getTotals([params])
    } catch (e) {
    }
    res.json({
      code: 200,
      success: true,
      content: {
        result,
        curPage,
        pageSize,
        totals: length ? length[0].count : 0
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
