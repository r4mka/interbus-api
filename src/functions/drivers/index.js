import { omitBy, isEmpty } from 'lodash';
import { storage, verify, generateId } from 'utils';

const driverAttributes = ['pk', 'name', 'status', 'car'];

export function createDriver({ name, status, car }) {
  return storage.create({ pk: generateId('driver'), sk: 'driver', name, status, car });
}

export function deleteDriver(id) {
  return storage.delete({ pk: id, sk: 'driver' });
}

export function getDriver(id) {
  return storage
    .queryOne('pk')
    .eq(id)
    .where('sk')
    .eq('driver')
    .attributes(driverAttributes)
    .exec();
}

export function listDrivers() {
  return storage
    .query('sk')
    .eq('driver')
    .attributes(driverAttributes)
    .exec();
}

export function updateDriver(id, { name, status, car }) {
  return getDriver(id)
    .then(verify.presence)
    .then(() =>
      storage.update({ pk: id, sk: 'driver' }, omitBy({ name, status, car }, isEmpty), {
        returnValues: 'NONE',
      }),
    );
}
