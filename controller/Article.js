import Base from './Base'
import ArticleModel from '../model/Article'
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
    this.visit = this.visit.bind(this)
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
            if (params.content) {
              params.content = params.content.replace(/#*.*#/g, '').replace(/[^a-z0-9\u4e00-\u9fa5]/, '').substring(0, 200) // 除去标题部分，截取200个字用来显示
            }
            params.url = writePath
            params.create_user = userInfo.id
            params.create_time = new Date()
            delete params.tags
            result = await ArticleModel.create({
              set: params,
              tags: req.body.tags
            })
          } catch (e) {
            this.handleException(req, res, e)
            return
          }
          res.json({
            code: 20000,
            success: true,
            content: {id: result.insertId},
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
        search = await ArticleModel.getRow({get: {id: data.id}}),
        writePath
        // 参数处理
        data.update_user = userInfo.id
        data.update_time = new Date()
        delete data.id
    if (userInfo.id !== search[0].create_user) {
      res.json({
        code: 20001,
        success: false,
        result: err,
        message: '不是文章作者，无编辑权限'
      })
      return
    }
    // 重新写入文件
    fs.writeFile(`public/article/${search[0].url}`, data.content, async (err) => {
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
          if (data.content) {
            data.content = data.content.replace(/#*.*#/g, '').replace(/[^a-z0-9\u4e00-\u9fa5]/, '').substring(0, 200) // 除去标题部分，截取200个字用来显示
          }
          delete data.tags
          result = await ArticleModel.update({
            set: data,
            get: {id},
            tags: req.body.tags
          })
        } catch (e) {
          this.handleException(req, res, e)
          return
        }
        if (result) {
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
      result = await ArticleModel.update({set: {flag: 0, delete_user: userInfo.id, delete_time: new Date()}, get: {id: req.params.id}})
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
    const search = await ArticleModel.getRow({get: {id: req.params.id}})
    if (search.length === 0) {
      res.json({
        code: 20401,
        success: false,
        content: search,
        message: '查询信息不存在'
      })
    } else {
      // 获取到文件files
      fs.readFile(`public/article/${search[0].url}`, (err, data) => {
        if (err) {
          res.json({
            code: 20001,
            success: false,
            result: err,
            message: '查询信息失败'
          })
          return
        }
        const buf = new Buffer(data)
        delete search[0].url
        search[0].content = buf.toString('utf8', 0, buf.length)
        res.json({
          code: 20000,
          success: true,
          content: search.map(item => {
            const tagIds = item.tag_id ? item.tag_id.split(',') : []
            const tagNames = item.tag_name ? item.tag_name.split(',') : []
            const tagList = tagIds.map((item1, index1) => {
              return {
                id: +item1,
                name: tagNames[index1]
              }
            })
            delete item.tag_id
            delete item.tag_name
            return {
              tagList,
              ...item
            }
          }),
          message: '操作成功'
        })
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
      result = await ArticleModel.getList({get: {...query}})
      length = await ArticleModel.getTotals({get: {...query}})
    } catch (e) {
      this.handleException(req, res, e)
      return
    }
    res.json({
      code: 20000,
      success: true,
      content: {
        result: result.map(item => {
          const tagIds = item.tag_id ? item.tag_id.split(',') : []
          const tagNames = item.tag_name ? item.tag_name.split(',') : []
          const tagList = tagIds.map((item1, index1) => {
            return {
              id: +item1,
              name: tagNames[index1]
            }
          })
          delete item.tag_id
          delete item.tag_name
          return {
            tagList,
            ...item
          }
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
    let result, params = {...req.query, flag: 1}
    // 设置非模糊查询字段
    for (let key in params) {
      if (['id', 'create_user'].indexOf(key) === -1) {
        params.like = [...params.like || [], key]
      }
    }
    try {
      result = await ArticleModel.getAll({get: params})
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
  // 浏览
  async visit (req, res, next) {
  }
  // 点赞 （用户已点赞，则取消用户点赞， 未点赞则点赞）
  async praise (req, res, next) {
  }
  // 收藏 （用户已收藏，则取消用户收藏， 未收藏则收藏）
  async collection (req, res, next) {
  }
}

export default new Article()
