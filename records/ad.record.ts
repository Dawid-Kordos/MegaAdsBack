import {AdEntity, NewAdEntity} from "../types";
import {ValidationError} from "../utils/errors";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";

type AdRecordResults = [AdEntity[], FieldPacket[]]; //FieldPacket - info about the db fields

export class AdRecord implements AdEntity {
    public id: string;
    public name: string;
    public description: string;
    public price: number;
    public url: string;
    public lat: number;
    public lon: number;

    constructor(obj: NewAdEntity) {
        if (!obj.name || obj.name.length > 100) {
            throw new ValidationError('Nazwa nie może być pusta ani mieć długość większą niż 100 znaków.');
        }

        if (obj.description.length > 1000) {
            throw new ValidationError('Opis nie może mieć więcej niż 1000 znaków.');
        }

        if (obj.price < 0 || obj.price > 9999999) {
            throw new ValidationError('Cena nie może być mniejsza niż 0 ani większa niż 9 999 999.');
        }

        if (!obj.url || obj.url.length > 100) {
            throw new ValidationError('Link ogłoszenia nie może być pusty ani mieć długość większą niż 100 znaków.');
        }

        if (typeof obj.lat !== "number" || typeof obj.lon !== "number") {
            throw new ValidationError('Nie można zlokalizować ogłoszenia.');
        }

        this.id = obj.id;
        this.name = obj.name;
        this.description = obj.description;
        this.price = obj.price;
        this.url = obj.url;
        this.lat = obj.lat;
        this.lon = obj.lon;
    }

    static async getOne(id: string): Promise<AdRecord | null> {
        const [results] = await pool.execute("SELECT * FROM `ads` WHERE id = :id", {
            id,
        }) as AdRecordResults;

        return results.length === 0 ? null : new AdRecord(results[0]);
    }
}
