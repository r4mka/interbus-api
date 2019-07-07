import config from 'config';
import { wrapper, Storage, verify } from 'utils';

const {
  sortKeyValues: { DEPARTURE, ORDER },
} = config;

export default wrapper(({ pathParameters: { id } }) =>
  Storage.get({ pk: id, sk: DEPARTURE })
    .then(departure => verify.presence(departure, 'Departure not found'))
    .then(
      departure =>
        Storage.query('sk')
          .using('DateGlobalIndex')
          .eq(ORDER)
          .where('date')
          .eq(departure.date)
          .exec()
          .then(orders => ({ ...departure, orders })),
      // todo: query related lists
    ),
);
