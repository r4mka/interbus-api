import config from 'config';
import { isEmpty } from 'lodash';
import { wrapper, Storage, id, verify } from 'utils';

const {
  sortKeyValues: { CLIENT, DEPARTURE, ORDER },
} = config;

const syncClient = (clientId, orderId, data) =>
  Storage.create({ pk: clientId, sk: orderId, ...data });

const syncDeparture = orderDate =>
  // find departure for given date
  Storage.query('sk')
    .eq(DEPARTURE)
    .where('date')
    .eq(orderDate)
    .exec()
    .then(order =>
      isEmpty(order)
        ? // if departure doesn't exist, create one and set orders count to one
          Storage.create({ pk: id('departure'), sk: DEPARTURE, orders: 1 })
        : // if departure exists, increment orders count by one
          Storage.update({ pk: order.pk, sk: DEPARTURE }, { $ADD: { orders: 1 } }),
    );

export default wrapper(
  ({
    body: {
      date,
      firstname,
      lastname,
      primaryPhonePL,
      secondaryPhonePL,
      primaryPhoneNL,
      secondaryPhoneNL,
      from,
      to,
      clientId,
      // direction, todo: figure out how to compute direction on the fly based on from and to
    },
  }) =>
    Storage.get({ pk: clientId, sk: CLIENT })
      // todo: making orders without providing clientId should be possible as well
      .then(client => verify.presence(client, 'Client not found'))
      .then(() =>
        Storage.create({
          pk: id('order'),
          sk: ORDER,
          date,
          firstname,
          lastname,
          primaryPhonePL,
          secondaryPhonePL,
          primaryPhoneNL,
          secondaryPhoneNL,
          from,
          to,
          clientId,
        }).then(order =>
          Promise.all([
            syncClient(clientId, order.pk, { date, from, to }),
            syncDeparture(date),
          ]).then(() => order),
        ),
      ),
);
