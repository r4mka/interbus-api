import config from 'config';
import { wrapper, Storage } from 'utils';
import { rangeQuery } from 'common';

const {
  sortKeyValues: { LIST },
} = config;

export default wrapper(({ pathParameters: { id: carId }, queryStringParameters }) =>
  rangeQuery(
    Storage.query('sk')
      .using('DateGlobalIndex')
      .eq(`${LIST}-${carId}`),
    queryStringParameters,
  ),
);
