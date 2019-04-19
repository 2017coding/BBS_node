import query from '../mysql'
import Base from './Base'

class Library extends Base{
  constructor () {
    super()
    this.create = this.create.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)
    this.getRow = this.getRow.bind(this)
    this.getList = this.getList.bind(this)
    this.getTotals = this.getTotals.bind(this)
    this.getRoleLibrary = this.getRoleLibrary.bind(this)
    this.getAll = this.getAll.bind(this)
  }
  async create (obj) {
    let sql = `INSERT INTO bbs_file set ${this.joinStr('set', obj.set)}`
    return query(sql)
  }
  async update (obj) {
    let sql = `UPDATE bbs_file set ${this.joinStr('set', obj.set)} where 1 = 1 ${this.joinStr('get', obj.get)}`
    return query(sql)
  }
  async delete (obj) {
    let sql = `DELETE from bbs_file where 1 = 1 ${this.joinStr('get', obj.get)}`
    return query(sql)
  }
  async getRow (obj) {
    let sql = `select * from bbs_file where 1 = 1 ${this.joinStr('get', obj.get)}`
    return query(sql)
  }
  async getList (obj) {
    let curPage = obj.get.curPage, pageSize = obj.get.pageSize
    let sql = `select * from bbs_file
                where 1 = 1 ${this.joinStr('get', obj.get)} ${this.joinStr('ORDER BY', {DESC: ['create_time', 'id']})} limit ${(curPage - 1) * pageSize}, ${pageSize} `
    return query(sql)
  }
  async getTotals (obj) {
    let sql = `select COUNT(*) as count from bbs_file where 1 = 1 ${this.joinStr('get', obj.get)}`
    return query(sql)
  }
  async getRoleLibrary (obj) {
    let sql = `select a.* from bbs_file as a
                LEFT JOIN bbs_role_Library as b
                ON a.id = b.Library_id where 1 = 1 ${this.joinStr('get', obj.get)}`
    // admin则获取所有数据
    if (+obj.get.role_id === 1) {
      sql = `select * from bbs_file`
    }
    return query(sql)
  }
  async getAll (obj) {
    let sql = `select a.*, b.name as create_user_name, c.name as update_user_name from bbs_file as a
                left join bbs_user as b on a.create_user = b.id
                left join bbs_user as c on a.update_user = c.id
                where 1 = 1 ${this.joinStr('get', obj.get)} ORDER BY sort`
    // 处理表连接字段
    sql = sql.replace(/`type`/, 'a.type')
    sql = sql.replace(/`name`/, 'a.name')
    sql = sql.replace(/`flag`/, 'a.flag')
    return query(sql)
  }
}

export default new Library()
