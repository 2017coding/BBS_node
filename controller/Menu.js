import Base from './Base'
import MenuModel from '../model/Menu'

class Menu extends Base {
  constructor () {
    super()
    this.create = this.create.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)
    this.getRow = this.getRow.bind(this)
    this.getList = this.getList.bind(this)
    this.getRoleMenu = this.getRoleMenu.bind(this)
    this.getAll = this.getAll.bind(this)
  }
  // 创建
  async create (req, res, next) {
    try {
      let data = JSON.parse(JSON.stringify(req.body)),
          userInfo = await this.getUserInfo(req), result
      // 参数处理
      data.create_user = userInfo.id,
      data.create_time = new Date()
      result = await MenuModel.create({
        set: data
      })
    } catch (e) {
      this.handleException(req, res, e)
      return
    }
    res.json({
      code: 20000,
      success: true,
      message: '创建成功'
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
    try {
      result = await MenuModel.update({set: data, get: {id}})
    } catch (e) {
      this.handleException(req, res, e)
      return
    }
    if (result.affectedRows) {
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
  // 删除
  async delete (req, res, next) {
    // 如果当前模块下面有节点，则不能删除
    const child = await MenuModel.getAll({get: {pid: req.params.id}})
    if (child.length > 0) {
      res.json({
        code: 20001,
        success: false,
        message: '请先删除子目录'
      })
      return
    }
    const userInfo = await this.getUserInfo(req),
      result = await MenuModel.update({set: {flag: 0, delete_user: userInfo.id, delete_time: new Date()}, get: {id: req.params.id}})
    if (result.affectedRows) {
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
  // 获取单条数据
  async getRow (req, res, next) {
    const search = await MenuModel.getRow({get: {id: req.params.id, flag: 1}})
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
    // 设置非模糊查询字段
    for (let key in query) {
      if (['id', 'create_user'].indexOf(key) === -1) {
        query.like = [...query.like || [], key]
      }
    }
    try {
      result = await MenuModel.getList({get: {...query, flag: 1}})
      length = await MenuModel.getTotals({get: {...query, flag: 1}})
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
        totals: length ? length[0].count : 0
      },
      message: '操作成功'
    })
  }
  // 获取角色拥有的模块
  async getRoleMenu (req, res, next) {
    let result, query = req.query
    try {
      result = await MenuModel.getRoleMenu({get: {type: query.type, role_id: query.roleId, flag: 1}})
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
  // 获取所有
  async getAll (req, res, next) {
    let result, query = req.query
    try {
      result = await MenuModel.getAll({get: {...query, flag: 1}})
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

export default new Menu()
