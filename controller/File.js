import Base from './Base'
import FileMolde from '../model/File'
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
          userInfo = await this.getUserInfo(req), result, 
          writePath = files.originalFilename
      // 获取到文件files
      fs.readFile(files.path, (err, data) => {
        // 写入文件
        fs.writeFile(writePath, data, async (err) => {
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
                suffix: files.type, // 后缀名
                size: files.size, // 大小
                create_user: userInfo.id,
                create_time: new Date()
              }
              result = await FileMolde.create({
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
      result = await FileMolde.update({set: data, get: {id}})
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
      result = await FileMolde.update({set: {flag: 0, delete_user: userInfo.id, delete_time: new Date()}, get: {id: req.params.id}})
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
    const search = await FileMolde.getRow({get: {id: req.params.id, flag: 1}})
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
      result = await FileMolde.getList({get: {...query, flag: 1}})
      length = await FileMolde.getTotals({get: {...query, flag: 1}})
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
    let result, type = req.query.type
    try {
      result = await FileMolde.getAll(type ? {get: {type, flag: 1}} : {get: {flag: 1}})
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

export default new File()
