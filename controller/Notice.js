import Base from './Base'
import NoticeMolde from '../model/Notice'

class Notice extends Base {
  constructor () {
    super()
    this.setNotice = this.setNotice.bind(this)
  }
  // 设置通知
  async setNotice (req, res, next) {
    let id = req.body.id,
        data = JSON.parse(JSON.stringify(req.body)),
        result,
        search,
        userInfo = await this.getUserInfo(req)
        // 参数处理
        data.update_user = userInfo.id
        data.update_time = new Date()
        delete data.id
    try {
      result = await NoticeMolde.setNotice({set: data})
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
}

export default new Notice()
