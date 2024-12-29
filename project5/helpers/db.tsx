import { openDatabase, SQLResultSet } from "expo-sqlite";
import { Place } from "../models/place";

const DB_NAME = "places.db";
const db = openDatabase(DB_NAME);

export const initDatabase = (): Promise<SQLResultSet> => {
  return new Promise((resolve, reject) => {
    db.transaction((transaction) => {
      transaction.executeSql(
        `create table if not exists places (
                    id integer primary key not null,
                    title text not null,
                    address text not null,
                    image text not null,
                    lat real not null,
                    lng real not null
                );`,
        [],
        (_, result) => resolve(result),
        (_, err) => reject(err) as unknown as boolean
      );
    });
  });
};

export const fetchPlaces = (): Promise<SQLResultSet> => {
  return new Promise((resolve, reject) => {
    db.transaction((transaction) => {
      transaction.executeSql(
        `select * from places;`,
        [],
        (_, result) => resolve(result),
        (_, err) => reject(err) as unknown as boolean
      );
    });
  });
};

export const insertPlace = (place: Place): Promise<SQLResultSet> => {
  return new Promise((resolve, reject) => {
    db.transaction((transaction) => {
      transaction.executeSql(
        `insert into places (title, address, image, lat, lng)
              values (?, ?, ?, ?, ?);`,
        [place.title, place.address, place.image, place.lat, place.lng],
        (_, result) => resolve(result),
        (_, err) => reject(err) as unknown as boolean
      );
    });
  });
};
