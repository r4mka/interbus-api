import config from 'config';
import { wrapper, Storage, verify } from 'utils';

const {
  sortKeyValues: { CAR, ASSIGNED_DRIVER },
} = config;

export default wrapper(({ pathParameters: { id } }) =>
  Promise.all([
    Storage.get({ pk: id, sk: CAR }),
    Storage.get({ pk: id, sk: ASSIGNED_DRIVER }),
  ]).then(([car, assignedDriver]) => {
    verify.presence(car, 'Car not found');

    if (assignedDriver) {
      const { status, firstname, lastname } = assignedDriver;

      return { ...car, driver: { pk: status, car: id, firstname, lastname } };
    }

    return car;
  }),
);
