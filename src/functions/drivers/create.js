import { wrapper } from 'utils';
import { createDriver } from 'functions/drivers';

export default wrapper(({ body }) => createDriver(body));
