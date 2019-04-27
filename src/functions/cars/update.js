import { wrapper } from 'utils';
import { updateCar } from 'functions/common';

export default wrapper(({ pathParameters: { id }, body }) => updateCar(id, body));
