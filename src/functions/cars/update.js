import { wrapper } from 'utils';
import { updateCar } from 'functions/cars';

export default wrapper(({ pathParameters: { id }, body }) => updateCar(id, body));
