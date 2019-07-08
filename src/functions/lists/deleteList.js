import { wrapper, Storage } from 'utils';

export default wrapper(({ pathParameters: { id } }) =>
  Storage.query('pk')
    .eq(id)
    .exec()
    .then(Storage.batchDelete),
);
