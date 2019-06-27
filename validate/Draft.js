import Base from './Base'

class Draft extends Base{
  constructor () {
    super()
    this.giveUp = this.giveUp.bind(this)
  }
  async giveUp (req, res, next) {
    const params = req.body,
        arr = [
          {label: 'id', value: params.id, rules: ['notnull', 'number']},
          {label: '数据类型', value: params.dataType, rules: ['notnull', 'number']}
        ],
        result = this.check(arr)
    if (!result.success) {
      res.json({
        code: 20301,
        success: false,
        message: result.message
      })
      return
    }
    next()
  }
}

export default new Draft()
