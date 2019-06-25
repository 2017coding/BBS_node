import query from '../mysql'
import Base from './Base'

class TechSquare extends Base{
  constructor () {
    super()
    this.create = this.create.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)
    this.getRow = this.getRow.bind(this)
    this.getList = this.getList.bind(this)
    this.getTotals = this.getTotals.bind(this)
    this.getAll = this.getAll.bind(this)
  }
  async create (obj) {
    let sql = `INSERT INTO bbs_tech_square set ${this.joinStr('set', obj.set)};`
    return query(sql)
  }
  async update (obj) {
    let sql = `UPDATE bbs_tech_square set ${this.joinStr('set', obj.set)} where 1 = 1 ${this.joinStr('get', obj.get)};`
    return query(sql)
  }
  async delete (obj) {
    let sql = `DELETE from bbs_tech_square where 1 = 1 ${this.joinStr('get', obj.get)};`
    return query(sql)
  }
  async getRow (obj) {
    let sql = `select * from bbs_tech_square where 1 = 1 ${this.joinStr('get', obj.get)};`
    return query(sql)
  }
  async getList (obj) {
    let curPage = obj.get.curPage, pageSize = obj.get.pageSize
    let sql = `select * from bbs_tech_square
                where 1 = 1 ${this.joinStr('get', obj.get)} ORDER BY sort limit ${(curPage - 1) * pageSize}, ${pageSize};`
    return query(sql)
  }
  async getTotals (obj) {
    let sql = `select COUNT(*) as count from bbs_tech_square where 1 = 1 ${this.joinStr('get', obj.get)};`
    return query(sql)
  }
  async getAll (obj) {
    let sql = `select a.*, b.icon as image, b.name as title from bbs_tech_square as a
              left join bbs_tag_type as b on a.tag_type_id = b.id
              where 1 = 1 ${this.joinStr('get', obj.get)} ORDER BY sort;`
    // 处理表连接字段
    sql = sql.replace(/`status`/, 'a.status')
    sql = sql.replace(/`flag`/, 'a.flag')
    return query(sql)
  }
}

export default new TechSquare()
