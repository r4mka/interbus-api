import { omitBy, isEmpty } from 'lodash';
import { storage, verify, generateId } from 'utils';
import { getDriver } from 'functions/drivers';

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

export function createCar({ status, model, seats, year, milage, driver }) {
  return storage.create({
    pk: generateId('car'),
    sk: 'car',
    status,
    model,
    seats,
    year,
    milage,
    driver,
  });
}

export function deleteCar(id) {
  return storage.delete({ pk: id, sk: 'car' });
}

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
