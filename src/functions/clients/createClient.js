import config from 'config';
import { wrapper, Storage, id } from 'utils';

const {
  sortKeyValues: { CLIENT },
} = config;

export default wrapper(
  ({ body: { status, firstname, lastname, primaryPhonePL, primaryPhoneNL } }) =>
    Storage.create({
      pk: id('client'),
      sk: CLIENT,
      gsiSk: status,
      orders: 0,
      firstname,
      lastname,
      primaryPhonePL,
      primaryPhoneNL,
    }),
);
