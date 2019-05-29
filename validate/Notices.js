import Base from './Base'

class Notices extends Base{
  constructor () {
    super()
    this.setNotices = this.setNotices.bind(this)
    this.getNotices = this.getNotices.bind(this)
  }
  async setNotices (req, res, next) {
    next()
  }
  async getNotices (req, res, next) {
    next()
  }
}

export default new Notices()
