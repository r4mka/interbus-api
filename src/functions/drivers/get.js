import { wrapper } from 'utils';
import { getDriver } from 'functions/drivers';

export default wrapper(({ pathParameters: { id } }) => getDriver(id));
