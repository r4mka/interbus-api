import config from 'config';
import { wrapper, Storage } from 'utils';

const {
  sortKeyValues: { DEPARTURE },
} = config;

export default wrapper(({ queryStringParameters: { from, to } }) => {
  let queryDepartures = Storage.query('sk')
    .using('DateGlobalIndex')
    .eq(DEPARTURE);

  if (from && to) {
    queryDepartures = queryDepartures.where('date').between(+from, +to);
  } else if (from) {
    queryDepartures = queryDepartures.where('date').ge(+from);
  } else if (to) {
    queryDepartures = queryDepartures.where('date').le(+to);
  }

  return queryDepartures.exec();
});
