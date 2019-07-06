import config from 'config';
import { wrapper, Storage, id, verify } from 'utils';

const {
  sortKeyValues: { CLIENT, ORDER },
} = config;

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
      .then(client => verify.presence(client, 'Client not found'))
      .then(
        () =>
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
            // add order to client
            Storage.create({ pk: clientId, sk: order.pk, date, from, to }).then(() => order),
          ),
        // todo: after order creation, create departure item in the table and update orders count there
      ),
);
