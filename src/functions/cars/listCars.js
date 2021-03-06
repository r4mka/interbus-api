import config from 'config';
import { wrapper, Storage } from 'utils';
import { paginateQuery } from 'common';

const {
  sortKeyValues: { CAR },
} = config;

export default wrapper(({ queryStringParameters }) =>
  paginateQuery(Storage.query('sk').using('StatusGlobalIndex').eq(CAR), queryStringParameters),
);
