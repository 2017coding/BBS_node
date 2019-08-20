import Base from './Base'
import TagModel from '../model/Tag'
import TagTypeModel from '../model/TagType'

class TagType extends Base {
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
    let data = JSON.parse(JSON.stringify(req.body)),
          userInfo = await this.getUserInfo(req), result, search, path
    // 查询标签类型是否存在
    try {
      search = await TagTypeModel.getRow({get: {name: data.name, flag: 1}})
    } catch (e) {
      this.handleException(req, res, e)
      return
    }
    // 如果存在，提示
    if (search.length === 0) {
      try {
        // 参数处理
        data.create_user = userInfo.id,
        data.create_time = new Date()
        result = await TagTypeModel.create({
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
        message: '类型已存在'
      })
    }
  }
  // 编辑
  async update (req, res, next) {
    let id = req.body.id,
        data = JSON.parse(JSON.stringify(req.body)),
        result,
        search,
        userInfo = await this.getUserInfo(req)
        // 参数处理
        data.update_user = userInfo.id
        data.update_time = new Date()
        delete data.id
    // 查询标签类型是否存在
    try {
      search = await TagTypeModel.getRow({get: {name: data.name, flag: 1}})
    } catch (e) {
      this.handleException(req, res, e)
      return
    }
    // 修改的名字重复
    if (search.length > 0 && search[0].id !== id) {
      res.json({
        code: 20001,
        success: false,
        message: '类型名字重复'
      })
      return
    }
    try {
      result = await TagTypeModel.update({set: data, get: {id}})
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
    // 如果当前类型下面有标签，则不能删除
    const child = await TagModel.getAll({get: {f_id: req.params.id, flag: 1}})
    if (child.length > 0) {
      res.json({
        code: 20001,
        success: false,
        message: '请先删除该目录下的文件'
      })
      return
    }
    const userInfo = await this.getUserInfo(req),
      result = await TagTypeModel.update({set: {flag: 0, delete_user: userInfo.id, delete_time: new Date()}, get: {id: req.params.id}})
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
    const search = await TagTypeModel.getRow({get: {id: req.params.id, flag: 1}})
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
      result = await TagTypeModel.getList({get: {...query, flag: 1}})
      length = await TagTypeModel.getTotals({get: {...query, flag: 1}})
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
    let result, query = req.query
    try {
      result = await TagTypeModel.getAll({get: {...query, flag: 1}})
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

export default new TagType()
