import Base from './Base'

class Upload extends Base {
  constructor () {
    super()
    this.image = this.image.bind(this)
    this.file = this.file.bind(this)
  }
  // 上传图片
  async image (req, res, next) {
  }
  // 上传文件
  async file (req, res, next) {
  }
}

export default new Upload()
