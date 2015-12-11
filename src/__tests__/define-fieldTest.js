import {expect} from 'chai';

import defineField from '../define-field.js';

const compareNoWhitespace = (a, b) => {
    expect(a.replace(/ +/g, '')).to.eql(b.replace(/ +/g, ''));
}

describe("Creates simple queries", () => {
    it("Passes name and field requests down", () => {
        const q = defineField('me', null, 'avatar name');
        compareNoWhitespace(q, "me { avatar name }");
    });

    it("Passes parameters", () => {
        const q = defineField('me', {name: 'john'}, 'avatar name');
        expect(q).to.eq('me (name: "john") { avatar name }');
    });
});


describe('Sample complex queries', ()=> {
    it("Deep nested", () => {
        const q = defineField('lister', null, {
            edges: {
                node: 'hi'
            }
        });
        expect(q).to.eq('lister { edges { node { hi } } }');
    });

    it("Creating nested objects", () => {
        const q = defineField('person', {id: 123}, [
            'id name', defineField('avatar', {size: 'large'}, 'url size')
        ]);
        expect(q).to.eq('person (id: 123) { id name avatar (size: "large") { url size } }');
    })
});

describe("Can handle aliases", () => {
    it("Alias name is embedded in the object name", () => {

        const q = defineField('person', {id: 123}, [
            defineField('smallAvatar: avatar', {size: 'small'}, 'url size')
        ]);
        expect(q).to.eq('person (id: 123) { smallAvatar: avatar (size: "small") { url size } }');

    })
});