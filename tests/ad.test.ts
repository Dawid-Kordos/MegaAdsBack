import {AdRecord} from "../records/ad.record";
import {pool} from "../utils/db";
import {AdEntity} from "../types";

afterAll(async () => {
    await pool.end();
});

const defaultObject = {
    name: 'Test name',
    description: 'Bla',
    lat: 8,
    lon: 7,
    url: 'https://megak.pl',
    price: 50,
};

test('AdRecord returns data from database for one entry.', async () => {
    const ad = await AdRecord.getOne('abc');

    expect(ad).toBeDefined();
    expect(ad.id).toBe('abc');
    expect(ad.name).toBe('Dejv');
});

test('AdRecord.getOne returns null from database for unexisting entry.', async () => {
    const ad = await AdRecord.getOne('---');

    expect(ad).toBeNull();

});

test('AdRecord.findAll returns array of found entries.', async () => {
    const ads = await AdRecord.findAll('');

    expect(ads).not.toEqual([]);
    expect(ads[0].id).toBeDefined();
});

test('AdRecord.findAll returns array of found entries when searching for "a".', async () => {
    const ads = await AdRecord.findAll('e');

    expect(ads).not.toEqual([]);
    expect(ads[0].id).toBeDefined();
});

test('AdRecord.findAll returns empty array of when searching for something what does not exist.', async () => {
    const ads = await AdRecord.findAll('------------');

    expect(ads).toEqual([]);
});

test('AdRecord.findAll returns reduced amount of data.', async () => {
    const ads = await AdRecord.findAll('');

    expect((ads[0] as AdEntity).price).toBeUndefined();
    expect((ads[0] as AdEntity).description).toBeUndefined();
});

test('AdRecord.insert returns new UUID.', async () => {
    const ad = new AdRecord(defaultObject);

    await ad.insert();

    expect(ad.id).toBeDefined();
    expect(typeof ad.id).toBe('string');
});


test('AdRecord.insert inserts data to db.', async () => {
    const ad = new AdRecord(defaultObject);
    await ad.insert();

    const foundAd = await AdRecord.getOne(ad.id);

    expect(foundAd).toBeDefined();
    expect(foundAd).not.toBeNull();
    expect(foundAd.id).toBe(ad.id);
});
