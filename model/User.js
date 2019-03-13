import query from '../mysql'

class User{
  async registered (params) {
    const sql = 'INSERT INTO bbs_user set ?'
    return query(sql, params)
  }
  async login (params) {
    const sql = `select * from bbs_user where account = ? and password = ?`
    return query(sql, params)
  }
  async update (params) {
    const sql = 'UPDATE bbs_user set ? where id = ?'
    return query(sql, params)
  }
  async delete (params) {
    const sql = 'DELETE from bbs_user where id = ?'
    return query(sql, params)
  }
  async getRow (key, params) {
    const sql = `select * from bbs_user where ${key} = ?`
    return query(sql, params)
  }
  async getList (curPage, pageSize, params) {
    const sql = `select * from bbs_user where ? limit ${(curPage - 1) * pageSize}, ${pageSize}`
    return query(sql, params)
  }
  async getAll () {
    const sql = 'select * from bbs_user'
    return query(sql)
  }
  async getTotals (params) {
    const sql = 'select COUNT(*) as count from bbs_user where ?'
    return query(sql, params)
  }
}

export default new User()
