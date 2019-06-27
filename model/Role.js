import mysql from 'mysql'
import query from '../mysql'
import Base from './Base'
import utils from '../lib/js/utils'

class Role extends Base{
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
    let sql = `INSERT INTO bbs_role set ${this.joinStr('set', obj.set)};`
    return query(sql)
  }
  async update (obj) {
    let sql = `UPDATE bbs_role set ${this.joinStr('set', obj.set)} where 1 = 1 ${this.joinStr('get', obj.get)};`
    return query(sql)
  }
  async delete (obj) {
    let sql = `DELETE from bbs_role where 1 = 1 ${this.joinStr('get', obj.get)};`
    return query(sql)
  }
  async getRow (obj) {
    let sql = `select * from bbs_role where 1 = 1 ${this.joinStr('get', obj.get)};`
    return query(sql)
  }
  async getList (obj) {
    let curPage = obj.get.curPage, pageSize = obj.get.pageSize
    let sql = `select a.*, b.name as create_user_name, c.name as update_user_name from bbs_role as a
                left join bbs_user as b on a.create_user = b.id
                left join bbs_user as c on a.update_user = c.id
                where 1 = 1 ${this.joinStr('get', obj.get)} limit ${(curPage - 1) * pageSize}, ${pageSize};`
    return query(sql)
  }
  async getTotals (obj) {
    let sql = `select COUNT(*) as count from bbs_role where 1 = 1 ${this.joinStr('get', obj.get)};`
    return query(sql)
  }
  async getAll (obj) {
    // 查询到当前角色和当前角色的所有下级角色
    let sql, createRoleList = await this.getCreateRole(obj.get.id)
    try {
      sql = `select a.*, b.name as create_user_name, c.name as update_user_name, d.name as pName from bbs_role as a
          left join bbs_user as b on a.create_user = b.id
          left join bbs_user as c on a.update_user = c.id
          left join bbs_role as d on a.pid = d.id
          where 1 = 1 and a.id in (${mysql.escape([obj.get.id, ...createRoleList])}) and a.flag = 1;`
    } catch (e) {
      return e
    }
    return query(sql)
  }
  async getCreateRole (rootPValue) {
    let roleList, roleTree, createRoleList = []
    // 获取到所有的角色数据
    roleList = await query(`select id, pid from bbs_role;`)
    // 通过建立树状数据，得到当前用户创建的角色树
    roleTree = utils.getTreeArr({key: 'id', pKey: 'pid', data: roleList, rootPValue: +rootPValue})
    // 递归得到所有创建的角色
    getRole(roleTree)
    function getRole (arr) {
      for (let val of arr) {
        createRoleList.push(val.id)
        if (val.children.length) {
          getRole(val.children)
        }
      }
    }
    return createRoleList
  }
}

export default new Role()
