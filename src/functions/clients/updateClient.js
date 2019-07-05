import config from 'config';
import { Storage, wrapper, verify } from 'utils';

const {
  sortKeyValues: { CLIENT },
} = config;

// todo: figure out generic mechanism for validation
export default wrapper(({ pathParameters: { id }, body }) =>
  Storage.get({ pk: id, sk: CLIENT })
    .then(client => verify.presence(client, 'Client not found'))
    .then(() => Storage.update({ pk: id, sk: CLIENT }, body)),
);
