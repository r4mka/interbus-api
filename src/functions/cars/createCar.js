import config from 'config';
import { wrapper, Storage, id } from 'utils';
import { assignDriverToCar } from 'functions/.common';

const {
  sortKeyValues: { CAR },
} = config;

export default wrapper(({ body: { status, carModel, milage, plate, year, driverId } }) =>
  Storage.create({
    pk: id('car'),
    sk: CAR,
    gsiSk: status,
    carModel,
    milage,
    plate,
    year,
  }).then(car =>
    driverId
      ? assignDriverToCar(driverId, car.pk)
          .then(({ driver }) => ({ ...car, driver }))
          .catch(() => car)
      : car,
  ),
);
