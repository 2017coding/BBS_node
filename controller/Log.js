import Base from './Base'
import LogModel from '../model/Log'

class Log extends Base {
  constructor () {
    super()
    this.writeLog = this.writeLog.bind(this)
    this.getList = this.getList.bind(this)
  }
  // 写入日志
  async writeLog (req, res, next) {
    let data = req.body,
        userInfo = this.getUserInfo(req)
    try {
      // 写入登录日志
      await logModel.writeLog({
        set: {
          origin: data.origin,
          type: data.type,
          title: data.title,
          desc: data.desc,
          ip: this.getClientIp(req),
          create_user: userInfo.id,
          create_time: new Date()
        }
      })
    } catch (e) {
      this.handleException(req, res, e)
      return
    }
    res.json({
      code: 20000,
      success: true,
      content: {},
      message: '写入成功'
    })
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
      result = await LogModel.getList(curPage, pageSize, {get: params})
      length = await LogModel.getTotals({get: params})
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
}

export default new Log()
