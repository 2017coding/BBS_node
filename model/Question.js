import query from '../mysql'
import Base from './Base'

class Questions extends Base{
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
    let sql = `INSERT INTO bbs_questions set ${this.joinStr('set', obj.set)};`
    return query(sql)
  }
  async update (obj) {
    let sql = `UPDATE bbs_questions set ${this.joinStr('set', obj.set)} where 1 = 1 ${this.joinStr('get', obj.get)};`
    return query(sql)
  }
  async delete (obj) {
    let sql = `DELETE from bbs_questions where 1 = 1 ${this.joinStr('get', obj.get)};`
    return query(sql)
  }
  async getRow (obj) {
    let sql = `select * from bbs_questions where 1 = 1 ${this.joinStr('get', obj.get)};`
    return query(sql)
  }
  async getList (obj) {
    let curPage = obj.get.curPage, pageSize = obj.get.pageSize
    let sql = `select * from bbs_questions
                where 1 = 1 ${this.joinStr('get', obj.get)} ${this.joinStr('ORDER BY', {DESC: ['create_time', 'id']})} limit ${(curPage - 1) * pageSize}, ${pageSize};`
    return query(sql)
  }
  async getTotals (obj) {
    let sql = `select COUNT(*) as count from bbs_questions where 1 = 1 ${this.joinStr('get', obj.get)};`
    return query(sql)
  }
  async getAll (obj) {
    let sql = `select a.*, b.name as create_user_name, c.name as update_user_name from bbs_questions as a
                left join bbs_user as b on a.create_user = b.id
                left join bbs_user as c on a.update_user = c.id
                where 1 = 1 ${this.joinStr('get', obj.get)}`
    // 处理表连接字段
    sql = sql.replace(/`flag`/, 'a.flag')
    sql = sql.replace(/`create_user`/, 'a.create_user')
    sql = sql.replace(/`name`/, 'a.name')
    return query(sql)
  }
}

export default new Questions()
