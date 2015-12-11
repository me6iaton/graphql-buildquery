import {expect} from 'chai';

import fieldList from '../stringify-fieldlist.js';


describe("Handles basic flat lists", () => {
    it("Handles simple string list", () => {
        const r = fieldList('field1 field2');
        expect(r).to.eq('field1 field2');
    });

    it("Flattens out arrays of fields", () => {
        const r = fieldList(['f1', 'f2']);
        expect(r).to.eq('f1 f2');
    });

    it("Supports multiple args", () => {
        const r = fieldList('f1', 'f2');
        expect(r).to.eq('f1 f2')
    });
})

describe('Handles deeply nested fields', ()=> {
    it('Embeds literal object values', () => {
        const r = fieldList({sub1: 'f1 f2'});
        expect(r).to.eq('sub1 { f1 f2 }')
    })

    it('Can go deep deep with embedding', ()=> {
        const r = fieldList('1', {
            sub1: 's1a s1b',
            sub2: ['s2a', {
                sub21: ['s21a', 's21b', {
                    sub211: 's211a'
                }]
            }]
        });
        expect(r).to.eq('1 sub1 { s1a s1b } sub2 { s2a sub21 { s21a s21b sub211 { s211a } } }')
    })
});


describe('Handles mixed strings, array, and objects', () => {
    it('Mixes strings and array', ()=> {
        const r = fieldList('f1 f2', ['f3', 'f4']);
        expect(r).to.eq('f1 f2 f3 f4')
    })

    it('Mixes literal objects an arrays', () => {
        const r = fieldList('f1 f2', ['f4', 'f5'], {sub1: 'one'})
        expect(r).to.eq('f1 f2 f4 f5 sub1 { one }')
    });

    it('Includes fields for the parent objects when using the magic "$" key', () => {
        const r = fieldList('one', { $: 'a1 a2 a3', inner: 'b1 b2'})
        expect(r).to.eq('one a1 a2 a3 inner { b1 b2 }')
    })
})