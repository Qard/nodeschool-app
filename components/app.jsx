const React = require('react')

const Workshoppers = require('./workshoppers')
const driver = require('../drivers/workshopper')
const Base = require('./base')

module.exports = class App extends Base {
  componentWillMount() {
    this.sync(state, 'workshop')
    
    state.on('change:lesson', () => {
      state.error = state.lesson.error
      state.done = state.lesson.done
      state.code = state.lesson.code
    })
    
    state.on('change:workshop', workshop => {
      state.lesson = workshop.lessons[0]
      this.setState({ workshop })
    })
    
    state.on('change:switchTo', name => {
      this.switchTo(name)
    })
    
    // Sync lesson-specific state data
    state.on('change:code', code => {
      state.lesson.code = code
      state.error = null
      state.lesson.verify(code).then(
        v => state.done = true,
        e => state.error = e
      )
    })
    
    state.on('change:error', error => {
      state.lesson.error = error
    })
    
    state.on('change:done', done => {
      state.lesson.done = done
    })
    
    this.switchTo(state.switchTo)
  }
  
  switchTo(name) {
    this.setState({ workshop: null })
    driver.load(name).then(workshop => {
      state.workshop = workshop
    })
  }
  
  render() {
    const {workshop} = this.state
    return <Workshoppers workshop={workshop} />
  }
}