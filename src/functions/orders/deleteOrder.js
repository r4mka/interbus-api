import config from 'config';
import { wrapper, Storage, verify } from 'utils';
import { decrementDepartureOrders } from 'common';

const {
  sortKeyValues: { ORDER, LIST },
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
        Storage.query('sk')
          .using('DateGlobalIndex')
          .eq(`${LIST}-${orderId}`),
      ]),
    )
    .then(([order, clientOrders, listOrder]) =>
      Promise.all([
        Storage.batchDelete([order, ...clientOrders, ...listOrder]),
        decrementDepartureOrders(order.date),
        // todo: if order is from the past, reject
      ]),
    ),
);
