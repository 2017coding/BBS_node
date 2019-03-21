import query from '../mysql'
import Base from './Base'

class User extends Base{
  constructor () {
    super()
    this.registered = this.registered.bind(this)
    this.login = this.login.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)
    this.getRow = this.getRow.bind(this)
    this.getList = this.getList.bind(this)
    this.getAll = this.getAll.bind(this)
    this.getTotals = this.getTotals.bind(this)
  }
  async registered (obj) {
    const sql = `INSERT INTO bbs_user set ${this.joinStr('set', obj.set)}`
    return query(sql)
  }
  async login (obj) {
    const sql = `select * from bbs_user where 1 = 1 ${this.joinStr('get', obj.get)}`
    return query(sql)
  }
  async update (obj) {
    const sql = `UPDATE bbs_user set ${this.joinStr('set', obj.set)} where 1 = 1 ${this.joinStr('get', obj.get)}`
    return query(sql)
  }
  async delete (obj) {
    const sql = `DELETE from bbs_user where 1 = 1 ${this.joinStr('get', obj.get)}`
    return query(sql)
  }
  async getRow (obj) {
    const sql = `select * from bbs_user where 1 = 1 ${this.joinStr('get', obj.get)}`
    return query(sql)
  }
  async getList (curPage, pageSize, obj) {
    // const sql = `select a.*, b.account as create_user_name, c.account as update_user_name from bbs_user as a 
    //             left join bbs_user as b on a.id = b.create_user
    //             left join bbs_user as c on a.id = c.update_user
    //             where 1 = 1 ${this.joinStr('get', obj.get)} limit ${(curPage - 1) * pageSize}, ${pageSize} `
    const sql = `select * from bbs_user
                where 1 = 1 ${this.joinStr('get', obj.get)} limit ${(curPage - 1) * pageSize}, ${pageSize} `
    return query(sql)
  }
  async getAll () {
    const sql = `select * from bbs_user`
    return query(sql)
  }
  async getTotals (obj) {
    const sql = `select COUNT(*) as count from bbs_user where 1 = 1 ${this.joinStr('get', obj.get)}`
    return query(sql)
  }
}

export default new User()
