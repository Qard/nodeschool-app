const React = require('react')

module.exports = class SidebarEntry extends React.Component {
  constructor() {
    super()
    this.state = {}
  }
  
  componentWillMount() {
    this.setState({ done: state.lesson.done })
  }
  componentWillReceiveProps({lesson}) {
    this.setState({ done: lesson.done })
  }
  
  render() {
    const {lesson} = this.props
    const {done} = this.state
    const onClick = e => state.lesson = lesson
    let className = 'panel-block'
    if (state.lesson && state.lesson.number === lesson.number) {
      className += ' is-active'
    }
    return <a className={className} onClick={onClick} key={lesson.number}>
      <span className="panel-icon">
        <i className={`fa fa-${done ? 'check' : 'times'}`}></i>
      </span>
      {lesson.name}
    </a>
  }
}