import Base from './Base'
import LogModel from '../model/Log'

class Charts extends Base {
  constructor () {
    super()
    this.getCharts = this.getCharts.bind(this)
    this.userLoginAnalyze = this.userLoginAnalyze.bind(this)
  }
  async getCharts (req, res, next) {
    const data = req.body.config
  }
  // 用户登陆分析
  async userLoginAnalyze (req, res, next) {
    let days = req.query.days - 1 || 6,
        now = this.utils.switchTime(new Date(), 'YYYY-MM-DD') + ' 00:00:00',
        result, lastDays = +new Date(now) - 1000 * 3600 * 24 * days
    try {
      result = await LogModel.getLoginLog({get: {larger: {create_time: this.utils.switchTime(lastDays, 'YYYY-MM-DD hh:mm:ss')}, type: 1}})
    } catch (e) {
      this.handleException(req, res, e)
      return
    }
    // 对数据做处理
    const arr = [], daysList = [], timeList = [], dataList = []
    result.forEach(item => {
      arr.push({
        day: this.utils.switchTime(item.time, 'MM-DD'),
        time: this.utils.switchTime(item.time, 'hh:mm:ss'),
        hour: this.utils.switchTime(item.time, 'hh')
      })
      // 得到天列表
      if (!daysList.includes(this.utils.switchTime(item.time, 'MM-DD'))) {
        daysList.push(this.utils.switchTime(item.time, 'MM-DD'))
      }
    })
    // 初始化时间列表
    for (let i = 0, len = 24; i < len; i++) {
      timeList.push(i > 9 ? i + ':00' : '0' + i + ':00')
    }
    // 初始化数据列表
    for (let i = 0; i < days + 1; i++) {
      let arr1 = []
      for (let i = 0, len = 24; i < len; i++) {
        arr1.push(0)
      }
      // 当天初始为当天的小时个数
      i === days ? dataList.push(arr1.slice(0, new Date().getHours() + 1)) : dataList.push(arr1)
    }
    arr.forEach(item => {
      // 得到每天每小时登陆的次数
      dataList[daysList.indexOf(item.day)][timeList.indexOf(item.hour + ':00')]++
    })
    res.json({
      code: 20000,
      success: true,
      content: {timeList, daysList, dataList},
      message: '操作成功'
    })
  }
  // 用户注册分析
  async userRegisteredAnalyze (req, res, next) {
  }
}

export default new Charts()
