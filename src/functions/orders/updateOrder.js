import config from 'config';
import { has, pick } from 'lodash';
import { Storage, wrapper, verify } from 'utils';
import { incrementDepartureOrders, decrementDepartureOrders } from 'functions/.common';

const {
  sortKeyValues: { ORDER },
} = config;

// todo: figure out generic mechanism for validation
// todo: check if order is not already assigned to any list, if so return 409 conflict
export default wrapper(({ pathParameters: { id: orderId }, body = {} }) =>
  Storage.get({ pk: orderId, sk: ORDER })
    .then(order => verify.presence(order, 'Order not found'))
    .then(({ clientId, date: oldDate }) =>
      Promise.all([
        // updpate order item
        // todo: add possibility to update clientId of an order
        Storage.update(
          { pk: orderId, sk: ORDER },
          pick(body, [
            'date',
            'firstname',
            'lastname',
            'primaryPhonePL',
            'secondaryPhonePL',
            'primaryPhoneNL',
            'secondaryPhoneNL',
            'from',
            'to',
          ]),
        ),
        // update order assigned to client
        Storage.update({ pk: clientId, sk: orderId }, pick(body, ['date', 'from', 'to'])),
        // if date has been changed, update corresponding departures
        has(body, 'date')
          ? Promise.all([decrementDepartureOrders(oldDate), incrementDepartureOrders(body.date)])
          : Promise.resolve(),
      ]).then(([order]) => order),
    ),
);
