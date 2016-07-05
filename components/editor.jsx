const React = require('react')
const ace = require('brace')
require('brace/mode/javascript')
require('brace/theme/monokai')

module.exports = class Editor extends React.Component {
  componentDidMount() {
    const editor = this.editor = ace.edit('javascript-editor')
    editor.getSession().setMode('ace/mode/javascript')
    editor.setTheme('ace/theme/monokai')
    state.on('change:code', code => this.setCode(code))
    editor.addEventListener('change', () => {
      this.setCode(editor.getValue())
    })
  }
  
  setCode(next = '') {
    // Sync editor
    if (next !== this.editor.getValue()) {
      this.editor.setValue(next)
    }
    
    // Sync state
    if (next !== state.code) {
      state.code = next
    }
  }
  
  render() {
    return <div id="javascript-editor"></div>
  }
}