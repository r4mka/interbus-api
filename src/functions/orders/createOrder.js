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
      .then(() =>
        Storage.create({
          pk: id('order'),
          sk: ORDER,
          gsiSk: date,
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
          Storage.create({ pk: clientId, sk: order.pk, gsiSk: date, from, to }).then(() => order),
        ),
      ),
);
