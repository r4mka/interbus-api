import config from 'config';
import { getType } from 'functions/.common';
import { wrapper, Storage, verify, errors } from 'utils';

const {
  sortKeyValues: { LIST },
} = config;

export default wrapper(({ pathParameters: { id: listId }, body: { id } = {} }) => {
  if (!id) {
    throw errors.BadRequest('id field is required');
  }

  const type = getType(id);

  return Promise.all([
    Storage.get({ pk: listId, sk: LIST }).then(list => verify.presence(list, 'List not found')),
    Storage.get({ pk: id, sk: type }).then(item => verify.presence(item, `${type} not found`)),
  ]).then(() => Storage.delete({ pk: listId, sk: `${LIST}-${id}` }));
});
