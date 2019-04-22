import { wrapper } from 'utils';
import { getDriver } from 'functions/common';

export default wrapper(({ pathParameters: { id } }) => getDriver(id));
