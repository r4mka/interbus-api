import config from 'config';
import { wrapper, Storage, verify } from 'utils';
import { decrementDepartureOrders } from 'common';

const {
  sortKeyValues: { ORDER },
} = config;

export default wrapper(({ pathParameters: { id: orderId } }) =>
  Storage.get({ pk: orderId, sk: ORDER })
    .then(order => verify.presence(order, 'Order not found'))
    .then(() =>
      Promise.all([
        Storage.queryOne('pk')
          .eq(orderId)
          .exec(),
        Storage.query('sk')
          .using('DateGlobalIndex')
          .eq(orderId),
      ]),
    )
    .then(([order, clientOrders]) =>
      Promise.all([
        Storage.batchDelete([order, ...clientOrders]),
        decrementDepartureOrders(order.date),
        // todo: remove order from list
        // todo: if order is from the past, reject
      ]),
    ),
);
