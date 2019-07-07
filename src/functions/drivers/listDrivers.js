import config from 'config';
import { wrapper, Storage } from 'utils';

const {
  sortKeyValues: { DRIVER },
} = config;

export default wrapper(() =>
  Storage.query('sk')
    .using('StatusGlobalIndex')
    .eq(DRIVER)
    .exec(),
);
