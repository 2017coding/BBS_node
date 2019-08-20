import Base from './Base'
import UserModel from '../model/User'
import logModel from '../model/Log'
import MenuModel from '../model/Menu'
import DataPermsModel from '../model/DataPerms'
import Authority from './Authority'
import JWT from 'jsonwebtoken'

class User extends Base {
  constructor () {
    super()
    this.registered = this.registered.bind(this)
    this.login = this.login.bind(this)
    this.loginOut = this.loginOut.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)
    this.userInfo = this.userInfo.bind(this)
    this.getRow = this.getRow.bind(this)
    this.getList = this.getList.bind(this)
    this.getAll = this.getAll.bind(this)
    this.getPermissions = this.getPermissions.bind(this)
    this.userTransfer = this.userTransfer.bind(this)
  }
  // 注册
  async registered (req, res, next) {
    let search, result, userInfo = await this.getUserInfo(req) || {}
    // TODO: 需要做一个消息队列，保证注册时数据不会混乱
    // 查询用户是否存在
    try {
      search = await UserModel.getRow({get: {account: req.body.account, flag: 1}})
    } catch (e) {
      this.handleException(req, res, e)
      return
    }
    // 用户不存在创建用户，存在则提示
    if (search.length === 0) {
      try {
        let data = JSON.parse(JSON.stringify(req.body))
        // TODO: 添加时有创建人, 注册时没有
        // 参数处理
        data.create_user = userInfo.id || 1,
        data.create_time = new Date()
        result = await UserModel.registered({
          set: data
        })
      } catch (e) {
        this.handleException(req, res, e)
        return
      }
      try {
        // 创建用户写入日志
        await logModel.writeLog({
          set: {
            origin: req.body.type,
            type: 4,
            title: req.body.type === 2 ? '创建用户' : '注册用户',
            desc: '',
            ip: this.getClientIp(req),
            create_user: userInfo.id,
            create_time: new Date()
          }
        })
      } catch (e) {
        this.handleException(req, res, e)
      }
      res.json({
        code: 20000,
        success: true,
        message: req.body.type === 2 ? '创建成功' : '注册成功'
      })
    } else {
      res.json({
        code: 20001,
        success: false,
        message: '用户已存在'
      })
    }
  }
  // 登录
  async login (req, res, next) {
    let account = req.body.account,
          password = req.body.password,
          type = req.body.type,
          search, token = [], data
    // 查询用户名密码是否正确, 以及为用户设置登录成功后的token
    // TODO: 登录比较用户信息和token存储的信息是否一致，不一致需要重新设置token
    try {
      search = await UserModel.getRow({get: {account, password, flag: 1}})
      data = search[0] ? JSON.parse(JSON.stringify(search[0])) : ''
      if (data) {
        for (let key in data) {
          if (!data[key]) {
            delete data[key]
          }
        }
        // 得到要设置的token类型和过期时间
        switch (+type) {
          case 0:
            data.type = 'phone'
            data[data.type + '_expire_time'] = new Date(+new Date() + 60 * 60 * 24 * 180 * 1000) // 半年
            break
          case 1:
            data.type = 'bbs'
            data[data.type + '_expire_time'] = new Date(+new Date() + 60 * 60 * 24 * 60 * 1000) // 两个月
            break
          case 2:
            data.type = 'admin'
            data[data.type + '_expire_time'] = new Date(+new Date() + 60 * 60 * 24 * 1 * 1000) // 重新登录则上次的失效 (测试期间设置为一天后失效)
            break
        }
        try {
          // Token过期了或者用户登录获取到的信息和之前token解析出来的不一样，则重新设置，否则不处理
          await Authority.setToken(data, {
            set: {
              [data.type + '_token']: JWT.sign(data, 'BBS', {}),
              [data.type + '_expire_time']: data[data.type + '_expire_time'],
              [data.type + '_ip']: this.getClientIp(req),
              user_id: data.id
            },
            get: {
              user_id: data.id
            }
          })
        } catch (e) {
          this.handleException(req, res, e)
          return
        }
      }
    } catch (e) {
      this.handleException(req, res, e)
      return
    }
    // 查询为空即用户信息不正确，不为空说明查询成功
    if (search.length === 0) {
      res.json({
        code: 20301,
        success: false,
        message: '账号或密码错误'
      })
    } else if (search[0].status === 0) {
      res.json({
        code: 20301,
        success: false,
        message: '当前账号已被停用'
      })
    } else {
      try {
        // 写入登录日志
        await logModel.writeLog({
          set: {
            origin: type,
            type: 1,
            title: '用户登录',
            desc: '',
            ip: this.getClientIp(req),
            create_user: search[0].id,
            create_time: new Date()
          }
        })
      } catch (e) {
        this.handleException(req, res, e)
      }
      try {
        token = await Authority.getToken({get: {user_id: data.id}})
      } catch (e) {
        this.handleException(req, res, e)
        return
      }
      res.json({
        code: 20000,
        success: true,
        content: {},
        token: token[0] ? token[0][data.type + '_token'] : '',
        message: '登录成功'
      })
    }
  }
  // 退出登录
  async loginOut (req, res, next) {
    let userInfo = await this.getUserInfo(req)
    // 设置Token过期时间为现在
    userInfo[req.query.type + '_expire_time'] = +new Date()
    try {
      // TODO: 测试期间不清除数据
      // await Authority.setToken(userInfo, {
      //   set: {[userInfo.type + '_token']: JWT.sign(userInfo, 'BBS', {}), user_id: userInfo.id}
      // })
    } catch (e) {
      this.handleException(req, res, e)
      return
    }
    try {
      let type = req.query.type === 'phone' ? 0 : req.query.type === 'bbs' ? 1 : 2
      // 写入登出日志
      await logModel.writeLog({
        set: {
          origin: type,
          type: 2,
          title: '用户登出',
          desc: '',
          ip: this.getClientIp(req),
          create_user: userInfo.id,
          create_time: new Date()
        }
      })
    } catch (e) {
      this.handleException(req, res, e)
    }
    res.json({
      code: 20000,
      success: true,
      content: {},
      message: '操作成功'
    })
  }
  // 编辑
  async update (req, res, next) {
    let id = req.body.id,
        data = JSON.parse(JSON.stringify(req.body)),
        result,
        userInfo = await this.getUserInfo(req)
        // 参数处理
        data.update_user = userInfo.id
        data.update_time = new Date()
        delete data.id
        delete data.account // 账号不能被修改
    try {
      result = await UserModel.update({set: data, get: {id}})
    } catch (e) {
      this.handleException(req, res, e)
      return
    }
    if (result.affectedRows) {
      try {
        // 编辑用户写入日志
        await logModel.writeLog({
          set: {
            origin: 2,
            type: 4,
            title: '编辑用户',
            desc: '',
            ip: this.getClientIp(req),
            create_user: userInfo.id,
            create_time: new Date()
          }
        })
      } catch (e) {
        this.handleException(req, res, e)
      }
      res.json({
        code: 20000,
        success: true,
        message: '操作成功'
      })
    } else {
      res.json({
        code: 20001,
        success: false,
        message: '编辑失败'
      })
    }
  }
  // 删除用户
  async delete (req, res, next) {
    let userInfo = await this.getUserInfo(req), result, createUserList = []
    // 先判断用户是否创建用户
    createUserList = await UserModel.getCreateUser(req.params.id)
    if (createUserList.length > 0) {
      res.json({
        code: 20001,
        success: false,
        message: '该用户有创建用户，无法删除'
      })
      return
    }
    result = await UserModel.update({set: {flag: 0, delete_user: userInfo.id, delete_time: new Date()}, get: {id: req.params.id}})
    if (result.affectedRows) {
      try {
        // 编辑用户写入日志
        await logModel.writeLog({
          set: {
            origin: 2,
            type: 4,
            title: '删除用户',
            desc: '',
            ip: this.getClientIp(req),
            create_user: userInfo.id,
            create_time: new Date()
          }
        })
      } catch (e) {
        this.handleException(req, res, e)
      }
      res.json({
        code: 20000,
        success: true,
        message: '删除成功'
      })
    } else {
      res.json({
        code: 20001,
        success: true,
        message: '删除失败'
      })
    }
  }
  // 获取用户信息
  async userInfo (req, res, next) {
    const userInfo = await this.getUserInfo(req),
          search = await UserModel.getRow({get: {id: userInfo.id, flag: 1}})
    if (search.length === 0) {
      res.json({
        code: 20401,
        success: false,
        content: search,
        message: '用户不存在'
      })
    } else {
      res.json({
        code: 20000,
        success: true,
        content: search,
        message: '操作成功'
      })
    }
  }
  // 获取单条数据
  async getRow (req, res, next) {
    const search = await UserModel.getRow({get: {id: req.params.id, flag: 1}})
    if (search.length === 0) {
      res.json({
        code: 20401,
        success: false,
        content: search,
        message: '查询信息不存在'
      })
    } else {
      res.json({
        code: 20000,
        success: true,
        content: search,
        message: '操作成功'
      })
    }
  }
  // 查询列表
  async getList (req, res, next) {
    let query = JSON.parse(JSON.stringify(req.query)),
        result,
        length,
        userInfo = await this.getUserInfo(req)
    // 传入创建人则查询创建人，没传入则查询当前用户下的
    query.create_user = query.create_user || userInfo.id
    // 设置非模糊查询字段
    for (let key in query) {
      if (['id', 'create_user'].indexOf(key) === -1) {
        query.like = [...query.like || [], key]
      }
    }
    try {
      result = await UserModel.getList({get: {...query, flag: 1}})
      length = await UserModel.getTotals({get: {...query, flag: 1}})
    } catch (e) {
      this.handleException(req, res, e)
      return
    }
    res.json({
      code: 20000,
      success: true,
      content: {
        result,
        curPage: +query.curPage,
        pageSize: +query.pageSize,
        totals: length[0].count
      },
      message: '操作成功'
    })
  }
  // 获取所有
  async getAll (req, res, next) {
    let result, userInfo = await this.getUserInfo(req), query = req.query
    try {
      // 设置非模糊查询字段
      for (let key in query) {
        if (['id', 'create_user'].indexOf(key) === -1) {
          query.like = [...query.like || [], key]
        }
      }
      // TODO: 暂时为当前用户创建的用户，admin查询所有用户, 之后改为当前用户创建的用户以及用户创建的用户
      result = await UserModel.getAll({get: {...query, create_user: userInfo.id, flag: 1}})
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
  // 获取用户相关权限
  async getPermissions (req, res, next) {
    let userInfo = await this.getUserInfo(req), type = req.query.type, mod, dataPerms
    // 如果当前用户没有绑定角色
    if (!userInfo.role_id) {
      // res.json({
      //   code: 20203,
      //   success: false,
      //   content: {},
      //   message: '用户未绑定角色'
      // })
      // return
    }
    try {
      mod = userInfo.id === 1 ?
            await MenuModel.getAll({get: {type, flag: 1}}) :
            await MenuModel.getRoleMenu({get: {type, role_id: userInfo.role_id, flag: 1}})
      dataPerms = userInfo.id === 1 ? 
            await DataPermsModel.getAll({get: {}}) :
            await DataPermsModel.getCodeByRoleDataPerms({get: {role_id: userInfo.role_id}})
    } catch (e) {
      this.handleException(req, res, e)
      return
    }
    res.json({
      code: 20000,
      success: true,
      content: {
        mod,
        dataPerms
      },
      message: '操作成功'
    })
  }
  // 获取当前用户创建用户
  async getCreateUser (req, res, next) {
    let createUserList = []
    // 先判断用户是否创建用户
    createUserList = await UserModel.getCreateUser(req.params.id)
    if (createUserList.length > 0) {
      res.json({
        code: 20001,
        success: false,
        result: createUserList,
        message: '该用户有创建用户，无法删除'
      })
    } else {
      res.json({
        code: 20000,
        success: true,
        result: {},
        message: '用户可删除'
      })
    }
  }
  async userTransfer (req, res, next) {
    let data = JSON.parse(JSON.stringify(req.body)),
      result,
      userInfo = await this.getUserInfo(req)
    try {
      result = await UserModel.update({set: {create_user: data.toUser}, get: {create_user: data.user}})
    } catch (e) {
      this.handleException(req, res, e)
      return
    }
    if (result.affectedRows) {
      try {
        // 用户转移写入日志
        await logModel.writeLog({
          set: {
            origin: 2,
            type: 4,
            title: '用户转移',
            desc: '',
            ip: this.getClientIp(req),
            create_user: userInfo.id,
            create_time: new Date()
          }
        })
      } catch (e) {
        this.handleException(req, res, e)
      }
      res.json({
        code: 20000,
        success: true,
        message: '操作成功'
      })
    } else {
      res.json({
        code: 20001,
        success: false,
        message: '操作失败'
      })
    }
  }
}

export default new User()
