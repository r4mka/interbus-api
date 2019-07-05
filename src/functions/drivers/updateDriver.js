import config from 'config';
import { Storage, wrapper, verify } from 'utils';
import { assignDriverToCar } from 'functions/.common';

const {
  sortKeyValues: { DRIVER },
} = config;

// todo: figure out generic mechanism for validation
export default wrapper(({ pathParameters: { id }, body: { carId, ...payload } }) =>
  Storage.get({ pk: id, sk: DRIVER })
    .then(driver => verify.presence(driver, 'Driver not found'))
    .then(() =>
      Promise.all([
        Storage.update({ pk: id, sk: DRIVER }, payload),
        carId ? assignDriverToCar({ carId, driverId: id }).catch(() => {}) : Promise.resolve(),
      ]).then(([driver, { car } = {}]) => (car ? { ...car, driver } : driver)),
    ),
);
