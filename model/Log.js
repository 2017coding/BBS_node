import query from '../mysql'
import Base from './Base'

class Log extends Base{
  constructor () {
    super()
    this.writeLog = this.writeLog.bind(this)
    this.getList = this.getList.bind(this)
  }
  async writeLog (obj) {
    const sql = `INSERT INTO bbs_log set ${this.joinStr('set', obj.set)}`
    return query(sql)
  }
  async getList (curPage, pageSize, obj) {
    const sql = `select * from bbs_log where 1 = 1 ${this.joinStr('get', obj.get)} limit ${(curPage - 1) * pageSize}, ${pageSize} `
    return query(sql)
  }
  async getTotals (obj) {
    const sql = `select COUNT(*) as count from bbs_log where 1 = 1 ${this.joinStr('get', obj.get)}`
    return query(sql)
  }
}

export default new Log()
