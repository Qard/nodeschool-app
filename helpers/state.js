const {EventEmitter} = require('events')

module.exports = (data = {}) => {
  const clone = Object.assign({}, data)
  Object.setPrototypeOf(clone, new EventEmitter)
  return new Proxy(clone, {
    set(target, key, value) {
      const before = target[key]
      target[key] = value
      target.emit(`change:${key}`, value, before)
      target.emit('change', key, value, before)
      return true
    }
  })
}