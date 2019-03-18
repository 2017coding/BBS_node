import mysql from 'mysql'
import query from '../mysql'

class User{
  async registered (params) {
    const sql = `INSERT INTO bbs_user set ${mysql.escape(params)}`
    return query(sql)
  }
  async login (params) {
    const sql = `select * from bbs_user where account = ? and password = ?`
    return query(sql, params)
  }
  async update (params) {
    const sql = 'UPDATE bbs_user set ? where id = ?'
    return query(sql)
  }
  async delete (params) {
    const sql = 'DELETE from bbs_user where id = ?'
    return query(sql)
  }
  async getRow (params) {
    const sql = `select * from bbs_user where ${mysql.escape(params)}`
    return query(sql)
  }
  async getList (curPage, pageSize, params) {
    const sql = `select * from bbs_user where 1=1 ${mysql.escape(params)} limit ${(curPage - 1) * pageSize}, ${pageSize} `
    return query(sql)
  }
  async getAll () {
    const sql = 'select * from bbs_user'
    return query(sql)
  }
  async getTotals (params) {
    const sql = 'select COUNT(*) as count from bbs_user where ?'
    return query(sql)
  }
}

export default new User()
