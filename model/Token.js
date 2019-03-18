import query from '../mysql'

class Token{
  async getToken (params) {
    const sql = `select * from bbs_token where ?`
    return query(sql, params)
  }
  async setToken (data, params) {
    let search, sql
    try {
      search = await this.getToken([{user_id: data.id}])
    } catch (e) {
      return e
    }
    // 用户不存在则创建一条数据，存在则将原来的token替换掉
    if (search.length === 0) {
      sql = `INSERT INTO bbs_token set ?`
    } else {
      sql = `UPDATE bbs_token set ? where user_id = ?`
    }
    return query(sql, params)
  }
}

export default new Token()
