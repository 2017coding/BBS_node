import TokenModel from '../model/Token'
class BaseValidate{
  async check (req, res, next) {
     // 登录和注册页面不作限制
     if (req.path === '/login' || req.path === 'registered') {
      next()
      return
    }
    res.json({
      code: 500,
      success: false,
      content: {},
      message: '验证失败'
    })
    return
    next()
  }
}

export default new BaseValidate()
