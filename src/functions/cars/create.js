import { wrapper } from 'utils';
import { createCar } from 'functions/cars';

export default wrapper(({ body }) => createCar(body));
