import { omitBy, isEmpty } from 'lodash';
import { storage, verify, generateId } from 'utils';

const tripAttributes = ['pk', 'date', 'seats', 'takenSeats', 'driver', 'car', 'direction'];

export function createTrip({ date, driver, car, direction }) {
  return storage.create({
    pk: generateId('trip'),
    sk: 'trip',
    seats: 8, // todo: get seats count from car details
    takenSeats: 0,
    date,
    driver, // todo: check if driver is not assigned to other trip
    car, // todo: check if car is not assigned to other trip
    direction,
  });
}

export function deleteTrip(id) {
  return storage.delete({ pk: id, sk: 'trip' });
}

export const getTrip = id =>
  storage
    .queryOne('pk')
    .eq(id)
    .where('sk')
    .eq('trip')
    .attributes(tripAttributes)
    .exec();

export const listTrips = () =>
  storage
    .query('sk')
    .eq('trip')
    .attributes(tripAttributes)
    .exec();

export const updateTrip = (id, { takenSeats, date, driver, car, direction }) =>
  getTrip(id)
    .then(verify.presence)
    .then(() =>
      storage.update(
        { pk: id, sk: 'trip' },
        omitBy({ takenSeats, date, driver, car, direction }, isEmpty),
        { returnValues: 'NONE' },
      ),
    );
