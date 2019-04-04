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
          // 参数跳过, and相关字符串拼接
          if (['curPage', 'pageSize', 'or'].indexOf(key) === -1) {
            // 开始拼接SQL
            if (obj['like'] && obj['like'].indexOf(key) !== -1) {
              // str += `and ${key} like ${mysql.escape('%' + obj[key] + '%')} `
              str += ' and `' + key + '` like' + mysql.escape('%' + obj[key] + '%')
            } else if (key !== 'like') {
              // str += `and ${key} = ${mysql.escape(obj[key])} `
              str += ' and `' + key + '` = ' + mysql.escape(obj[key])
            }
          }
          // 或相关字符串拼接
          if (key === 'or') {
            let or = obj.or, keyWord = 'and', index = 0
            for (let orKey in or) {
              if (index > 0) {
                keyWord = 'or'
              }
              index++
              str += ' ' + keyWord + ' `' + orKey + '` = ' + mysql.escape(or[orKey])
            }
          }
        }
        return str
      case 'ORDER BY':
        if (obj.DESC.length > 0 || obj.other.length > 0) {
          str = 'ORDER BY '
        }
        obj.DESC = obj.DESC || []
        obj.other = obj.other || []
        obj.DESC.forEach(val => {
          str += `${val} DESC,`
        })
        obj.other.forEach(val => {
          str += `${val},`
        })
        // 删除最后的逗号
        str = str.substr(0, str.length - 1)
        return str
    }
  }
}

export default Base
