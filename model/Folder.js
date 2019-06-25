import query from '../mysql'
import Base from './Base'

class Folder extends Base{
  constructor () {
    super()
    this.create = this.create.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)
    this.getRow = this.getRow.bind(this)
    this.getList = this.getList.bind(this)
    this.getTotals = this.getTotals.bind(this)
    this.getAll = this.getAll.bind(this)
  }
  async create (obj) {
    let sql = `INSERT INTO bbs_folder set ${this.joinStr('set', obj.set)};`
    return query(sql)
  }
  async update (obj) {
    let sql = `UPDATE bbs_folder set ${this.joinStr('set', obj.set)} where 1 = 1 ${this.joinStr('get', obj.get)};`
    return query(sql)
  }
  async delete (obj) {
    let sql = `DELETE from bbs_folder where 1 = 1 ${this.joinStr('get', obj.get)};`
    return query(sql)
  }
  async getRow (obj) {
    let sql = `select * from bbs_folder where 1 = 1 ${this.joinStr('get', obj.get)};`
    return query(sql)
  }
  async getList (obj) {
    let curPage = obj.get.curPage, pageSize = obj.get.pageSize
    let sql = `select * from bbs_folder
                where 1 = 1 ${this.joinStr('get', obj.get)} limit ${(curPage - 1) * pageSize}, ${pageSize};`
    return query(sql)
  }
  async getTotals (obj) {
    let sql = `select COUNT(*) as count from bbs_folder where 1 = 1 ${this.joinStr('get', obj.get)};`
    return query(sql)
  }
  async getAll (obj) {
    let sql = `select * from bbs_folder where 1 = 1 ${this.joinStr('get', obj.get)} ORDER BY sort;`
    return query(sql)
  }
}

export default new Folder()
