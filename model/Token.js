import query from '../mysql'
import Base from './Base'

class Token extends Base{
  constructor () {
    super()
    this.getToken = this.getToken.bind(this)
    this.setToken = this.setToken.bind(this)
  }
  async getToken (obj) {
    const sql = `select * from bbs_token where 1 = 1 ${this.joinStr('get', obj.get)}`
    return query(sql)
  }
  async setToken (data, obj) {
    let search, sql
    try {
      search = await this.getToken({get: {user_id: data.id}})
    } catch (e) {
      return e
    }
    // 用户不存在则创建一条数据，存在则将原来的token替换掉
    if (search.length === 0) {
      sql = `INSERT INTO bbs_token set ${this.joinStr('set', obj.set)}`
    } else {
      // 过期时间大于当前时间，不处理
      if (+new Date(data[data.type + '_expire_time']) > +new Date()) {
        sql = ``
      } else {
        sql = `UPDATE bbs_token set ${this.joinStr('set', obj.set)} where 1 = 1 ${this.joinStr('get', obj.get)}`
      }
    }
    return sql ? query(sql) : ''
  }
}

export default new Token()
