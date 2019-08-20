import Base from './Base'
import NoticesModel from '../model/Notices'

class Notices extends Base {
  constructor () {
    super()
    this.setNotices = this.setNotices.bind(this)
    this.getNotices = this.getNotices.bind(this)
  }
  // 设置通知
  async setNotices (req, res, next) {
    let data = JSON.parse(JSON.stringify(req.body)),
        result,
        userInfo = await this.getUserInfo(req)
        // 参数处理
        data.create_user = userInfo.id
        data.create_time = new Date()
        delete data.id
    try {
      result = await NoticesModel.setNotices({set: data, get: {status: 1}})
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
        message: '操作失败'
      })
    }
  }
  // 获取通知
  async getNotices (req, res, next) {
    const search = await NoticesModel.getNotices({get: {status: 1, flag: 1}})
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
}

export default new Notices()
