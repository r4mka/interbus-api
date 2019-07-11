import config from 'config';
import { includes } from 'lodash';
import { errors } from 'utils';

const {
  sortKeyValues: { CAR, DRIVER, ORDER },
} = config;
const allowedTypes = [CAR, DRIVER, ORDER];

export const getType = id => {
  const [type] = id.split('-');

  if (!includes(allowedTypes, type)) {
    throw errors.BadRequest(`${type} type is not supported. Please use one of ${allowedTypes}`);
  }

  return type;
};
