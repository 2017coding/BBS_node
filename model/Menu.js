import query from '../mysql'
import Base from './Base'

class Menu extends Base{
  constructor () {
    super()
    this.create = this.create.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)
    this.getRow = this.getRow.bind(this)
    this.getRoleMenu = this.getRoleMenu.bind(this)
    this.getAll = this.getAll.bind(this)
  }
  async create (obj) {
    let sql = `INSERT INTO bbs_menu set ${this.joinStr('set', obj.set)};`
    return query(sql)
  }
  async update (obj) {
    let sql = `UPDATE bbs_menu set ${this.joinStr('set', obj.set)} where 1 = 1 ${this.joinStr('get', obj.get)};`
    return query(sql)
  }
  async delete (obj) {
    let sql = `DELETE from bbs_menu where 1 = 1 ${this.joinStr('get', obj.get)};`
    return query(sql)
  }
  async getRow (obj) {
    let sql = `select * from bbs_menu where 1 = 1 ${this.joinStr('get', obj.get)};`
    return query(sql)
  }
  async getList (obj) {
    let curPage = obj.get.curPage, pageSize = obj.get.pageSize
    let sql = `select * from bbs_menu
                where 1 = 1 ${this.joinStr('get', obj.get)} limit ${(curPage - 1) * pageSize}, ${pageSize};`
    return query(sql)
  }
  async getTotals (obj) {
    let sql = `select COUNT(*) as count from bbs_menu where 1 = 1 ${this.joinStr('get', obj.get)};`
    return query(sql)
  }
  async getRoleMenu (obj) {
    let sql = `select a.* from bbs_menu as a
                LEFT JOIN bbs_role_menu as b
                ON a.id = b.menu_id where 1 = 1 ${this.joinStr('get', obj.get)};`
    // admin则获取所有数据
    if (+obj.get.role_id === 1) {
      delete obj.get.role_id
      sql = `select * from bbs_menu where 1 = 1 ${this.joinStr('get', obj.get)};`
    }
    return query(sql)
  }
  async getAll (obj) {
    let sql = `select a.*, b.name as create_user_name, c.name as update_user_name from bbs_menu as a
                left join bbs_user as b on a.create_user = b.id
                left join bbs_user as c on a.update_user = c.id
                where 1 = 1 ${this.joinStr('get', obj.get)} ORDER BY sort;`
    // 处理表连接字段
    sql = sql.replace(/`type`/, 'a.type')
    sql = sql.replace(/`flag`/, 'a.flag')
    return query(sql)
  }
}

export default new Menu()
