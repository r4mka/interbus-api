import config from 'config';
import { flatten } from 'lodash';
import { wrapper, Storage, verify } from 'utils';

const {
  sortKeyValues: { CAR, ASSIGNED_CAR },
} = config;

export default wrapper(({ pathParameters: { id } }) =>
  Storage.get({ pk: id, sk: CAR })
    .then(car => verify.presence(car, 'Car not found'))
    .then(() =>
      Promise.all([
        Storage.query('pk')
          .eq(id)
          .exec(),
        Storage.query('sk')
          .using('StatusGlobalIndex')
          .eq(ASSIGNED_CAR)
          .where('status')
          .eq(id)
          .exec(),
      ]),
    )
    .then(results => Storage.batchDelete(flatten(results))),
);
