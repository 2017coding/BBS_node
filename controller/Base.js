import TokenModel from '../model/Token'
import UserModel from '../model/User'
import JWT from 'jsonwebtoken'
import utils from '../lib/js/utils'
import path from 'path'
import fs from 'fs'
import NodeLog from '../log/index'

class Base{
  constructor () {
    this.utils = utils
  }
  // 获取到用户信息
  async getUserInfo (req) {
    let userInfo = {}, result
    JWT.verify(req.headers.authorization, 'BBS', (error, decoded) => {
      if (error) {
        return {}
      }
      userInfo = decoded
    })
    // 直接从数据库获取，能保证用户最新的数据
    result = await UserModel.getRow({get: {id: userInfo.id, flag: 1}})
    return result[0]
  }
  // 获取客户端IP
  getClientIp (req) {
    var ipAddress, forwardedIpsStr = req.header('x-forwarded-for')
    if (forwardedIpsStr) {
        var forwardedIps = forwardedIpsStr.split(',')
        ipAddress = forwardedIps[0]
    }
    if (!ipAddress) {
        ipAddress = req.connection.remoteAddress
    }
    return ipAddress
  }
  // 获取服务端地址
  getServiceAddr (req) {
    const headers = req.headers
    return req.protocol + '://' + headers.host
  }
  // 查询路径是否存在
  async getStat (path) {
    return new Promise((resolve, reject) => {
      fs.stat(path, (err, stats) => {
        if (err) {
          resolve(false)
        } else {
          resolve(stats)
        }
      })
    })
  }
  // 创建路径
  async mkdir(dir){
    return new Promise((resolve, reject) => {
      fs.mkdir(dir, err => {
        if (err) {
          resolve(false)
        } else {
          resolve(true)
        }
      })
    })
  }
  // 路径是否存在，不存在则创建
  async dirExists (dir) {
    let isExists = await this.getStat(dir), tempDir, status, mkdirStatus
    // 如果该路径存在且不是文件，返回true
    if (isExists && isExists.isDirectory()) {
      return true
    } else if (isExists) { // 如果该路径存在但是文件，返回false
      return false
    }
    // 如果该路径不存在
    tempDir = path.parse(dir).dir // 拿到上级路径
    // 递归判断，如果上级目录也不存在，则会代码会在此处继续循环执行，直到目录存在
    status = await this.dirExists(tempDir)
    if (status) {
      mkdirStatus = await this.mkdir(dir)
    }
    return mkdirStatus
  }
  // TODO: 异常处理, 有时间扩展, 从这里转发到异常处理模块处理
  handleException (req, res, e) {
    // 写入日志
    NodeLog.writeLog(`\n异常发生时间${new Date()}: \n${e}`)
    
    res.json({
      code: e.errno || 20501,
      success: false,
      content: e,
      message: '服务器内部错误'
    })
  }
}

export default Base
