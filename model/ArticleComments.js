import query from '../mysql'
import Base from './Base'

class ArticleComments extends Base{
  constructor () {
    super()
    this.create = this.create.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)
    this.getTotals = this.getTotals.bind(this)
    this.getAll = this.getAll.bind(this)
  }
  async create (obj) {
    let sql = `INSERT INTO bbs_article_comments set ${this.joinStr('set', obj.set)};`
    return query(sql)
  }
  async update (obj) {
    let sql = `UPDATE bbs_article_comments set ${this.joinStr('set', obj.set)} where 1 = 1 ${this.joinStr('get', obj.get)};`
    return query(sql)
  }
  async delete (obj) {
    let sql = `DELETE from bbs_article_comments where 1 = 1 ${this.joinStr('get', obj.get)};`
    return query(sql)
  }
  async getTotals (obj) {
    let sql = `select COUNT(*) as count from bbs_article_comments where 1 = 1 ${this.joinStr('get', obj.get)}`
    return query(sql)
  }
  async getAll (obj) {
    let sql = `select a.*, b.name as replier_name, b.avatar, c.name as by_replier_name from bbs_article_comments as a
    left join bbs_user as b on a.create_user = b.id
    left join bbs_user as c on a.p_user_id = c.id
    where 1 = 1 ${this.joinStr('get', obj.get)} ORDER BY create_time DESC`
    // 处理表连接字段
    // sql = sql.replace(/`id`/, 'a.id')
    sql = sql.replace(/`flag`/, 'a.flag')
    return query(sql)
  }
}

export default new ArticleComments()
