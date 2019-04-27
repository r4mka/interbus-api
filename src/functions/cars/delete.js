import { wrapper } from 'utils';
import { deleteCar } from 'functions/cars';

export default wrapper(({ pathParameters: { id } }) => deleteCar(id));
