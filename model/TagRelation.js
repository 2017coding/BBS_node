import mysql from 'mysql'
import query from '../mysql'
import Base from './Base'


class TagRelation extends Base {
  constructor () {
    super()
    this.setBindTag = this.setBindTag.bind(this)
    this.getBindTag = this.getBindTag.bind(this)
  }
  // 设置标签类型绑定的标签
  async setBindTag (obj) {
    let dbTags, paramsTags = obj.data.tags || [],
        createTagList = [], deleteTagList = [], sql1, sql2,
        result1, result2
    // 先查询到当前标签类型下所有的标签
    dbTags = await query(`select a.tag_id from bbs_tag_type_tag as a where 1 = 1 ${this.joinStr('get', obj.get)};`)
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
        createTagList.push([obj.get.tag_type_id, item])
      }
    })
    // 事务开始
    await query('begin')
    // 删除
    sql1 = `DELETE from bbs_tag_type_tag where tag_id in (${mysql.escape(deleteTagList)}) and tag_type_id = ${obj.get.tag_type_id};`
    // 添加
    sql2 = `INSERT INTO bbs_tag_type_tag (tag_type_id, tag_id) VALUES ${mysql.escape(createTagList)};`
    // 运行sql
    result1 = mysql.escape(deleteTagList) ? await query(sql1) : {affectedRows: true}
    result2 = mysql.escape(createTagList) ? await query(sql2) : {affectedRows: true}
    if (result1.affectedRows >= 0 && result2.affectedRows) {
      // 事务提交
      await query('commit')
    } else {
      // 事务回滚
      await query('rollback')
    }
    return result1.affectedRows >= 0 && result2.affectedRows
  }
  // 获取标签类型绑定的标签
  async getBindTag (obj) {
    let sql = `select tag_id from bbs_tag_type_tag where 1 = 1 ${this.joinStr('get', obj.get)};`
    return query(sql)
  }
}

export default new TagRelation()
