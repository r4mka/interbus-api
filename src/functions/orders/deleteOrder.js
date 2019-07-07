import config from 'config';
import { isEmpty } from 'lodash';
import { wrapper, Storage } from 'utils';

const {
  sortKeyValues: { DEPARTURE },
} = config;

const syncDeparture = orderDate =>
  // find departure for given date
  Storage.queryOne('sk')
    .using('DateGlobalIndex')
    .eq(DEPARTURE)
    .where('date')
    .eq(orderDate)
    .exec()
    .then(departure => {
      if (isEmpty(departure)) return Promise.resolve();

      return departure.orders === 1
        ? Storage.delete({ pk: departure.pk, sk: DEPARTURE })
        : Storage.update({ pk: departure.pk, sk: DEPARTURE }, { $ADD: { orders: -1 } });
    });

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
  Promise.all([Storage.batchDelete([order, ...clientOrders]), syncDeparture(order.date)]),
);
