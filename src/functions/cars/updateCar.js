import config from 'config';
import { Storage, wrapper, verify } from 'utils';
import { assignDriverToCar } from 'functions/.common';
import { pick } from 'lodash';

const {
  sortKeyValues: { CAR },
} = config;

export default wrapper(({ pathParameters: { id }, body = {} }) =>
  Storage.get({ pk: id, sk: CAR })
    .then(car => verify.presence(car, 'Car not found'))
    .then(() =>
      Promise.all([
        Storage.update(
          { pk: id, sk: CAR },
          pick(body, 'status', 'carModel', 'milage', 'plate', 'year'),
        ),
        body.driverId
          ? assignDriverToCar({ driverId: body.driverId, carId: id }).catch(console.error)
          : Promise.resolve(),
      ]).then(([car, { driver } = {}]) => (driver ? { ...car, driver } : car)),
    ),
);
