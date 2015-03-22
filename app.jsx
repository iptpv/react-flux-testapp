var React = require('react');

require('./style.styl');
var App = require('./Components/App.jsx');


window.React = React;
React.render(
    <App/>, document.getElementById('content')
);