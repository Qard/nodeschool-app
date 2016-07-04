const npmInstall = require('npm-install-package')
const installed = require('installed')
const marked = require('marked')
const path = require('path')
const fs = require('fs')

// Check if the workshopper is installed
const check = name => new Promise((pass, fail) => {
  installed(process.cwd(), {}, function (err, pkgs) {
    if (err) return fail(err)
    if (pkgs.map(pkg => pkg.name).includes(name)) {
      pass()
    } else {
      fail(new Error(`${name} is not installed`))
    }
  })
})

// Install the workshopper
const install = name => new Promise((pass, fail) => {
  npmInstall(name, {}, err => err ? fail(err) : pass())
})

// Only try to install when not already installed
const ensureInstalled = name => check(name).catch(() => install(name))

class Lesson {
  constructor(lesson, workshop) {
    this.workshop = workshop
    this.lesson = lesson
    this.data = lesson.fn()
    this.data.init(workshop.mod)
    this.done = false
    
    var fields = ['problem','solution']
    fields.forEach(field => {
      const data = this.data[field]
      if (!data) return
      const text = data.text || fs.readFileSync(data.file).toString()
      this[field] = marked(text)
    })
  }
  get name() { return this.lesson.name }
  get number() { return this.lesson.number }
  
  verify(text) {
    return new Promise((pass, fail) => {
      const p = path.join(process.cwd(), 'lesson.js')
      fs.writeFile(p, text, err => {
        if (err) return fail(err)
        this.data.verify([p], verified => {
          verified ? pass() : fail(marked(this.data.fail[0].text))
        })
      })
    })
  }
}

class Workshop {
  constructor(mod) {
    this.mod = mod
    
    // Only build lesson list once
    this.lessons = Object.keys(this.mod._meta)
      .map(key => this.mod._meta[key])
      .sort((a, b) => a.number - b.number)
      .map(lesson => new Lesson(lesson, this))
  }
  
  get name() { return this.mod.options.name }
}


exports.load = name => ensureInstalled(name).then(() => new Promise(pass => {
  const mod = require(name)
  pass(new Workshop(mod))
}))