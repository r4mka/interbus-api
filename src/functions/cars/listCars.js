import config from 'config';
import { wrapper, Storage } from 'utils';

const {
  sortKeyValues: { CAR },
} = config;

export default wrapper(() =>
  Storage.query('sk')
    .eq(CAR)
    .exec(),
);
