import Base from './Base'

class TagRelation extends Base{
  constructor () {
    super()
    this.setBindTag = this.setBindTag.bind(this)
    this.getBindTag = this.getBindTag.bind(this)
  }
  async setBindTag (req, res, next) {
    next()
  }
  async getBindTag (req, res, next) {
    next()
  }
}

export default new TagRelation()
