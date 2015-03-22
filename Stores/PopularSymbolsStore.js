var Reflux = require('reflux');
var $ = require('jquery');

var RatesActions = require('../Actions/RatesActions');
var SymbolsActions = require('../Actions/SymbolsActions');


var PopularSymbolsStore = Reflux.createStore({
    init () {
        this.listenTo(SymbolsActions.setSymbols, this.setSymbols);
        this.listenTo(RatesActions.removeSymbol, this.uncheckedSymbol);
        this.listenTo(SymbolsActions.addSymbol, this.checkedSymbol);
        this.symbols = this._cache();
    },
    _cache (symbols) {
        if (symbols) {
            return localStorage['PopularSymbolsStore'] = JSON.stringify(symbols);
        }
        return localStorage['PopularSymbolsStore'] ? JSON.parse(localStorage['PopularSymbolsStore']) : [];
    },
    _makeRequest () {
        return $.ajax({
            type: 'get',
            url: '/popular.json'
        });
    },
    symbols: [], //храним в массиве т к важен порядок обхода списка
    setSymbols () {
        if (this.symbols.length) {
            return this.trigger(this.symbols);
        }
        this._makeRequest()
            .done((data) => {
                this.symbols = data.map((el) => {
                    return {id: el, checked: false}
                });
                this.trigger(this.symbols);
            }).fail(() => {
                console.log(':(');
            });
    },
    uncheckedSymbol (symbol) {
        this.symbols.some((el) => {
            if (el.id === symbol) {
                el.checked = false;
                return true;
            }
        });
        this._cache(this.symbols);
        this.trigger(this.symbols);
    },
    checkedSymbol (symbol) {
        this.symbols.some((el) => {
            if (el.id === symbol) {
                el.checked = true;
                return true;
            }
        });
        this._cache(this.symbols);
        this.trigger(this.symbols);
    }
});

module.exports = PopularSymbolsStore;
