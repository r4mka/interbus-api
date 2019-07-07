import config from 'config';
import { pick } from 'lodash';
import { wrapper, Storage, id } from 'utils';
import { assignDriverToCar } from 'functions/.common';

const {
  app: {
    status: [ACTIVE],
  },
  sortKeyValues: { CAR },
} = config;

export default wrapper(({ body = {} }) =>
  Storage.create({
    pk: id('car'),
    sk: CAR,
    status: body.status || ACTIVE,
    ...pick(body, 'carModel', 'milage', 'plate', 'year'),
  }).then(car =>
    body.driverId
      ? assignDriverToCar({ driverId: body.driverId, carId: car.pk })
          .then(({ driver }) => ({ ...car, driver }))
          .catch(() => car)
      : car,
  ),
);
