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
        userInfo = await this.getUserInfo(req)
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
    let query = JSON.parse(JSON.stringify(req.query)),
        result,
        length,
        userInfo = await this.getUserInfo(req)
    // 设置非模糊查询字段
    for (let key in query) {
      if (['id', 'create_user', 'type', 'origin'].indexOf(key) === -1) {
        query.like = [...query.like || [], key]
      }
    }
    try {
      result = await LogModel.getList({get: query})
      length = await LogModel.getTotals({get: query})
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
}

export default new Log()
