import config from 'config';
import { isEmpty } from 'lodash';
import { id, Storage } from 'utils';

const {
  sortKeyValues: { DEPARTURE },
} = config;

export const findDepartureByDate = date =>
  Storage.queryOne('sk')
    .using('DateGlobalIndex')
    .eq(DEPARTURE)
    .where('date')
    .eq(date)
    .exec();

export const incrementDepartureOrders = date =>
  findDepartureByDate(date).then(departure =>
    isEmpty(departure)
      ? // if departure doesn't exist, create one and set orders count to one
        Storage.create({ pk: id('departure'), sk: DEPARTURE, orders: 1 })
      : // if departure exists, increment orders count by one
        Storage.update({ pk: departure.pk, sk: DEPARTURE }, { $ADD: { orders: 1 } }),
  );

export const decrementDepartureOrders = date =>
  findDepartureByDate(date).then(departure => {
    if (isEmpty(departure)) return Promise.resolve();

    return departure.orders === 1
      ? // if departure has only one order, just delete it
        Storage.delete({ pk: departure.pk, sk: DEPARTURE })
      : // if departure has more than one order, decrement orders count by one
        Storage.update({ pk: departure.pk, sk: DEPARTURE }, { $ADD: { orders: -1 } });
  });
