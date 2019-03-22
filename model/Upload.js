import query from '../mysql'
import Base from './Base'

class Upload extends Base{
  constructor () {
    super()
    this.image = this.image.bind(this)
    this.file = this.file.bind(this)
  }
  async image (obj) {
    return query(sql)
  }
  async file (data, obj) {
    return query(sql)
  }
}

export default new Upload()
