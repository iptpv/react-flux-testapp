var expect = require('expect.js');

describe("RatesStore", () => {

    var store = require('../../Stores/RatesStore');

    beforeEach(() => {
        store.symbols = [];
        store.interval = false;
    });

    it("Добавить символ", () => {
        store.addSymbol('EUREUR');
        expect(store.symbols).to.eql(['EUREUR']);
    });

    it("Удалить символ", () => {
        store.symbols = ['EUREUR'];
        store.removeSymbol('EUREUR');
        expect(store.symbols.length).to.not.be.ok();
    });

});
