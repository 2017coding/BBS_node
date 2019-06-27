import mysql from 'mysql'
import query from '../mysql'
import Base from './Base'

class User extends Base{
  constructor () {
    super()
    this.registered = this.registered.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)
    this.getRow = this.getRow.bind(this)
    this.getList = this.getList.bind(this)
    this.getTotals = this.getTotals.bind(this)
    this.getAll = this.getAll.bind(this)
  }
  async registered (obj) {
    let sql = `INSERT INTO bbs_user set ${this.joinStr('set', obj.set)};`
    return query(sql)
  }
  async update (obj) {
    let sql = `UPDATE bbs_user set ${this.joinStr('set', obj.set)} where 1 = 1 ${this.joinStr('get', obj.get)};`
    return query(sql)
  }
  async delete (obj) {
    let sql = `DELETE from bbs_user where 1 = 1 ${this.joinStr('get', obj.get)};`
    return query(sql)
  }
  async getRow (obj) {
    let sql = `select a.*, b.role_id, c.name as role_name from bbs_user as a
                left join bbs_user_role as b on a.id = b.user_id
                left join bbs_role as c on c.id = b.role_id
                where 1 = 1 ${this.joinStr('get', obj.get)};`
    // 处理表连接字段 
    sql = sql.replace(/`id`/, 'a.id')
    sql = sql.replace(/`flag`/, 'a.flag')
    return query(sql)
  }
  // 先查询到所有的用户id和创建人id，然后根据用户之前的关联关系，得到相关数据，再按照条件返回给用户
  async getList (obj) {
    // 得到创建的用户ID列表
    let curPage = obj.get.curPage, pageSize = obj.get.pageSize,sql,
        createUserList = await this.getCreateUser(obj.get.create_user),
        params = JSON.parse(JSON.stringify(obj.get)), conditions = params.like.length > 2, result
    delete params.create_user
    try {
      sql = `select a.*, b.name as create_user_name, c.name as update_user_name, e.name as role_name from bbs_user as a 
          left join bbs_user as b on a.create_user = b.id
          left join bbs_user as c on a.update_user = c.id
          left join bbs_user_role as d on a.id = d.user_id
          left join bbs_role as e on e.id = d.role_id`
      // 如果有查询条件，则先查询所有符合条件的数据，再分页，没有查询条件，直接查询的时候分页
      // 判断查询条件的模糊查询中，除了curPage, pageSize, 是否存在其他参数
      if (conditions) {
        // 当前存在查询，不存在则不查询
        mysql.escape(createUserList) ?
        sql += ` where 1 = 1 ${this.joinStr('get', params)} and a.id in (${mysql.escape(createUserList)})` :
        sql += ` where 1 !=1`
      } else {
        // 当前存在查询，不存在则不查询
        mysql.escape(createUserList.slice((curPage - 1) * pageSize, (curPage - 1) * pageSize + pageSize)) ?
        sql += ` where 1 = 1 ${this.joinStr('get', params)} and a.id in (${mysql.escape(createUserList.slice((curPage - 1) * pageSize, (curPage - 1) * pageSize + pageSize))})` :
        sql += ` where 1 !=1`
      }
      // 根据时间排序
      sql += ` ${this.joinStr('ORDER BY', {DESC: ['create_time', 'id']})};`
    // 处理表连接字段
    sql = sql.replace(/`account`/, 'a.account')
    sql = sql.replace(/`name`/, 'a.name')
    sql = sql.replace(/`flag`/, 'a.flag')
    } catch (e) {
      return e
    }
    result = await query(sql)
    return conditions ? result.slice((curPage - 1) * pageSize, (curPage - 1) * pageSize + pageSize) : result
  }
  async getTotals (obj) {
    let createUserList = await this.getCreateUser(obj.get.create_user),
        sql = 'select COUNT(*) as count from bbs_user',
        params = JSON.parse(JSON.stringify(obj.get))
    delete params.create_user
    mysql.escape(createUserList) ?
    sql += ` where 1 = 1 ${this.joinStr('get', params)} and id in (${mysql.escape(createUserList)})` :
    sql += ` where 1 != 1`
    sql += ` and flag = 1;`
    return query(sql) 
  }
  async getAll (obj) {
    let sql, createUserList = await this.getCreateUser(obj.get.create_user),
        params = JSON.parse(JSON.stringify(obj.get))
    delete params.create_user
    sql = `select * from bbs_user`
    if (obj.get.create_user === 1) {
      sql += ` where id <> 1 ${this.joinStr('get', params)}`
    } else if (mysql.escape(createUserList)) {
      sql += ` where id in (${mysql.escape(createUserList)}) ${this.joinStr('get', params)}`
    } else {
      sql += ` where 1 !=1`
    }
    sql += ` and flag = 1;`
    return query(sql)
  }
  async getCreateUser (rootPValue) {
    let userList, userTree, createUserList = []
    // 获取到所有的用户数据
    userList = await query(`select id, create_user, create_time from bbs_user where flag = 1;`)
    // 通过建立树状数据，得到当前用户创建的用户树
    userTree = this.utils.getTreeArr({key: 'id', pKey: 'create_user', data: userList, rootPValue: +rootPValue})
    // 递归得到所有创建的用户
    getUser(userTree)
    function getUser (arr) {
      for (let val of arr) {
        createUserList.push(val)
        if (val.children.length) {
          getUser(val.children)
        }
      }
    }
    // 将查询出来的数据按时间排序
    return createUserList.sort((a, b) => b.create_time - a.create_time).map(item => item.id)
  }
}

export default new User()
