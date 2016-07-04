const React = require('react')

module.exports = class Base extends React.Component {
  sync(model, props) {
    // Support array of properties or single property string
    if (typeof props === 'string') {
      props = [props]
    }
    
    // If we have at least one property name, sync properties individually
    if (props && props.length) {
      const data = {}
      props.forEach(prop => data[prop] = model[prop])
      this.setState(data)
      
      // Watch the named properties
      props.forEach(prop => {
        model.on(`change:${prop}`, value => {
          const data = {}
          data[prop] = value
          this.setState(data)
        })
      })
    
    // If we have no property names, sync all properties
    } else {
      this.setState(model)
      model.on('change', (prop, value) => {
        const data = {}
        data[prop] = value
        this.setState(data)
      })
    }
  }
  
  bind(model, prop) {
    return e => model[prop] = e.target.value
  }
}