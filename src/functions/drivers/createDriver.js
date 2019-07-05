import config from 'config';
import { wrapper, Storage, id } from 'utils';
import { assignDriverToCar } from 'functions/.common';

const {
  sortKeyValues: { DRIVER },
} = config;

export default wrapper(
  ({ body: { status, firstname, lastname, primaryPhonePL, primaryPhoneNL, carId } }) =>
    Storage.create({
      pk: id('driver'),
      sk: DRIVER,
      gsiSk: status,
      firstname,
      lastname,
      primaryPhonePL,
      primaryPhoneNL,
    }).then(driver =>
      carId
        ? assignDriverToCar({ carId, driverId: driver.pk })
            .then(({ car }) => ({ ...driver, car }))
            .catch(() => driver)
        : driver,
    ),
);
