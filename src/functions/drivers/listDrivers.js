import config from 'config';
import { wrapper, Storage } from 'utils';
import { paginateQuery } from 'common';

const {
  sortKeyValues: { DRIVER },
} = config;

export default wrapper(({ queryStringParameters }) =>
  paginateQuery(Storage.query('sk').using('StatusGlobalIndex').eq(DRIVER), queryStringParameters),
);
