import { wrapper, storage, generateId } from 'utils';

export default wrapper(({ body: { status, model, seats, year, milage, driver } }) =>
  storage.create({ pk: generateId('car'), sk: 'car', status, model, seats, year, milage, driver }),
);
