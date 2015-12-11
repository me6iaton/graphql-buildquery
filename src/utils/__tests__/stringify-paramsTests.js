import {expect} from 'chai';

import stringifyParams, {literalQueryValue} from '../stringify-params.js';


describe("Handling parameters", ()=> {
    it("Empty parameters are removed", () => {
        const r1 = stringifyParams(null);
        const r2 = stringifyParams({});
        const r3 = stringifyParams(undefined);
        expect(r1).to.eql('');
        expect(r2).to.eql('');
    })

    it("Convers objects into spaced values", () => {
        const r = stringifyParams({name: 'frank', city: 'Gotham'});
        expect(r).to.eq('name: "frank" city: "Gotham"');
    })

    it("Leaves numeric params values as numbers", () => {
        const r = stringifyParams({a: 'frank', b: 4, c: 5.5});
        expect(r).to.eq('a: "frank" b: 4 c: 5.5');
    })

    it("Removes null and undefined values from params", () => {
        const r = stringifyParams({a: 'frank', b: null, c: undefined});
        expect(r).to.eq('a: "frank"');
    })

    it("Populats nested params", () => {
        const r = stringifyParams({filter: {name: 'frank'}});
        expect(r).to.eq('filter: {name: "frank"}');
    });

    it("Unfolds nested arrays", () => {
        const r = stringifyParams({filter: {name: ['frank', 'jess']}});
        expect(r).to.eq('filter: {name: ["frank", "jess"]}');
    })

    it("Sanitizes quotes in simple parameters", () => {
        const r = stringifyParams({hello: 'yo"dud'});
        expect(r).to.eq('hello: "yo\\"dud"');
    })

    it("Sanitizes quotes in parameter arrays", () => {
        const r = stringifyParams({hello: ['me', 'yo"dud']});
        expect(r).to.eq('hello: ["me", "yo\\"dud"]');
    })

    it("Leaves literal values unescaped", () => {
        const r = stringifyParams({hello: [literalQueryValue('LITERAL'), 'string']});
        expect(r).to.eq('hello: [LITERAL, "string"]');
    })

})