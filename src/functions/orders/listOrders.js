import config from 'config';
import { wrapper, Storage } from 'utils';
import { rangeQuery } from 'common';

const {
  sortKeyValues: { ORDER },
} = config;

export default wrapper(({ queryStringParameters }) =>
  rangeQuery(
    Storage.query('sk')
      .using('DateGlobalIndex')
      .eq(ORDER),
    queryStringParameters,
  ).exec(),
);
