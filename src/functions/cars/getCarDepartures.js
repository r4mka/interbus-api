import config from 'config';
import { wrapper, Storage } from 'utils';
import { rangeQuery } from 'functions/.common';

const {
  sortKeyValues: { LIST },
} = config;

export default wrapper(({ pathParameters: { id: carId }, queryStringParameters }) =>
  // todo: add limit controlled by queryStringParam
  rangeQuery(
    Storage.query('sk')
      .using('DateGlobalIndex')
      .eq(`${LIST}-${carId}`),
    queryStringParameters,
  ).exec(),
);
