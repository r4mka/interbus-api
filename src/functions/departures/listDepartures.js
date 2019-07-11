import config from 'config';
import { wrapper, Storage } from 'utils';
import { rangeQuery } from 'common';

const {
  sortKeyValues: { DEPARTURE },
} = config;

export default wrapper(({ queryStringParameters }) =>
  rangeQuery(
    Storage.query('sk')
      .using('DateGlobalIndex')
      .eq(DEPARTURE),
    queryStringParameters,
  ).exec(),
);
