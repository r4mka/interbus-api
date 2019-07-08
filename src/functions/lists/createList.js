import config from 'config';
import { pick } from 'lodash';
import { wrapper, Storage, id } from 'utils';

const {
  sortKeyValues: { LIST },
} = config;

export default wrapper(({ body = {} }) =>
  Storage.create({ pk: id(LIST), sk: LIST, ...pick(body, ['date']) }),
);
