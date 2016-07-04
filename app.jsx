const React = require('react')
const ReactDOM = require('react-dom')

const workshoppers = require('./workshoppers')
const state = require('./helpers/state')
const App = require('./components/app')

// Use global state, 'cause haters gonna hate
window.state = state({
  switchTo: workshoppers[0]
})

// When the window is ready, render the app
window.onload = () => {
  const root = document.querySelector('main')
  ReactDOM.render(<App />, root)
}