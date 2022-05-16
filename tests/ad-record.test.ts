import {AdRecord} from "../records/ad.record";

const defaultObj = {
    name: 'Test name',
    description: 'Bla',
    lat: 8,
    lon: 7,
    url: 'https://megak.pl',
    price: 50,
};

test('Can build AdRecord', () => {
    const ad = new AdRecord(defaultObj);

    expect(ad.name).toBe('Test name');
    expect(ad.description).toBe('Bla');
});

test('Validates invalid price', () => {
   expect( () => new AdRecord({
       ...defaultObj,
       price: -3,
   })).toThrow('Cena nie może być mniejsza niż 0 ani większa niż 9 999 999.');
});
