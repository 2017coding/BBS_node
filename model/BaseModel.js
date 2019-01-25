import query from '../mysql'

class User{
  async registered (param) {
    const sql = 'select * from bbs_user where id = 1'
    return query(sql)
  }
  async login (param) {
    const sql = 'select * from bbs_user where id = 1'
    return query(sql)
  }
  async getRow (param) {
    const sql = 'select * from bbs_user where id = 1'
    return query(sql)
  }
  async getList (param) {
    const sql = 'select * from bbs_user where id = 1'
    return query(sql)
  }
  async delete (param) {
    const sql = 'select * from bbs_user where id = 1'
    return query(sql)
  }
}

export default new User()