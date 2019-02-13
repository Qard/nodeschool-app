# NodeSchool App

[![Greenkeeper badge](https://badges.greenkeeper.io/Qard/nodeschool-app.svg)](https://greenkeeper.io/)

This is an in-progress project to build an electron app that lets you run
nodeschool workshoppers in a graphical environment. The hope is that this'll
be more approachable for new users. 💯

# Install notes

The [`brace`](http://npm.im/brace) module currently doesn't work properly in
[`electron`](http://electron.atom.io). You'll have to manually comment out the
line doing `require('w3c-blob')` for now... Sorry about that. 😔