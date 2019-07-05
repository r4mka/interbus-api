import config from 'config';
import { Storage, wrapper, verify } from 'utils';
import { assignDriverToCar } from 'functions/.common';

const {
  sortKeyValues: { CAR },
} = config;

export default wrapper(({ pathParameters: { id }, body: { driverId, ...payload } }) =>
  Storage.get({ pk: id, sk: CAR })
    .then(car => verify.presence(car, 'Car not found'))
    .then(() =>
      Promise.all([
        Storage.update({ pk: id, sk: CAR }, payload),
        driverId ? assignDriverToCar(driverId, id) : Promise.resolve(),
      ]).then(([car]) => car),
    ),
);
