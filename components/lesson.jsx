const fs = require('fs')
const React = require('react')
const hljs = require('highlight.js')

const Base = require('./base')

module.exports = class Lesson extends Base {
  componentWillMount() {
    this.sync(state, ['lesson','error','done'])
  }
  
  componentDidUpdate() {
    var els = document.querySelectorAll('.content code.lang-js')
    els.forEach(el => hljs.highlightBlock(el))
  }
  
  renderError() {
    const {error} = this.state
    if (!error) return ''
    return <div className="notification is-danger">
      <button className="delete"></button>
      <div dangerouslySetInnerHTML={{__html: error}} />
    </div>
  }
  
  renderSuccess() {
    const {done} = this.state
    if (!done) return ''
    return <div className="notification is-success">
      <button className="delete"></button>
      Congratulations, it works!
    </div>
  }
  
  render() {
    const {workshop} = this.props
    const {lesson} = this.state
    if (!lesson) return <h1>Loading...</h1>
    return <div className="content">
      {this.renderSuccess()}
      {this.renderError()}
      <h1>{lesson.name}</h1>
      <div dangerouslySetInnerHTML={{__html: lesson.problem}} />
    </div>
  }
}