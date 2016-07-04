const React = require('react')

const workshoppers = require('../workshoppers')
const Base = require('./base')

module.exports = class SwitchWorkshop extends Base {
  renderOption(name) {
    return <option name={name} key={name}>{name}</option>
  }
  
  render() {
    const {workshop} = this.props
    return <select onChange={this.bind(state, 'switchTo')} value={workshop}>
      {workshoppers.map(name => this.renderOption(name))}
    </select>
  }
}