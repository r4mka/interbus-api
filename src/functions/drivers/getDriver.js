import config from 'config';
import { wrapper, Storage, verify } from 'utils';

const {
  sortKeyValues: { DRIVER, ASSIGNED_CAR },
} = config;

export default wrapper(({ pathParameters: { id } }) =>
  Promise.all([
    Storage.get({ pk: id, sk: DRIVER }),
    Storage.get({ pk: id, sk: ASSIGNED_CAR }),
  ]).then(([driver, assignedCar]) => {
    verify.presence(driver, 'Driver not found');

    return assignedCar ? { ...driver, car: assignedCar } : driver;
  }),
);
