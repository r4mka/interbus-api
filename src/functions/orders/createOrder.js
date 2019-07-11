import config from 'config';
import { pick } from 'lodash';
import { wrapper, Storage, id, verify } from 'utils';
import { incrementDepartureOrders } from 'common';

const {
  sortKeyValues: { CLIENT, ORDER },
} = config;

export default wrapper(({ body = {} }) =>
  Storage.get({ pk: body.clientId, sk: CLIENT })
    // todo: making orders without providing clientId should be possible as well
    .then(client => verify.presence(client, 'Client not found'))
    .then(() =>
      Storage.create({
        pk: id(ORDER),
        sk: ORDER,
        ...pick(body, [
          'date',
          'firstname',
          'lastname',
          'primaryPhonePL',
          'secondaryPhonePL',
          'primaryPhoneNL',
          'secondaryPhoneNL',
          'from',
          'to',
          'clientId',
        ]),
        // direction, todo: figure out how to compute direction on the fly based on from and to
      }).then(order =>
        Promise.all([
          // add order to client
          Storage.create({
            pk: body.clientId,
            sk: order.pk,
            ...pick(body, ['date', 'from', 'to']),
          }),
          incrementDepartureOrders(body.date),
        ]).then(() => order),
      ),
    ),
);
