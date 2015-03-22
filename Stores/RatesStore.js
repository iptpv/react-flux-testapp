var Reflux = require('reflux');
var $ = require('jquery');

var RatesActions = require('../Actions/RatesActions');
var SettingsActions = require('../Actions/SettingsActions');
var SymbolsActions = require('../Actions/SymbolsActions');


var RatesStore = Reflux.createStore({
    init () {
        this.listenTo(SymbolsActions.addSymbol, this.addSymbol);
        this.listenTo(RatesActions.removeSymbol, this.removeSymbol);
        this.listenTo(SettingsActions.changeInterval, this.changeInterval);
        this.symbols = this._cache();
    },
    _interval: false,
    _request: false,
    _makeRequest () {
        return $.ajax({
            type: 'get',
            url: 'https://query.yahooapis.com/v1/public/yql?q=select+*+from+yahoo.finance.xchange+where+pair+=+%22' +
            this.symbols.join(',') +
            '%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys'
        });
    },
    _cache (symbols) {
        if (symbols) {
            return localStorage['RatesStore'] = JSON.stringify(symbols);
        }
        return localStorage['RatesStore'] ? JSON.parse(localStorage['RatesStore']) : [];
    },
    /**
     * Перезапускает таймер обновления
     * @private
     */
    _autoupdate () {
        this._cache(this.symbols);
        if (this._request) {
            clearInterval(this._timer);
            if (this._request.state() === 'pending') {
                this._request.abort();
            }
        }
        if (this.symbols.length) {
            this._update();
            this._timer = setInterval(() => {
                this._update();
            }, this._interval * 1000);
        } else {
            this.trigger([]);
        }
    },
    /**
     * Получает новые данные с сервера
     * @private
     */
    _update () {
        if (!this._request || this._request.state() !== 'pending') {
            this._request = this._makeRequest();
            this._request
                .done((data) => {
                    var rates = data.query.results.rate;
                    this.trigger((Array.isArray(rates) ? rates : [rates]));
                })
                .fail(() => {
                    console.log(':(');
                })
        }
    },
    symbols: [], //храним в массиве т к важен порядок обхода списка
    /**
     * Задает интервал обновления
     * @param {Number} interval
     */
    changeInterval (interval) {
        this._interval = interval;
        this._autoupdate();
    },
    addSymbol (symbol) {
        this.symbols.push(symbol);
        this._autoupdate();
    },
    removeSymbol (symbol) {
        this.symbols.some((val, i) => {
            if (val === symbol) {
                this.symbols.splice(i, 1);
                return true;
            }
        });
        this._autoupdate();
    }
});

module.exports = RatesStore;
