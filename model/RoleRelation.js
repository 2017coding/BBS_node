import query from '../mysql'
import Base from './Base'

class RoleRelation extends Base{
  constructor () {
    super()
    this.setPermissions = this.setPermissions.bind(this)
    this.create = this.create.bind(this)
    this.delete = this.delete.bind(this)
    this.getBindUser = this.getBindUser.bind(this)
    this.getMod = this.getMod.bind(this)
    this.getDataControl = this.getDataControl.bind(this)
  }
  async setPermissions (obj) {
    let delResult, setResult
    // 事务开始
    await query('begin')
    delResult = await this.delete(obj.del)
    setResult = await this.create(obj.set)
    if (delResult && setResult) {
      // 事务提交
      await query('commit')
    } else {
      // 事务回滚
      await query('rollback')
    }
    return delResult && setResult
  }
  async create (obj) {
    let createMod = `INSERT INTO bbs_role_mod ${mysql.escape(obj.mod.key)} VALUES ${mysql.escape(obj.mod.values)}`,
        modResult,
        createDataPermissions = `INSERT INTO bbs_role_data_permissions ${mysql.escape(obj.permissions.key)} VALUES ${this.joinStr('INSERT', obj.permissions.values)}`,
        dataPermissionsResult
    // 事务开始
    await query('begin')
    modResult = await query(createMod)
    dataPermissionsResult = await query(createDataPermissions)
    if (modResult.affectedRows && dataPermissionsResult.affectedRows) {
      // 事务提交
      await query('commit')
    } else {
      // 事务回滚
      await query('rollback')
    }
    return modResult.affectedRows && dataPermissionsResult.affectedRows
  }
  async delete (obj) {
    let delMod = `DELETE from bbs_role_mod where 1 = 1 ${this.joinStr('get', obj.get)}`,
        modResult,
        delDataPermissions = `DELETE from bbs_role_data_permissions where 1 = 1 ${this.joinStr('get', obj.get)}`,
        dataPermissionsResult
    // 事务开始
    await query('begin')
    modResult = await query(delMod)
    dataPermissionsResult = await query(delDataPermissions)
    if (modResult.affectedRows && dataPermissionsResult.affectedRows) {
      // 事务提交
      await query('commit')
    } else {
      // 事务回滚
      await query('rollback')
    }
    return modResult.affectedRows && dataPermissionsResult.affectedRows
  }
  async getBindUser (obj) {
    const sql = `select a.* from bbs_user as a
                LEFT JOIN bbs_role as b
                ON a.role_id =  b.id where 1 = 1 ${this.joinStr('get', obj.get)}`
    return query(sql)
  }
  async getMod (obj) {
    const sql = `select a.id from bbs_mod as a
                LEFT JOIN bbs_role_mod as b
                ON a.id = b.mod_id where 1 = 1 ${this.joinStr('get', obj.get)}`
    return query(sql)
  }
  async getDataControl (obj) {
    const sql = `select a.id from bbs_data_control as a
                LEFT JOIN bbs_role_data_permissions as b
                ON a.id = b.data_permissions_id where 1 = 1 ${this.joinStr('get', obj.get)}`
    return query(sql)
  }
}

export default new RoleRelation()
