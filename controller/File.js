import Base from './Base'
import FileModel from '../model/File'
import FolderModel from '../model/Folder'
import fs from 'fs'

class File extends Base {
  constructor () {
    super()
    this.upload = this.upload.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)
    this.getRow = this.getRow.bind(this)
    this.getList = this.getList.bind(this)
    this.getAll = this.getAll.bind(this)
  }
  // 上传
  async upload (req, res, next) {
    try {
      let params = JSON.parse(JSON.stringify(req.body)),
          files = req.files.file,
          userInfo = await this.getUserInfo(req),
          search = await FolderModel.getRow({get: {id: params.fid, flag: 1}}),
          result,
          suffix = files.originalFilename.match(/\.[a-zA-Z]+/),
          writePath
      if (!search.length) {
        res.json({
          code: 20001,
          success: false,
          result: {},
          message: '请选择正确的上传目录'
        })
      }
      // 检查路径是否存在，不存在则创建相关路径
      try {
        await this.dirExists(`public/file/${search[0].path}`)
      } catch (e) {
        return e
      }
      // 设置上传的文件路径
      writePath = `${search[0].path}/${this.utils.switchTime(new Date(), 'YYYYMMDDhhmmss')}_${this.utils.randomCode()}${suffix}`
      // 获取到文件files
      fs.readFile(files.path, (err, data) => {
        if (err) {
          res.json({
            code: 20001,
            success: false,
            result: err,
            message: '上传失败'
          })
          return
        }
        // 写入文件
        fs.writeFile(`public/file/${writePath}`, data, async (err) => {
          if (err) {
            res.json({
              code: 20001,
              success: false,
              result: err,
              message: '上传失败'
            })
          } else {
            try {
              // 参数处理
              let obj = {
                f_id: params.fid,
                type: params.type,
                name: files.name, // 文件名
                path: writePath,  // 文件路径
                suffix: suffix, // 后缀名
                size: files.size, // 大小
                create_user: userInfo.id,
                create_time: new Date()
              }
              result = await FileModel.create({
                set: obj
              })
            } catch (e) {
              this.handleException(req, res, e)
              return
            }
            res.json({
              code: 20000,
              success: true,
              result: writePath,
              message: '上传成功'
            })
          }
        })
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
        userInfo = await this.getUserInfo(req)
        // 参数处理
        data.update_user = userInfo.id
        data.update_time = new Date()
        delete data.id
    try {
      result = await FileModel.update({set: data, get: {id}})
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
    // TODO: 删除数据库数据时，是否删除对应的文件，这个在之后做处理
    const userInfo = await this.getUserInfo(req),
      result = await FileModel.update({set: {flag: 0, delete_user: userInfo.id, delete_time: new Date()}, get: {id: req.params.id}})
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
    const search = await FileModel.getRow({get: {id: req.params.id, flag: 1}})
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
      if (['id', 'f_id', 'create_user'].indexOf(key) === -1) {
        query.like = [...query.like || [], key]
      }
    }
    try {
      result = await FileModel.getList({get: {...query, flag: 1}})
      length = await FileModel.getTotals({get: {...query, flag: 1}})
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
    let result, params = {...req.query, flag: 1}
    // 设置非模糊查询字段
    for (let key in params) {
      if (['id', 'create_user', 'f_id'].indexOf(key) === -1) {
        params.like = [...params.like || [], key]
      }
    }
    try {
      result = await FileModel.getAll({get: params})
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

export default new File()
