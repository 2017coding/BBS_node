import mysql from 'mysql'
import query from '../mysql'
import Base from './Base'

class Article extends Base{
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
    let sql1, sql2, result1, result2, createList = []
    // 事务开始
    await query('begin')
    sql1 = `INSERT INTO bbs_article set ${this.joinStr('set', obj.set)};`
    // 运行sql
    result1 = await query(sql1)
    // 插入成功获取到ID
    if (result1.affectedRows) {
      createList = obj.tags.map(item => {
        return [
          result1.insertId,
          item
        ]
      })
    }
    // 文章标签表数据插入
    sql2 = `INSERT INTO bbs_article_tag (article_id, tag_id) VALUES ${mysql.escape(createList)};`
    result2 = mysql.escape(createList) ? await query(sql2) : {affectedRows: true}
    if (result2.affectedRows) {
      // 事务提交
      await query('commit')
    } else {
      // 事务回滚
      await query('rollback')
    }
    return result1
  }
  async update (obj) {
    let dbTags, paramsTags = obj.tags || [],
        createTagList = [], deleteTagList = [], sql1, sql2, sql3,
        result1, result2, result3
    // 先查询到当前文章下所有的标签
    dbTags = await query(`select tag_id from bbs_article_tag as a where 1 = 1 ${this.joinStr('get', {article_id: obj.get.id})};`)
    // 得到数据库的ID列表
    dbTags = dbTags.map(item => item.tag_id)
    // 数据库数据和传入数据做对比，数据库有而传入没有的数据删除，传入而数据库没有的数据添加
    dbTags.forEach(item => {
      // 需要删除菜单的数据
      if (!paramsTags.includes(item)) {
        deleteTagList.push(item)
      }
    })
    paramsTags.forEach(item => {
      // 需要添加菜单的数据
      if (!dbTags.includes(item)) {
        createTagList.push([obj.get.id, item])
      }
    })
    // 事务开始
    await query('begin')
    // 删除
    sql1 = `DELETE from bbs_article_tag where tag_id in (${mysql.escape(deleteTagList)}) and article_id = ${obj.get.id};`
    // 添加
    sql2 = `INSERT INTO bbs_article_tag (article_id, tag_id) VALUES ${mysql.escape(createTagList)};`
    // 更新文章
    sql3 = `UPDATE bbs_article set ${this.joinStr('set', obj.set)} where 1 = 1 ${this.joinStr('get', obj.get)};`
    // 运行sql
    result1 = mysql.escape(deleteTagList) ? await query(sql1) : {affectedRows: true}
    result2 = mysql.escape(createTagList) ? await query(sql2) : {affectedRows: true}
    result3 = await query(sql3)
    if (result1.affectedRows >= 0 && result2.affectedRows && result3.affectedRows) {
      // 事务提交
      await query('commit;')
    } else {
      // 事务回滚
      await query('rollback;')
    }
    return result1.affectedRows >= 0 && result2.affectedRows && result3.affectedRows
  }
  async delete (obj) {
    let sql = `DELETE from bbs_article where 1 = 1 ${this.joinStr('get', obj.get)};`
    return query(sql)
  }
  async getRow (obj) {
    let sql = `select a.*, b.name as create_user_name, b.avatar, GROUP_CONCAT(d.id) as tag_id, GROUP_CONCAT(d.name) as tag_name from bbs_article as a
                left join bbs_user as b on a.create_user = b.id
                left join bbs_article_tag as c on a.id = c.article_id
                left join bbs_tag as d on c.tag_id = d.id
                where 1 = 1 ${this.joinStr('get', obj.get)} Group by article_id;`
    // 处理表连接字段
    sql = sql.replace(/`id`/, 'a.id')
    sql = sql.replace(/`flag`/, 'a.flag')
    return query(sql)
  }
  async getList (obj) {
    let curPage = obj.get.curPage, pageSize = obj.get.pageSize
    let sql = `select a.*, b.name as create_user_name, b.avatar, GROUP_CONCAT(d.id) as tag_id, GROUP_CONCAT(d.name) as tag_name from bbs_article as a
                left join bbs_user as b on a.create_user = b.id
                left join bbs_article_tag as c on a.id = c.article_id
                left join bbs_tag as d on c.tag_id = d.id
                where 1 = 1 ${this.joinStr('get', obj.get)} AND a.flag <> 0 Group by article_id ${this.joinStr('ORDER BY', {DESC: ['create_time', 'id']})} limit ${(curPage - 1) * pageSize}, ${pageSize}; `
    // 处理表连接字段
    sql = sql.replace(/`flag`/, 'a.flag')
    sql = sql.replace(/`type`/, 'a.type')
    return query(sql)
  }
  async getTotals (obj) {
    let sql = `select COUNT(*) as count from bbs_article where 1 = 1 ${this.joinStr('get', obj.get)} AND flag <> 0;`
    return query(sql)
  }
  async getAll (obj) {
    let sql = `select a.*, b.name as create_user_name, c.name as update_user_name from bbs_article as a
                left join bbs_user as b on a.create_user = b.id
                left join bbs_user as c on a.update_user = c.id
                where 1 = 1 ${this.joinStr('get', obj.get)}`
    // 处理表连接字段
    sql = sql.replace(/`flag`/, 'a.flag')
    sql = sql.replace(/`create_user`/, 'a.create_user')
    sql = sql.replace(/`name`/, 'a.name')
    return query(sql)
  }
}

export default new Article()
