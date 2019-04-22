import { wrapper, storage, generateId } from 'utils';

export default wrapper(({ body: { date, driver, car, direction } }) =>
  storage.create({
    pk: generateId('trip'),
    sk: 'trip',
    seats: 8, // todo: get seats count from car details
    takenSeats: 0,
    date,
    driver, // todo: check if driver is not assigned to other trip
    car, // todo: check if car is not assigned to other trip
    direction,
  }),
);
