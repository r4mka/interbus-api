import config from 'config';
import { wrapper, Storage, verify } from 'utils';

const {
  sortKeyValues: { LIST },
} = config;

export default wrapper(({ pathParameters: { id } }) =>
  Storage.get({ pk: id, sk: LIST })
    .then(list => verify.presence(list, 'List not found'))
    .then(() => Storage.query('pk').eq(id).exec().then(Storage.batchDelete)),
);
