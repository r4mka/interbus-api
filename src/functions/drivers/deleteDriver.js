import config from 'config';
import { flatten } from 'lodash';
import { wrapper, Storage, verify } from 'utils';

const {
  sortKeyValues: { DRIVER, ASSIGNED_DRIVER },
} = config;

export default wrapper(({ pathParameters: { id } }) =>
  Storage.get({ pk: id, sk: DRIVER })
    .then(driver => verify.presence(driver, 'Driver not found'))
    .then(() =>
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
      ]),
    )
    .then(results => Storage.batchDelete(flatten(results))),
);
