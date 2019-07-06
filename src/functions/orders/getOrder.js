import config from 'config';
import { wrapper, Storage, verify } from 'utils';

const {
  sortKeyValues: { ORDER },
} = config;

export default wrapper(({ pathParameters: { id } }) =>
  Storage.get({ pk: id, sk: ORDER }).then(order => verify.presence(order, 'Order not found')),
);
