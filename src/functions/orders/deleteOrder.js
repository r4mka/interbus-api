import { wrapper, Storage } from 'utils';
import { decrementDepartureOrders } from 'functions/.common';

export default wrapper(({ pathParameters: { id: orderId } }) =>
  Promise.all([
    Storage.queryOne('pk')
      .eq(orderId)
      .exec(),
    Storage.query('sk')
      .using('DateGlobalIndex')
      .eq(orderId),
  ]),
).then(([order, clientOrders]) =>
  Promise.all([
    Storage.batchDelete([order, ...clientOrders]),
    decrementDepartureOrders(order.date),
    // todo: remove order from list
    // todo: if order is from the past, reject
  ]),
);
