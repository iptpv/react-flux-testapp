var React = require('react');
var Reflux = require('reflux');
var LocalStorageMixin = require('react-localstorage');

var SymbolsActions = require('../Actions/SymbolsActions');
var PopularSymbolsStore = require('../Stores/PopularSymbolsStore');
var CustomSymbolStore = require('../Stores/CustomSymbolStore');


var CustomSymbol = React.createClass({
    mixins: [Reflux.ListenerMixin, LocalStorageMixin],
    getInitialState () {
        return {
            leftHalfOfSymbol: 'EUR',
            rightHalfOfSymbol: 'EUR'
        }
    },
    componentDidMount () {
        this.listenTo(CustomSymbolStore, () => {
            if (this.isMounted()) {
                this.setState({
                    checked: CustomSymbolStore.symbols[this.state.leftHalfOfSymbol + this.state.rightHalfOfSymbol]
                });
            }
        });
    },
    addSymbol () {
        SymbolsActions.addSymbol(this.state.leftHalfOfSymbol + this.state.rightHalfOfSymbol);
    },
    setLeftHalfOfSymbol (e) {
        var val = e.target.value;
        this.setState({
            leftHalfOfSymbol: val,
            checked: CustomSymbolStore.symbols[val + this.state.rightHalfOfSymbol]
        });
    },
    setRightHalfOfSymbol (e) {
        var val = e.target.value;
        this.setState({
            rightHalfOfSymbol: val,
            checked: CustomSymbolStore.symbols[this.state.leftHalfOfSymbol + val]
        });
    },
    render () {
        return (
            <tr>
                <td>
                    <select value={this.state.leftHalfOfSymbol} onChange={this.setLeftHalfOfSymbol}>
                        <option>EUR</option>
                        <option>USD</option>
                        <option>RUB</option>
                        <option>GBP</option>
                    </select>
                    /
                    <select value={this.state.rightHalfOfSymbol} onChange={this.setRightHalfOfSymbol}>
                        <option>EUR</option>
                        <option>USD</option>
                        <option>RUB</option>
                        <option>GBP</option>
                    </select>
                </td>
                <td>
                    <button disabled={this.state.checked} onClick={this.addSymbol}>Add</button>
                </td>
            </tr>
        )
    }
});

var PopularSymbol = React.createClass({
    addSymbol () {
        SymbolsActions.addSymbol(this.props.symbol);
    },
    render () {
        return (
            <tr>
                <td>
                    {this.props.symbol}
                </td>
                <td>
                    <button disabled={this.props.checked} onClick={this.addSymbol}>Add</button>
                </td>
            </tr>
        )
    }
});

var Symbols = React.createClass({
    mixins: [Reflux.ListenerMixin],
    getInitialState () {
        return {
            popularSymbols: []
        }
    },
    componentDidMount () {
        this.listenTo(PopularSymbolsStore, (symbols) => {
            if (this.isMounted()) {
                this.setState({popularSymbols: symbols});
            }
        });
        PopularSymbolsStore.setSymbols();
    },
    render () {
        var popularSymbols = this.state.popularSymbols.map((el) => {
            return (
                <PopularSymbol symbol={el.id} checked={el.checked}/>
            )
        });
        return (
            <div>
                <h3>Symbols</h3>
                <table>
                    <tbody>
                        {popularSymbols}
                        <CustomSymbol/>
                    </tbody>
                </table>
            </div>
        )
    }
});

module.exports = Symbols;
