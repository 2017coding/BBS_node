import Base from './Base'
import AreaModel from '../model/Area'

class Area extends Base {
  constructor () {
    super()
    this.update = this.update.bind(this)
    this.getList = this.getList.bind(this)
    this.getAll = this.getAll.bind(this)
  }
  // 编辑
  async update (req, res, next) {
    let data = req.body,
        result,
        userInfo = await this.getUserInfo(req)
    try {
      result = await AreaModel.update({
        set: {
          status: data.status
        },
        get: {
          id: data.id
        }
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
  // 查询列表
  async getList (req, res, next) {
    let query = JSON.parse(JSON.stringify(req.query)),
        result,
        length,
        userInfo = await this.getUserInfo(req)
    // 设置非模糊查询字段
    for (let key in query) {
      if (['id', 'pid'].indexOf(key) === -1) {
        query.like = [...query.like || [], key]
      }
    }
    try {
      result = await AreaModel.getList({get: query})
      length = await AreaModel.getTotals({get: query})
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
  // 根据PID获取所有下级区域
  async getAll (req, res, next) {
    let pid = req.params.pid, result
    try {
      result = await AreaModel.getAll({get: {pid}})
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

export default new Area()
