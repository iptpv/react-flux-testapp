var React = require('react');

var Settings = require('./Settings.jsx');
var Rates = require('./Rates.jsx');
var Symbols = require('./Symbols.jsx');


var App = React.createClass({
    render () {
        return (
            <div>
                <div className="column">
                    <Settings/>
                    <Symbols/>
                </div>
                <Rates/>
            </div>
        )
    }
});

module.exports = App;
