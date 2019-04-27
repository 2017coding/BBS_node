import Base from './Base'
import LogModel from '../model/Log'

class Charts extends Base {
  constructor () {
    super()
  }
  // 用户登陆分析
  async userLoginAnalyze (req, res, next) {
  }
  // 用户注册分析
  async userRegisteredAnalyze (req, res, next) {
  }
}

export default new Charts()
