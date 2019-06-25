import query from '../mysql'
import Base from './Base'

class Log extends Base{
  constructor () {
    super()
    this.writeLog = this.writeLog.bind(this)
    this.getList = this.getList.bind(this)
    this.getTotals = this.getTotals.bind(this)
    this.getLoginLog = this.getLoginLog.bind(this)
  }
  async writeLog (obj) {
    let sql = `INSERT INTO bbs_log set ${this.joinStr('set', obj.set)}`
    return query(sql)
  }
  async getList (obj) {
    let curPage = obj.get.curPage, pageSize = obj.get.pageSize
    let sql = `select a.*, b.name as create_user_name from bbs_log as a
              LEFT JOIN bbs_user as b ON a.create_user = b.id
              where 1 = 1 ${this.joinStr('get', obj.get)} ${this.joinStr('ORDER BY', {DESC: ['create_time', 'id']})} limit ${(curPage - 1) * pageSize}, ${pageSize};`
    // 处理表连接字段 
    sql = sql.replace(/`type`/, 'a.type')
    return query(sql)
  }
  async getTotals (obj) {
    let sql = `select COUNT(*) as count from bbs_log where 1 = 1 ${this.joinStr('get', obj.get)};`
    return query(sql)
  }
  async getLoginLog (obj) {
    let sql = `select create_time as time from bbs_log where 1 = 1 ${this.joinStr('get', obj.get)};`
    return query(sql)
  }
}

export default new Log()
