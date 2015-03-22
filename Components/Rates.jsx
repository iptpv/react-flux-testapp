var React = require('react');
var Reflux = require('reflux');

var RatesActions = require('../Actions/RatesActions');
var RatesStore = require('../Stores/RatesStore');


var Rate = React.createClass({
    removeSymbol () {
        RatesActions.removeSymbol(this.props.symbol);
    },
    render () {
        return (
            <tr>
                <td>{this.props.symbol}</td>
                <td>{this.props.ask}</td>
                <td>{this.props.bid}</td>
                <td>
                    <button onClick={this.removeSymbol}>Remove</button>
                </td>
            </tr>
        )
    }
});

var Rates = React.createClass({
    mixins: [Reflux.ListenerMixin],
    getInitialState () {
        return {
            rates: []
        };
    },
    componentDidMount () {
        this.listenTo(RatesStore, function (rates) {
            if (this.isMounted()) {
                this.setState({rates: rates});
            }
        }.bind(this));
    },
    render () {
        if (this.state.rates.length) {
            var rates = this.state.rates.map(function (rate) {
                return (
                    <Rate symbol={rate.id} ask={rate.Ask} bid={rate.Bid}/>
                )
            });
        }
        var date = new Date();
        /**
         * Для однозначных чисел прибавляет 0 в начало
         * @param d
         * @returns {String}
         */
        var numberWithZero = (d) => {
            if (d < 10) {
                return '0' + d;
            }
            return d;
        };
        return (
            <div className="column">
                <h3>Rates ({numberWithZero(date.getHours())}:{numberWithZero(date.getMinutes())}:{numberWithZero(date.getSeconds())})</h3>
                <table>
                    <thead>
                        <tr>
                            <td>Symbol</td>
                            <td>Ask</td>
                            <td>bid</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {rates}
                    </tbody>
                </table>
            </div>
        )
    }
});

module.exports = Rates;
