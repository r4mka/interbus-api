import { omitBy, isEmpty } from 'lodash';
import { storage, verify } from 'utils';

// DRIVERS
const driverAttributes = ['pk', 'name', 'status', 'car'];

export const getDriver = id =>
  storage
    .queryOne('pk')
    .eq(id)
    .where('sk')
    .eq('driver')
    .attributes(driverAttributes)
    .exec();

export const listDrivers = () =>
  storage
    .query('sk')
    .eq('driver')
    .attributes(driverAttributes)
    .exec();

export const updateDriver = (id, { name, status, car }) =>
  getDriver(id)
    .then(verify.presence)
    .then(() =>
      storage.update({ pk: id, sk: 'driver' }, omitBy({ name, status, car }, isEmpty), {
        returnValues: 'NONE',
      }),
    );

// CARS
const carAttributes = [
  'pk',
  'licensePlate',
  'status',
  'model',
  'seats',
  'year',
  'milage',
  'driver',
];

export const getCar = id =>
  storage
    .queryOne('pk')
    .eq(id)
    .where('sk')
    .eq('car')
    .attributes(carAttributes)
    .exec();

export const listCars = () =>
  storage
    .query('sk')
    .eq('car')
    .attributes(carAttributes)
    .exec();

export const updateCar = (id, { status, model, seats, year, milage, driver }) =>
  getDriver(id)
    .then(verify.presence)
    .then(() =>
      storage.update(
        { pk: id, sk: 'car' },
        omitBy({ status, model, seats, year, milage, driver }, isEmpty),
        {
          returnValues: 'NONE',
        },
      ),
    );

// TRIPS
const tripAttributes = ['pk', 'date', 'seats', 'takenSeats', 'driver', 'car', 'direction'];

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
