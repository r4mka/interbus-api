import config from 'config';
import { wrapper, Storage } from 'utils';

const {
  sortKeyValues: { CLIENT },
} = config;

export default wrapper(() =>
  Storage.query('sk')
    .eq(CLIENT)
    .exec(),
);
