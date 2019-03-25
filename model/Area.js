import query from '../mysql'
import Base from './Base'

class Area extends Base{
  constructor () {
    super()
    this.update = this.update.bind(this)
    this.getList = this.getList.bind(this)
    this.getTotals = this.getTotals.bind(this)
    this.getAll = this.getAll.bind(this)
  }
  async update (obj) {
    const sql = `UPDATE bbs_area set ${this.joinStr('set', obj.set)} where 1 = 1 ${this.joinStr('get', obj.get)}`
    return query(sql)
  }
  async getList (obj) {
    let curPage = obj.get.curPage, pageSize = obj.get.pageSize
    const sql = `select * from bbs_area where 1 = 1 ${this.joinStr('get', obj.get)} limit ${(curPage - 1) * pageSize}, ${pageSize} `
    return query(sql)
  }
  async getTotals (obj) {
    const sql = `select COUNT(*) as count from bbs_area where 1 = 1 ${this.joinStr('get', obj.get)}`
    return query(sql)
  }
  async getAll (obj) {
    const sql = `select * from bbs_area where 1 = 1 ${this.joinStr('get', obj.get)}`
    return query(sql)
  }
}

export default new Area()
