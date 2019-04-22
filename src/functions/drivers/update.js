import { wrapper } from 'utils';
import { updateDriver } from 'functions/common';

export default wrapper(({ pathParameters: { id }, body }) => updateDriver(id, body));
