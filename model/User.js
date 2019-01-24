import query from '../mysql'

class User{
  async registered (req, res, next) {
    const result = await query('select * from bbs_user where id = 1')
    return result
  }
  async login (req, res, next) {
    const result = await query('select * from bbs_user where id = 1')
    return result
  }
  async getUserInfo (req, res, next) {
    const result = await query('select * from bbs_user where id = 1')
    return result
  }
  async delete (req, res, next) {
    const result = await query('select * from bbs_user where id = 1')
    return result
  }
}

export default new User()