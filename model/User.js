import query from '../mysql'

class User{
  async registered (param) {
    const sql = 'INSERT INTO bbs_user set ?'
    return query(sql, param)
  }
  async login (account, password) {
    const sql = `select * from bbs_user where account = '${account}' and password = '${password}'`
    return query(sql)
  }
  async update (param) {
    const sql = 'UPDATE bbs_user set ? where id = ?'
    return query(sql, param)
  }
  async delete (param) {
    const sql = 'DELETE from bbs_user where id = ?'
    return query(sql, param)
  }
  async getRow (param) {
    const sql = 'select * from bbs_user where account = ?'
    return query(sql, param)
  }
  async getList (curPage, pageSize) {
    const sql = `select * from bbs_user limit ${(curPage - 1) * pageSize}, ${pageSize}`
    return query(sql)
  }
  async getAll () {
    const sql = 'select * from bbs_user'
    return query(sql)
  }
  async getTotals () {
    const sql = 'select COUNT(*) as count from bbs_user'
    return query(sql)
  }
}

export default new User()
