import Base from './Base'
import ArticleMolde from '../model/Article'
import fs from 'fs'

class Article extends Base {
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
    try {
      let params = JSON.parse(JSON.stringify(req.body)),
          userInfo = await this.getUserInfo(req),
          result,
          writePath
      // 检查路径是否存在，不存在则创建相关路径
      try {
        await this.dirExists(`public/article`)
      } catch (e) {
        return e
      }
      // 设置文件名
      writePath = `${userInfo.account}_${this.utils.switchTime(new Date(), 'YYYYMMDDhhmmss')}_${this.utils.randomCode()}.md`
      // 写入文件
      fs.writeFile(`public/article/${writePath}`, params.content, async (err) => {
        if (err) {
          res.json({
            code: 20001,
            success: false,
            result: err,
            message: '创建失败'
          })
        } else {
          try {
            // 参数处理
            delete params.content
            params.url = writePath
            result = await ArticleMolde.create({
              set: params
            })
          } catch (e) {
            this.handleException(req, res, e)
            return
          }
          res.json({
            code: 20000,
            success: true,
            content: {},
            message: '创建成功'
          })
        }
      })
    } catch (e) {
      this.handleException(req, res, e)
      return
    }
  }
  // 编辑
  async update (req, res, next) {
    let id = req.body.id,
        data = JSON.parse(JSON.stringify(req.body)),
        result,
        userInfo = await this.getUserInfo(req),
        search = await ArticleMolde.getRow({get: {id: data.id, flag: 1}}),
        writePath
        // 参数处理
        data.update_user = userInfo.id
        data.update_time = new Date()
        delete data.id
    // 先获取到当前文件的路径，然后重新写入文件
    writePath = search[0].url
    // 重新写入文件
    fs.writeFile(`public/article/${writePath}`, data.content, async (err) => {
      if (err) {
        res.json({
          code: 20001,
          success: false,
          result: err,
          message: '编辑失败'
        })
      } else {
        try {
          // 参数处理
          delete data.content
          data.url = writePath
          result = await ArticleMolde.update({
            set: data, get: {id}
          })
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
    })
  }
  // 删除
  async delete (req, res, next) {
    // TODO: 删除数据库数据时，是否删除对应的文件，这个在之后做处理
    const userInfo = await this.getUserInfo(req),
      result = await ArticleMolde.update({set: {flag: 0, delete_user: userInfo.id, delete_time: new Date()}, get: {id: req.params.id}})
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
    const search = await ArticleMolde.getRow({get: {id: req.params.id, flag: 1}})
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
      result = await ArticleMolde.getList({get: {...query, flag: 1}})
      length = await ArticleMolde.getTotals({get: {...query, flag: 1}})
    } catch (e) {
      this.handleException(req, res, e)
      return
    }
    res.json({
      code: 20000,
      success: true,
      content: {
        result: result,
        curPage: +query.curPage,
        pageSize: +query.pageSize,
        totals: length ? length[0].count : 0
      },
      message: '操作成功'
    })
  }
  // 获取所有
  async getAll (req, res, next) {
    let result, params = {...req.query, flag: 1}
    // 设置非模糊查询字段
    for (let key in params) {
      if (['id', 'create_user'].indexOf(key) === -1) {
        params.like = [...params.like || [], key]
      }
    }
    try {
      result = await ArticleMolde.getAll({get: params})
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

export default new Article()
