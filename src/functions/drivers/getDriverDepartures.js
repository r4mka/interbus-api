import config from 'config';
import { wrapper, Storage } from 'utils';
import { rangeQuery } from 'common';

const {
  sortKeyValues: { LIST },
} = config;

export default wrapper(({ pathParameters: { id: driverId }, queryStringParameters }) =>
  // todo: add limit controlled by queryStringParam
  rangeQuery(
    Storage.query('sk')
      .using('DateGlobalIndex')
      .eq(`${LIST}-${driverId}`),
    queryStringParameters,
  ).exec(),
);
