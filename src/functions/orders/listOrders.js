import config from 'config';
import { wrapper, Storage } from 'utils';

const {
  sortKeyValues: { ORDER },
} = config;

export default wrapper(({ queryStringParameters: { from, to } }) => {
  let queryOrders = Storage.query('sk').eq(ORDER);

  if (from && to) {
    queryOrders = queryOrders.where('date').between(from, to);
  } else if (from) {
    queryOrders = queryOrders.where('data').ge(from);
  } else if (to) {
    queryOrders = queryOrders.where('data').le(to);
  }

  return queryOrders.exec();
});
