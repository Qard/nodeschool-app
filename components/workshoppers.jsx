const React = require('react')

const workshoppers = require('../workshoppers')
const driver = require('../drivers/workshopper')

const Base = require('./base')
const Sidebar = require('./sidebar')
const Lesson = require('./lesson')
const Editor = require('./editor')

module.exports = class Workshoppers extends Base {
  constructor() {
    super()
    this.state = {}
  }
  
  switchTo(name) {
    this.setState({ workshop: null })
    driver.load(name)
      .then(workshop => {
        this.setState({ workshop })
        state.lesson = workshop.lessons[0]
      })
  }
  
  componentWillReceiveProps({ workshop }) {
    this.switchTo(workshop.name)
  }
  
  render() {
    const {workshop} = this.state
    if (!workshop) return <h1>Loading...</h1>
    const {name, lessons} = workshop
    return <div className="tile">
      <div className="tile is-parent is-2">
        <Sidebar workshop={name} lessons={lessons} />
      </div>
      <div className="tile is-parent is-5">
        <Lesson workshop={name} />
      </div>
      <div className="tile is-parent is-5">
        <Editor workshop={name} />
      </div>
    </div>
  }
}