var Reflux = require('reflux');

var RatesActions = require('../Actions/RatesActions');
var SymbolsActions = require('../Actions/SymbolsActions');


var CustomSymbolStore = Reflux.createStore({
    init () {
        this.listenTo(SymbolsActions.setSymbols, this.setSymbols);
        this.listenTo(RatesActions.removeSymbol, this.removeSymbol);
        this.listenTo(SymbolsActions.addSymbol, this.addSymbol);
        this.symbols = this._cache();
    },
    _cache (symbols) {
        if (symbols) {
            return localStorage['CustomSymbolStore'] = JSON.stringify(symbols);
        }
        return localStorage['CustomSymbolStore'] ? JSON.parse(localStorage['CustomSymbolStore']) : {};
    },
    symbols: {},
    setSymbols () {
        this.trigger(this.symbols);
    },
    removeSymbol (symbol) {
        delete this.symbols[symbol];
        this._cache(this.symbols);
        this.trigger(this.symbols);
    },
    addSymbol (symbol) {
        this.symbols[symbol] = true;
        this._cache(this.symbols);
        this.trigger(this.symbols);
    }
});

module.exports = CustomSymbolStore;
