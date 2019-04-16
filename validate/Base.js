import validate from '../lib/js/validate'

class Base{
  check (arr) {
    let success = true, message
    for (let item of arr) {
      if (!validate(item).success) {
        message = validate(item).message
        success = false
        return {success, message}
      }
    }
    return {success, message}
  }
}

export default Base
