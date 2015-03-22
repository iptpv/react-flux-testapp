var expect = require('expect.js');

describe("PopularSymbolsStore", () => {

    var store = require('../../Stores/PopularSymbolsStore');

    beforeEach(() => {
        store.symbols = [];
    });

    it("Отметить выбранный символ", (done) => {
        store.setSymbols();
        setTimeout(() => {
            store.checkedSymbol('USDRUB');
            expect(store.symbols[0].checked).to.be.ok();
            done();
        }, 300);
    });

    it("Отметить не выбранный символ", (done) => {
        store.setSymbols();
        setTimeout(() => {
            store.checkedSymbol('USDRUB');
            store.uncheckedSymbol('USDRUB');
            expect(store.symbols[0].checked).to.not.be.ok();
            done();
        }, 300);
    });

    it("Загрузить символы", (done) => {
        store.setSymbols();
        setTimeout(() => {
            expect(store.symbols).to.eql([{id:"USDRUB", checked: false}, {id:"EURRUB", checked: false}]);
            done();
        }, 300);
    });

});
