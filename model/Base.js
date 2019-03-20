import mysql from 'mysql'

class Base{
  getStr (type, arr) {
    let str = ''
    switch (type) {
      case 'set':
        for (let item of arr) {
          if (str) {
            str += `, ${item.key} = ${mysql.escape(item.value)}`
          } else {
            str += `${item.key} = ${mysql.escape(item.value)}`
          }
        }
        return str
      case 'get':
        for (let item of arr) {
          if (item.type === 'like') {
            str += `and ${item.key} like %${mysql.escape(item.value)}%`
          } else {
            str += `and ${item.key} = ${mysql.escape(item.value)}`
          }
        }
        return str
    }
  }
}

export default Base
