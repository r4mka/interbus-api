import config from 'config';
import { flatten } from 'lodash';
import { wrapper, Storage } from 'utils';

const {
  sortKeyValues: { ASSIGNED_DRIVER },
} = config;

export default wrapper(({ pathParameters: { id } }) =>
  Promise.all([
    Storage.query('pk')
      .eq(id)
      .exec(),
    Storage.query('sk')
      .using('StatusGlobalIndex')
      .eq(ASSIGNED_DRIVER)
      .where('status')
      .eq(id)
      .exec(),
  ]).then(results => Storage.batchDelete(flatten(results))),
);
