import query from '../mysql'
import Base from './Base'

class Notice extends Base{
  constructor () {
    super()
    this.create = this.create.bind(this)
  }
  async setNotice (obj) {
    let sql = `UPDATE bbs_tech_square set ${this.joinStr('set', obj.set)} where 1 = 1 ${this.joinStr('get', obj.get)}`
    return query(sql)
  }
}

export default new Notice()
