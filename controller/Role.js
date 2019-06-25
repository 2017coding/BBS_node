import Base from './Base'
import RoleModel from '../model/Role'
import RoleRelationModel from '../model/RoleRelation'

class Role extends Base {
  constructor () {
    super()
    this.create = this.create.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)
    this.getRow = this.getRow.bind(this)
    this.getList = this.getList.bind(this)
    this.getAll = this.getAll.bind(this)
  }
  // 创建
  async create (req, res, next) {
    let search, result
    // TODO: 需要做一个消息队列，保证创建时数据不会混乱
    // 查询角色是否存在
    try {
      search = await RoleModel.getRow({get: {name: req.body.name}})
    } catch (e) {
      this.handleException(req, res, e)
      return
    }
    // 角色不存在创建角色，存在则提示
    if (search.length === 0) {
      try {
        let data = JSON.parse(JSON.stringify(req.body)),
            userInfo = await this.getUserInfo(req)
        // 参数处理
        data.create_user = userInfo.id,
        data.create_time = new Date()
        result = await RoleModel.create({
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
    } else {
      res.json({
        code: 20001,
        success: false,
        message: '角色已存在'
      })
    }
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
      result = await RoleModel.update({set: data, get: {id}})
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
    const child = await RoleModel.getTotals({get: {pid: req.params.id, flag: 1}})
    if (child[0].count > 0) {
      res.json({
        code: 20001,
        success: false,
        message: '请先删除子节点'
      })
      return
    }
    const userInfo = await this.getUserInfo(req)
    // 如果当前角色有用户绑定，则无法删除
    const bindUser = await RoleRelationModel.getBindUser({get: {role_id: req.params.id, userId: userInfo.id}})
    if (bindUser.length > 0) {
      res.json({
        code: 20001,
        success: false,
        message: `存在${bindUser.length}个绑定用户,请先解除绑定`
      })
      return
    }
    const result = await RoleModel.update({set: {flag: 0, delete_user: userInfo.id, delete_time: new Date()}, get: {id: req.params.id}})
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
    const search = await RoleModel.getRow({get: {id: req.params.id, flag: 1}})
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
      result = await RoleModel.getList({get: {query, flag: 1}})
      length = await RoleModel.getTotals({get: {query, flag: 1}})
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
  // 获取所有
  async getAll (req, res, next) {
    let result, userInfo = await this.getUserInfo(req)
    // admin获取所有，其他用户获取属于当前角色和创建的角色
    try {
      result = await RoleModel.getAll({get: {id: userInfo.role_id, flag: 1}})
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

export default new Role()
