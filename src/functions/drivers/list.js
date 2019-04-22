import { wrapper, storage } from 'utils';

export default wrapper(() =>
  storage
    .query('sk')
    .eq('driver')
    .exec(),
);
