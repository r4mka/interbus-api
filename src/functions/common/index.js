import { storage, verify } from 'utils';

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
      storage.update({ pk: id, sk: 'driver' }, { name, status, car }, { returnValues: 'NONE' }),
    );
