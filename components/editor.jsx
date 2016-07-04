const React = require('react')
const ace = require('brace')
require('brace/mode/javascript')
require('brace/theme/monokai')

module.exports = class Editor extends React.Component {
  componentDidMount() {
    const editor = window.editor = ace.edit('javascript-editor')
    editor.getSession().setMode('ace/mode/javascript')
    editor.setTheme('ace/theme/monokai')
    editor.addEventListener('change', () => {
      state.code = editor.getValue()
    })
  }
  
  render() {
    return <div id="javascript-editor"></div>
  }
}