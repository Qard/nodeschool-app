const React = require('react')

const SwitchWorkshop = require('./switch-workshop')

module.exports = class Sidebar extends React.Component {
  renderLessonLink(lesson) {
    const onClick = e => state.lesson = lesson
    let className = 'panel-block'
    if (state.lesson && state.lesson.number === lesson.number) {
      className += ' is-active'
    }
    return <a className={className} onClick={onClick} key={lesson.number}>
      <span className="panel-icon">
        <i className={`fa fa-${lesson.done ? 'check' : 'times'}`}></i>
      </span>
      {lesson.name}
    </a>
  }
  
  render() {
    const {workshop, lessons} = this.props
    return <nav className="panel">
      <p className="panel-heading">
        <SwitchWorkshop workshop={workshop} />
      </p>
      {lessons.map(lesson => this.renderLessonLink(lesson))}
    </nav>
  }
}