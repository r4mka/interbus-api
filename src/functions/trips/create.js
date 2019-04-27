import { wrapper } from 'utils';
import { createTrip } from 'functions/trips';

export default wrapper(({ body }) => createTrip(body));
