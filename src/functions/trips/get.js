import { wrapper } from 'utils';
import { getTrip } from 'functions/common';

export default wrapper(({ pathParameters: { id } }) => getTrip(id));
