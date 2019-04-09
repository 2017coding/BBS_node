export default {
  /**
   * 通过ID找到在列表中对应的名字
   * @param {Object} obj
   *  @param obj.dataList 数据列表
   *  @param obj.value    数据的值对应的字段名称   例如 'value'
   *  @param obj.label    数据的说明对应的字段名称 例如 'label'
   *  @param obj.data     当前传入的数据值
   * @return name        返回当前传入值在数组中对应的名字
   */
  getDataName: (obj) => {
    let name = obj.data
    if (Array.isArray(obj.dataList) && obj.dataList.length > 0) {
      for (let i = 0; i < obj.dataList.length; i++) {
        if (obj.dataList[i][obj.value] === obj.data) {
          name = obj.dataList[i][obj.label]
        }
      }
    }
    return name
  },
  /**
   * 对请求失败的HTTP状态吗做处理
   * @param {Number} code     HTTP状态码
   * @param {String} message  错误提示
   * @return message 返回处理过的提示信息
   */
  requestError: (code, message) => {
    let statusCode = (code + '').replace(/[^0-9]+/g, '') - 0

    switch (statusCode) {
    case 400:
      return 'Bad Request (错误的请求)'
    case 401:
      return 'Unauthorized (请求要求身份验证)'
    case 403:
      return 'Forbidden (服务器拒绝请求)'
    case 404:
      return 'NOT Found (服务器找不到请求的资源)'
    case 405:
      return 'Bad Request (禁用请求中指定的方法)'
    case 406:
      return 'Not Acceptable (无法使用请求的内容特性响应请求的网页)'
    case 407:
      return 'Proxy Authentication Required (需要代理授权)'
    case 408:
      return 'Request Timed-Out (服务器等候请求时发生超时)'
    case 409:
      return 'Conflict (服务器在完成请求时发生冲突。服务器必须在响应中包含有关冲突的信息)'
    case 410:
      return 'Gone (请求的资源已被永久删除)'
    case 411:
      return 'Length Required (服务器不接受不含有效内容长度标头字段的请求)'
    case 412:
      return 'Precondition Failed (未满足前提条件)'
    case 413:
      return 'Request Entity Too Large (请求实体过大)'
    case 414:
      return 'Request, URI Too Large (请求的 URI 过长)'
    case 415:
      return 'Unsupported Media Type (不支持的媒体类型)'
    case 429:
      return '您的操作过于频繁,请稍后重试'
    case 500:
      return 'Internal Server Error (服务器内部错误)'
    case 501:
      return 'Not Implemented (尚未实施)'
    case 502:
      return 'Bad Gateway (错误网关)'
    case 503:
      return 'Server Unavailable (服务不可用)'
    case 504:
      return 'Gateway Timed-Out (网关超时)'
    case 505:
      return 'HTTP Version not supported (HTTP 版本不受支持)'
    default:
      return message
    }
  },
  /**
   * 传入时间戳，转换指定的时间格式
   * @param {Number} val      时间戳
   * @param {String} dateType 要得到的时间格式 例如 YYYY-MM-DD hh:mm:ss
   * @return dataStr 例如 YYYY-MM-DD hh:mm:ss
   */
  switchTime: (val = +new Date(), dateType = 'YYYY-MM-DD hh:mm:ss') => {
    // 将字符串转换成数字
    let timeStamp = +new Date(val),
      dateStr,
      str

    // 如果转换成数字出错
    if (!timeStamp) {
      return val
    }

    // 得到时间字符串
    dateStr = new Date(timeStamp)
    str = dateType.replace('YYYY', dateStr.getFullYear())
    str = str.replace('MM', (dateStr.getMonth() + 1 < 10 ? '0' : '') + (dateStr.getMonth() + 1))
    str = str.replace('DD', (dateStr.getDate() < 10 ? '0' : '') + dateStr.getDate())
    str = str.replace('hh', (dateStr.getHours() < 10 ? '0' : '') + dateStr.getHours())
    str = str.replace('mm', (dateStr.getMinutes() < 10 ? '0' : '') + dateStr.getMinutes())
    str = str.replace('ss', (dateStr.getSeconds() < 10 ? '0' : '') + dateStr.getSeconds())

    return str
  },
  /**
   * 将一级的数据结构处理成树状数据结构
   * @param {Object} obj {key, pKey, data}
   *  @param obj.key  字段名称 比如id
   *  @param obj.pKey 父字段名称 比如 pid
   *  @param obj.rootPValue 根节点的父字段的值
   *  @param obj.data 需要处理的数据
   * @return {Array} arr
   */
  getTreeArr: (obj) => {
    if (!Array.isArray(obj.data)) {
      console.log('getTreeArr=>请传入数组')
      return []
    }
    let arr = obj.data, arr1 = []
    // 将数据处理成数状结构
    arr.forEach(item => {
      let index = 0
      item.children = []
      arr.forEach(item1 => {
        // 得到树结构关系
        if (item[obj.key] === item1[obj.pKey]) {
          item.children.push(item1)
        }
        // 判断根节点
        if (item1.id !== item.pid) {
          index++
        }
        // 传入根节点，根据传入的根节点组成树结构
        if ('rootPValue' in obj && item[obj.pKey] === obj.rootPValue) {
          arr1.push(item)
        }
      })
      // 没传入根节点，根据当前数据结构得到根节点
      if (!('rootPValue' in obj) && index === arr.length) {
        arr1.push(item)
      }
    })
    return arr1
  },
  // 为tree数据结构添加name，好获取子节点至根节点的全部路径 S0812A
  methoss: (arr, pathName) => {
    arr.forEach(item => {
      // 对一级菜单处理
      item.pathName = pathName ? pathName + '/' + item.mod_name : item.mod_name
      // 对子级处理
      item.children.forEach(childItem => {
        childItem.pathName = pathName ? pathName + '/' + item.mod_name + '/' + childItem.mod_name : item.mod_name + '/' + childItem.mod_name

        if (childItem.children) {
          this.methoss(childItem.children, childItem.pathName)
        }
      })
    })
  },
  /**
   * 用来判断对象不存在时，返回的字段数据
   * @param {Object} obj 对象
   * @param {String} key 要使用的属性
   * @param {String} staticName 属性不存在时使用的值
   */
  useWhichData (obj, key, staticName) {
    if (obj && obj[key]) {
      return obj[key]
    } else {
      return staticName
    }
  },
  /**
   * 数组去重
   * @param {Array} data 要去重的数组
   * @param {String} key 作为去重依据的字段 (处理对象数组时需要传入)
   * @return arr 返回处理后的数据
   */
  handleRepeatArr ({data, key}) {
    if (!Array.isArray(data)) {
      console.log('请传入数组')
      return
    }
    /** 1.递归去重，缺点，会将数据默认排序 */
    // // 先对数据做排序处理
    // data = data.sort((item, item1) => {
    //   if (key) {
    //     return item[key] - item1[key]
    //   }
    //   return item - item1
    // })
    // // 递归去重
    // function getData (index) {
    //   if (index >= 1) {
    //     // 判断当前数据和下一条数据是否相等
    //     let result = key ? data[index][key] === data[index - 1][key] : data[index] === data[index - 1]
    //     if (result) {
    //       data.splice(index, 1)
    //     }
    //     getData(index - 1)
    //   }
    // }
    // getData(data.length - 1)
    // return data

    /** 2.根据对象的属性不同去重 */
    let arr = [], obj = {}
    data.forEach((item, index) => {
      let attr = key ? item[key] : item
      if (!obj[attr]) {
        obj[attr] = index + 1
        arr.push(item)
      }
    })
    return arr

    /** 3.利用indexOf以及forEach (适合处理数组，不适合处理对象数组) */
    // let arr = []
    // data.forEach((item, index) => {
    //   // 如果当前元素在之后没有出现过(后面出现的数据会保留)
    //   // let result = data.indexOf(item, index + 1)
    //   // 如果当前元素在之前没有出现过(前面出现的数据会保留)
    //   let result = index === 0 ? -1 : data.lastIndexOf(item, index - 1)
    //   if (result === -1) {
    //     arr.push(item)
    //   }
    // })
    // return arr

    /** 4.new Set (适合处理数组，不适合处理对象数组) */
    // return [...new Set(data)]

    /** 5. 双层循环去重 （占用内存高） */
    // for (let i = 0, len = data.length; i < len; i++) {
    //   for (let j = i + 1; j < len; j++) {
    //     let result = key ? data[i][key] === data[j][key] : data[i] === data[j]
    //     if (result) {
    //       data.splice(j, 1)
    //       len--
    //       j--
    //     }
    //   }
    // }
    // return data
  }
}
