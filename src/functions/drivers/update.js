import { wrapper } from 'utils';
import { updateDriver } from 'functions/drivers';

export default wrapper(({ pathParameters: { id }, body }) => updateDriver(id, body));
