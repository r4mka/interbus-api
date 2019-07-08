import config from 'config';
import { wrapper, Storage, verify } from 'utils';

const {
  sortKeyValues: { DEPARTURE },
} = config;

export default wrapper(({ pathParameters: { id } }) =>
  Storage.get({ pk: id, sk: DEPARTURE }).then(departure =>
    verify.presence(departure, 'Departure not found'),
  ),
);
