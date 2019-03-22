import Base from './Base'
import AreaModel from '../model/Area'

class Area extends Base {
  constructor () {
    super()
    this.update = this.update.bind(this)
    this.getList = this.getList.bind(this)
  }
  // 修改状态
  async update (req, res, next) {
    let data = req.body,
        result,
        userInfo = this.getUserInfo(req)
    try {
      result = await AreaModel.update({
        set: {
          status: data.status
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
        message: '编辑成功'
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
    // return LogModel.getList(obj)
    let curPage = req.query.curPage,
        pageSize = req.query.pageSize,
        params = JSON.parse(JSON.stringify(req.query)),
        result,
        length,
        userInfo = this.getUserInfo(req)
        delete params.curPage
        delete params.pageSize
        // 设置非模糊查询字段
        for (let key in params) {
          if (key !== 'id' && key !== 'create_user') {
            params.like = [...params.like || [], key]
          }
        }
    try {
      result = await AreaModel.getList(curPage, pageSize, {get: params})
      length = await AreaModel.getTotals({get: params})
    } catch (e) {
      this.handleException(req, res, e)
      return
    }
    res.json({
      code: 20000,
      success: true,
      content: {
        result,
        curPage,
        pageSize,
        totals: length ? length[0].count : 0
      },
      message: '操作成功'
    })
  }
  // 根据PID获取所有下级区域
  async getAll (req, res, next) {
    let pid = req.params.pid
    try {
      await AreaModel.getAll({get: {pid}})
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
