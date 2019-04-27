import { wrapper } from 'utils';
import { getCar } from 'functions/cars';

export default wrapper(({ pathParameters: { id } }) => getCar(id));
