import Base from './Base'
import TagRelationModel from '../model/TagRelation'


class TagRelation extends Base {
  constructor () {
    super()
    this.setBindTag = this.setBindTag.bind(this)
    this.getBindTag = this.getBindTag.bind(this)
  }
  // 设置标签类型绑定的标签
  async setBindTag (req, res, next) {
    let userInfo = await this.getUserInfo(req), result,
        data = req.body
    try {
      result = await TagRelationModel.setBindTag({
        get: {tag_type_id: data.tagTypeId},
        data: {
          tags: data.tags
        }
      })
    } catch (e) {
      this.handleException(req, res, e)
      return
    }
    if (result) {
      res.json({
        code: 20000,
        success: true,
        content: {},
        message: '操作成功'
      })
    } else {
      res.json({
        code: 20001,
        success: false,
        content: {},
        message: '操作失败'
      })
    }
  }
  // 获取标签类型绑定的标签
  async getBindTag (req, res, next) {
    let tag_type_id = req.query.tagTypeId, result
    try {
      result = await TagRelationModel.getBindTag({get: {tag_type_id}})
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

export default new TagRelation()
