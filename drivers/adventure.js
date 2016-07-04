const notYetImplemented = name => new Promise((pass, fail) => {
  fail(
    new Error('Support for "adventure" workshops has not been implemented yet')
  )
})

exports.install = notYetImplemented
exports.load = notYetImplemented