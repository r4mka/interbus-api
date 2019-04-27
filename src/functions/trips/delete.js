import { wrapper } from 'utils';
import { deleteTrip } from 'functions/trips';

export default wrapper(({ pathParameters: { id } }) => deleteTrip(id));
