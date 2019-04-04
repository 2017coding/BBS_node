import query from '../mysql'
import Base from './Base'

class ModData extends Base{
  constructor () {
    super()
    this.create = this.create.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)
    this.getRow = this.getRow.bind(this)
    this.getList = this.getList.bind(this)
    this.getTotals = this.getTotals.bind(this)
    this.getUserDataControl = this.getUserDataControl.bind(this)
    this.getAll = this.getAll.bind(this)
  }
  async create (obj) {
    const sql = `INSERT INTO bbs_data_control set ${this.joinStr('set', obj.set)}`
    return query(sql)
  }
  async update (obj) {
    const sql = `UPDATE bbs_data_control set ${this.joinStr('set', obj.set)} where 1 = 1 ${this.joinStr('get', obj.get)}`
    return query(sql)
  }
  async delete (obj) {
    const sql = `DELETE from bbs_data_control where 1 = 1 ${this.joinStr('get', obj.get)}`
    return query(sql)
  }
  async getRow (obj) {
    const sql = `select * from bbs_data_control where 1 = 1 ${this.joinStr('get', obj.get)}`
    return query(sql)
  }
  async getList (obj) {
    let curPage = obj.get.curPage, pageSize = obj.get.pageSize
    const sql = `select * from bbs_data_control
                where 1 = 1 ${this.joinStr('get', obj.get)} limit ${(curPage - 1) * pageSize}, ${pageSize} `
    return query(sql)
  }
  async getTotals (obj) {
    const sql = `select COUNT(*) as count from bbs_data_control where 1 = 1 ${this.joinStr('get', obj.get)}`
    return query(sql)
  }
  async getUserDataControl (obj) {
    const sql = `select a.* from bbs_data_control as a
                LEFT JOIN bbs_role_data_permissions as b
                ON a.id = b.data_permissions_id where 1 = 1 ${this.joinStr('get', obj.get)}`
    return query(sql)
  }
  async getAll (obj) {
    const sql = `select * from bbs_data_control where 1 = 1 ${this.joinStr('get', obj.get)}`
    return query(sql)
  }
}

export default new ModData()
