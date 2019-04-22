import { wrapper, storage } from 'utils';

export default wrapper(({ pathParameters: { id } }) => storage.delete({ pk: id, sk: 'driver' }));
