import config from 'config';
import { pick } from 'lodash';
import { Storage, wrapper, verify } from 'utils';

const {
  sortKeyValues: { ORDER },
} = config;

// const syncDeparture = date =>
//   // find departure for given date
//   Storage.queryOne('sk')
//     .using('DateGlobalIndex')
//     .eq(DEPARTURE)
//     .where('date')
//     .eq(orderDate)
//     .exec()
//     .then(departure => {
//       if (isEmpty(departure)) return Promise.resolve();
//
//       return departure.orders === 1
//         ? Storage.delete({ pk: departure.pk, sk: DEPARTURE })
//         : Storage.update({ pk: departure.pk, sk: DEPARTURE }, { $ADD: { orders: -1 } });
//     });

// todo: figure out generic mechanism for validation
export default wrapper(({ pathParameters: { id: orderId }, body }) =>
  Storage.get({ pk: orderId, sk: ORDER })
    .then(order => verify.presence(order, 'Order not found'))
    .then(({ clientId }) =>
      Promise.all([
        // updpate order item
        Storage.update({ pk: orderId, sk: ORDER }, body),
        // update order assigned to client
        Storage.update({ pk: clientId, sk: orderId }, pick(body, ['date', 'from', 'to'])),
        // todo: sync corresponding departures
        // has(body, 'date') ? syncDeparture(oldDate, body.date) : Promise.resolve(),
      ]).then(([order]) => order),
    ),
);
