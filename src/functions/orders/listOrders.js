import config from 'config';
import { wrapper, Storage } from 'utils';

const {
  sortKeyValues: { ORDER },
} = config;

export default wrapper(({ queryStringParameters: { from, to } }) => {
  let queryOrders = Storage.query('sk')
    .using('DateGlobalIndex')
    .eq(ORDER);

  if (from && to) {
    queryOrders = queryOrders.where('date').between(+from, +to);
  } else if (from) {
    queryOrders = queryOrders.where('date').ge(+from);
  } else if (to) {
    queryOrders = queryOrders.where('date').le(+to);
  }

  return queryOrders.exec();
});
