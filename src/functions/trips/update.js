import { wrapper } from 'utils';
import { updateTrip } from 'functions/trips';

export default wrapper(({ pathParameters: { id }, body }) => updateTrip(id, body));
