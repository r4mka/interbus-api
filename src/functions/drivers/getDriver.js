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

    if (assignedCar) {
      const { status, plate, carModel } = assignedCar;

      return { ...driver, car: { pk: status, driver: id, plate, carModel } };
    }

    return driver;
  }),
);
