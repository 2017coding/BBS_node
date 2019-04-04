import Base from './Base'
import DataControlModel from '../model/DataControl'

class ModData extends Base {
  constructor () {
    super()
    this.create = this.create.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)
    this.getRow = this.getRow.bind(this)
    this.getList = this.getList.bind(this)
    this.getUserDataControl = this.getUserDataControl.bind(this)
    this.getAll = this.getAll.bind(this)
  }
  // 创建
  async create (req, res, next) {
    try {
      let data = JSON.parse(JSON.stringify(req.body)),
          userInfo = this.getUserInfo(req),
          result
      // 参数处理
      data.create_user = userInfo.id,
      data.create_time = new Date()
      result = await DataControlModel.create({
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
        userInfo = this.getUserInfo(req)
        // 参数处理
        data.update_user = userInfo.id
        data.update_time = new Date()
        delete data.id
    try {
      result = await DataControlModel.update({set: data, get: {id}})
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
    const result = await DataControlModel.delete({get: {id: req.params.id}})
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
    const search = await DataControlModel.getRow({get: {id: req.params.id}})
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
        userInfo = this.getUserInfo(req)
        // TODO: 有时间逻辑应该写为查询到当前用户创建的用户以及创建用户创建的用户
        // 如果是admin, 查询的时候则不需要设置用户ID, 否则为用户要查询的ID或用户ID
        if (userInfo.id === 1 || userInfo.id === '1') {
          delete query.create_user
        } else {
          query.create_user = query.create_user || userInfo.id
        }
        // 设置非模糊查询字段
        for (let key in query) {
          if (['id', 'create_user'].indexOf(key) === -1) {
            query.like = [...query.like || [], key]
          }
        }
    try {
      result = await DataControlModel.getList({get: query})
      length = await DataControlModel.getTotals({get: query})
    } catch (e) {
      this.handleException(req, res, e)
      return
    }
    res.json({
      code: 20000,
      success: true,
      content: {
        result,
        curPage: query.curPage,
        pageSize: query.pageSize,
        totals: length ? length[0].count : 0
      },
      message: '操作成功'
    })
  }
  // 获取当前用户拥有
  async getUserDataControl (req, res, next) {
      let modId = req.query.modId, result, userInfo = this.getUserInfo(req)
      try {
        result = userInfo.id === 1 ? 
                  await DataControlModel.getAll({get: {mod_id: modId}}) :
                  await DataControlModel.getUserDataControl({get: {mod_id: modId, role_id: userInfo.role_id}})
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
    let modId = req.query.modId, result
    try {
      result = await DataControlModel.getAll(modId ? {get: {mod_id: modId}} : '')
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

export default new ModData()
