var React = require('react');
var LocalStorageMixin = require('react-localstorage');

var SettingsActions = require('../Actions/SettingsActions');


var Settings = React.createClass({
    mixins: [LocalStorageMixin],
    getInitialState () {
        return {
            value: 30
        }
    },
    componentDidMount () {
        SettingsActions.changeInterval(this.state.value);
    },
    changeInterval (e) {
        var val = e.target.value;
        SettingsActions.changeInterval(val);
        this.setState({value: val});
    },
    render () {
        return (
            <div>
                <h3>Settings</h3>
                <table>
                    <tr>
                        <td>Data refresh period:</td>
                        <td>
                            <select value={this.state.value} onChange={this.changeInterval}>
                                <option value="1">1 second</option>
                                <option value="5">5 seconds</option>
                                <option value="10">10 seconds</option>
                                <option value="30">30 seconds</option>
                            </select>
                        </td>
                    </tr>
                </table>
            </div>
        )
    }
});

module.exports = Settings;
