import config from 'config';
import { wrapper, Storage, verify } from 'utils';

const {
  sortKeyValues: { CLIENT },
} = config;

export default wrapper(({ pathParameters: { id } }) =>
  Storage.get({ pk: id, sk: CLIENT })
    .then(client => verify.presence(client, 'Client not found'))
    .then(() => Storage.query('pk').eq(id).exec().then(Storage.batchDelete)),
);
