import Base from './Base'
import FileMolde from '../model/File'
import FolderMolde from '../model/Folder'

class Folder extends Base {
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
    // 查询目录是否存在
    try {
      search = await FolderMolde.getRow({get: {name: data.name, type: data.type, flag: 1}})
    } catch (e) {
      this.handleException(req, res, e)
      return
    }
    // 如果目录存在，提示
    if (search.length === 0) {
      // 创建相关目录
      data.path = `${data.name}_${this.utils.switchTime(new Date(), 'YYYYMMDDhhmmss')}_${this.utils.randomCode()}`
      try {
        await this.dirExists(`public/file/${data.path}`)
      } catch (e) {
        return e
      }
      try {
        // 参数处理
        data.create_user = userInfo.id,
        data.create_time = new Date()
        result = await FolderMolde.create({
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
        message: '目录存在'
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
    // 查询目录是否存在
    try {
      search = await FolderMolde.getRow({get: {name: data.name, type: data.type, flag: 1}})
    } catch (e) {
      this.handleException(req, res, e)
      return
    }
    // 修改的名字重复
    if (search.length > 0 && search[0].id !== id) {
      res.json({
        code: 20001,
        success: false,
        message: '目录名重复'
      })
      return
    }
    try {
      result = await FolderMolde.update({set: data, get: {id}})
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
    // 如果当前模块下面有文件，则不能删除
    const child = await FileMolde.getAll({get: {f_id: req.params.id, flag: 1}})
    if (child.length > 0) {
      res.json({
        code: 20001,
        success: false,
        message: '请先删除该目录下的文件'
      })
      return
    }
    const userInfo = await this.getUserInfo(req),
      result = await FolderMolde.update({set: {flag: 0, delete_user: userInfo.id, delete_time: new Date()}, get: {id: req.params.id}})
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
    const search = await FolderMolde.getRow({get: {id: req.params.id, flag: 1}})
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
      result = await FolderMolde.getList({get: {...query, flag: 1}})
      length = await FolderMolde.getTotals({get: {...query, flag: 1}})
    } catch (e) {
      this.handleException(req, res, e)
      return
    }
    res.json({
      code: 20000,
      success: true,
      content: {
        result: result.map(item => {
          item.completePath = `https://www.lyh.red/file/${item.path}`
          return item
        }),
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
      result = await FolderMolde.getAll({get: {...query, falg: 1}})
    } catch (e) {
      this.handleException(req, res, e)
      return
    }
    res.json({
      code: 20000,
      success: true,
      content: result.map(item => {
        item.completePath = `https://www.lyh.red/file/${item.path}`
        return item
      }),
      message: '操作成功'
    })
  }
}

export default new Folder()
