import query from '../mysql'
import Base from './Base'
import JWT from 'jsonwebtoken'

class Token extends Base{
  constructor () {
    super()
    this.getToken = this.getToken.bind(this)
    this.setToken = this.setToken.bind(this)
  }
  async getToken (obj) {
    let sql = `select * from bbs_token where 1 = 1 ${this.joinStr('get', obj.get)};`
    return query(sql)
  }
  async setToken (data, obj) {
    let search, sql, newUserInfo = JSON.parse(JSON.stringify(data)), oldUserInfo = {}
    try {
      search = await this.getToken({get: {user_id: data.id}})
    } catch (e) {
      return e
    }
    // 用户不存在则创建一条数据，存在则将原来的token替换掉
    if (search.length === 0) {
      sql = `INSERT INTO bbs_token set ${this.joinStr('set', obj.set)};`
    } else {
      // 解析token和当前数据做对比
      JWT.verify(search[0][data.type + '_token'], 'BBS', (error, decoded) => {
        if (error) {
          return {}
        }
        oldUserInfo = decoded
      })
      // 用户数据发生变化，重新设置数据信息，只修改token
      delete newUserInfo[data.type + '_expire_time']
      delete oldUserInfo[data.type + '_expire_time']
      delete oldUserInfo.iat
      if (JSON.stringify(newUserInfo) !== JSON.stringify(oldUserInfo)) {
        obj.set = {
          [data.type + '_token']: obj.set[data.type + '_token']
        }
        sql = `UPDATE bbs_token set ${this.joinStr('set', obj.set)} where 1 = 1 ${this.joinStr('get', obj.get)};`
      } else if(+new Date(search[0][data.type + '_expire_time']) > +new Date()) {
        // 数据未过期，不处理
        sql = ``
      } else {
        sql = `UPDATE bbs_token set ${this.joinStr('set', obj.set)} where 1 = 1 ${this.joinStr('get', obj.get)};`
      }
    }
    return sql ? query(sql) : ''
  }
}

export default new Token()
