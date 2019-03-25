import mysql from 'mysql'

class Base{
  joinStr (type, obj) {
    let str = ''
    switch (type) {
      case 'set':
        for (let key in obj) {
          let separated = str ? ',' : ''
          // str += `${separated} ${key} = ${mysql.escape(obj[key])} `
          str +=  separated + '`' + key + '` = ' + mysql.escape(obj[key])
        }
        return str
      case 'get':
        // TODO: 暂时只对一般条件查询和模糊查询处理
        for (let key in obj) {
          // 分页相关参数跳过
          if (['curPage', 'pageSize'].indexOf(key) === -1) {
            // 开始拼接SQL
            if (obj['like'] && obj['like'].indexOf(key) !== -1) {
              // str += `and ${key} like ${mysql.escape('%' + obj[key] + '%')} `
              str += 'and `' + key + '` like' + mysql.escape('%' + obj[key] + '%')
            } else if (key !== 'like') {
              // str += `and ${key} = ${mysql.escape(obj[key])} `
              str += 'and `' + key + '` =' + mysql.escape(obj[key])
            }
          }
        }
        return str
    }
  }
}

export default Base
