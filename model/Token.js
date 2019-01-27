import query from '../mysql'

class Token{
  async getToken (key, value) {
    const sql = `select * from bbs_token where ${key} = ${value}`
    return query(sql)
  }
  async setToken (params) {
    let search, sql
    try {
      search = await this.getToken('user_id', params.id)
    } catch (e) {

    }
    // 用户不存在则创建一条数据，存在则将原来的token替换掉
    if (search.length === 0) {
      sql = 'INSERT INTO bbs_user set ?'
    } else {
      sql = 'UPDATE bbs_user set ? where id = ?'
    }
    return query(sql, params)
  }
}

export default new Token()
