import { wrapper, storage, generateId } from 'utils';

export default wrapper(({ body: { name, status, car } }) =>
  storage.create({ pk: generateId('driver'), sk: 'driver', name, status, car }),
);
