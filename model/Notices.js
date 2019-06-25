import query from '../mysql'
import Base from './Base'

class Notices extends Base{
  constructor () {
    super()
    this.setNotices = this.setNotices.bind(this)
    this.getNotices = this.getNotices.bind(this)
  }
  async setNotices (obj) {
    const setData = {
      status: 0,
      update_user: obj.set.create_user,
      update_time: new Date()
    }
    // 将当前所有数据状态置为0
    const sql1 = `UPDATE bbs_notices set ${this.joinStr('set', setData)} where 1 = 1 ${this.joinStr('get', obj.get)};`
    // 添加新数据
    const sql2 = `INSERT INTO bbs_notices set ${this.joinStr('set', obj.set)};`
    // 事务开始
    await query('begin;')
    const result1 = await query(sql1)
    const result2 = await query(sql2)
    if (result1.affectedRows >= 0 && result2.affectedRows) {
      // 事务提交
      await query('commit;')
    } else {
      // 事务回滚
      await query('rollback;')
    }
    return result1.affectedRows >= 0 && result2.affectedRows
  }
  async getNotices (obj) {
    let sql = `select * from bbs_notices where 1 = 1 ${this.joinStr('get', obj.get)};`
    return query(sql)
  }
}

export default new Notices()
