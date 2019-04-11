import query from '../mysql'
import Base from './Base'

class Log extends Base{
  constructor () {
    super()
    this.writeLog = this.writeLog.bind(this)
    this.getList = this.getList.bind(this)
    this.getTotals = this.getTotals.bind(this)
  }
  async writeLog (obj) {
    let sql = `INSERT INTO bbs_log set ${this.joinStr('set', obj.set)}`
    return query(sql)
  }
  async getList (obj) {
    let curPage = obj.get.curPage, pageSize = obj.get.pageSize
    let sql = `select * from bbs_log where 1 = 1 ${this.joinStr('get', obj.get)} ${this.joinStr('ORDER BY', {DESC: ['create_time', 'id']})} limit ${(curPage - 1) * pageSize}, ${pageSize}`
    return query(sql)
  }
  async getTotals (obj) {
    let sql = `select COUNT(*) as count from bbs_log where 1 = 1 ${this.joinStr('get', obj.get)}`
    return query(sql)
  }
}

export default new Log()
