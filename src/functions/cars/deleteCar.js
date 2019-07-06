import config from 'config';
import { flatten } from 'lodash';
import { wrapper, Storage } from 'utils';

const {
  sortKeyValues: { ASSIGNED_CAR },
} = config;

export default wrapper(({ pathParameters: { id } }) =>
  Promise.all([
    Storage.query('pk')
      .eq(id)
      .exec(),
    Storage.query('sk')
      .eq(ASSIGNED_CAR)
      .where('gsiSk')
      .eq(id)
      .exec(),
  ]).then(results => Storage.batchDelete(flatten(results))),
);
