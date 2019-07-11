import config from 'config';
import { Storage, wrapper, verify } from 'utils';
import { assignDriverToCar } from 'common';
import { pick } from 'lodash';

const {
  sortKeyValues: { DRIVER },
} = config;

// todo: figure out generic mechanism for validation
export default wrapper(({ pathParameters: { id }, body = {} }) =>
  Storage.get({ pk: id, sk: DRIVER })
    .then(driver => verify.presence(driver, 'Driver not found'))
    .then(() =>
      Promise.all([
        Storage.update(
          { pk: id, sk: DRIVER },
          pick(body, 'status', 'firstname', 'lastname', 'primaryPhonePL', 'primaryPhoneNL'),
        ),
        body.carId
          ? // todo: add better error handling of assignDriverToCar function
            assignDriverToCar({ carId: body.carId, driverId: id }).catch(console.error)
          : Promise.resolve(),
      ]).then(([driver, { car } = {}]) => (car ? { ...car, driver } : driver)),
    ),
);
