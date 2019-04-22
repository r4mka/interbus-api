import { wrapper } from 'utils';
import { updateTrip } from 'functions/common';

export default wrapper(({ pathParameters: { id }, body }) => updateTrip(id, body));
