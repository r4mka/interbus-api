import config from 'config';
import { pick } from 'lodash';
import { wrapper, Storage, id } from 'utils';
import { assignDriverToCar } from 'functions/.common';

const {
  app: {
    status: [ACTIVE],
  },
  sortKeyValues: { DRIVER },
} = config;

export default wrapper(({ body = {} }) =>
  Storage.create({
    pk: id('driver'),
    sk: DRIVER,
    status: body.status || ACTIVE,
    ...pick(body, 'firstname', 'lastname', 'primaryPhonePL', 'primaryPhoneNL'),
  }).then(driver =>
    body.carId
      ? assignDriverToCar({ carId: body.carId, driverId: driver.pk })
          .then(({ car }) => ({ ...driver, car }))
          .catch(() => driver)
      : driver,
  ),
);
