import { wrapper } from 'utils';
import { getTrip } from 'functions/trips';

export default wrapper(({ pathParameters: { id } }) => getTrip(id));
