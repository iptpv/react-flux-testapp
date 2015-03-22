var expect = require('expect.js');

describe("CustomSymbolStore", () => {

    var store = require('../../Stores/CustomSymbolStore');

    beforeEach(() => {
        store.symbols = [];
    });

    it("Добавить символ", () => {
        store.addSymbol('EURRUB');
        expect(store.symbols['EURRUB']).to.be.ok();
    });

    it("Удалить символ", () => {
        store.symbols['EUREUR'] = true;
        store.removeSymbol('EUREUR');
        expect(store.symbols['EUREUR']).to.not.be.ok()
    });

});
