import config from 'config';
import { pick } from 'lodash';
import { wrapper, Storage, id } from 'utils';

const {
  app: {
    status: [ACTIVE],
  },
  sortKeyValues: { CLIENT },
} = config;

export default wrapper(({ body = {} }) =>
  Storage.create({
    pk: id(CLIENT),
    sk: CLIENT,
    status: body.status || ACTIVE,
    ...pick(body, 'firstname', 'lastname', 'primaryPhonePL', 'primaryPhoneNL'),
  }),
);
