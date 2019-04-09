import query from '../mysql'
import Base from './Base'

class Menu extends Base{
  constructor () {
    super()
    this.create = this.create.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)
    this.getRow = this.getRow.bind(this)
    this.getList = this.getList.bind(this)
    this.getTotals = this.getTotals.bind(this)
    this.getUserMenu = this.getUserMenu.bind(this)
    this.getAll = this.getAll.bind(this)
  }
  async create (obj) {
    const sql = `INSERT INTO bbs_menu set ${this.joinStr('set', obj.set)}`
    return query(sql)
  }
  async update (obj) {
    const sql = `UPDATE bbs_menu set ${this.joinStr('set', obj.set)} where 1 = 1 ${this.joinStr('get', obj.get)}`
    return query(sql)
  }
  async delete (obj) {
    const sql = `DELETE from bbs_menu where 1 = 1 ${this.joinStr('get', obj.get)}`
    return query(sql)
  }
  async getRow (obj) {
    const sql = `select * from bbs_menu where 1 = 1 ${this.joinStr('get', obj.get)}`
    return query(sql)
  }
  async getList (obj) {
    let curPage = obj.get.curPage, pageSize = obj.get.pageSize
    const sql = `select * from bbs_menu
                where 1 = 1 ${this.joinStr('get', obj.get)} limit ${(curPage - 1) * pageSize}, ${pageSize} `
    return query(sql)
  }
  async getTotals (obj) {
    const sql = `select COUNT(*) as count from bbs_menu where 1 = 1 ${this.joinStr('get', obj.get)}`
    return query(sql)
  }
  async getUserMenu (obj) {
    const sql = `select a.* from bbs_menu as a
                LEFT JOIN bbs_role_menu as b
                ON a.id = b.menu_id where 1 = 1 ${this.joinStr('get', obj.get)}`
    return query(sql)
  }
  async getAll (obj) {
    const sql = `select * from bbs_menu where 1 = 1 ${this.joinStr('get', obj.get)} ORDER BY sort`
    return query(sql)
  }
}

export default new Menu()
