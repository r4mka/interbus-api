import { flatten } from 'lodash';
import { wrapper, Storage } from 'utils';

export default wrapper(({ pathParameters: { id: orderId } }) =>
  Promise.all([
    Storage.query('pk')
      .eq(orderId)
      .exec(),
    Storage.query('sk').eq(orderId),
  ]),
).then(results => Storage.batchDelete(flatten(results)));
