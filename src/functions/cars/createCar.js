import config from 'config';
import { wrapper, Storage, id } from 'utils';
import { assignDriverToCar } from '../.common';

const {
  sortKeyValues: { CAR },
} = config;

export default wrapper(({ body: { status, driverId, ...body } }) =>
  Storage.create({
    pk: id('car'),
    sk: CAR,
    gsiSk: status,
    ...body,
  }).then(car => (driverId ? assignDriverToCar(driverId, car.pk).then(() => car) : car)),
);
