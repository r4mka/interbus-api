import { wrapper } from 'utils';
import { getCar } from 'functions/common';

export default wrapper(({ pathParameters: { id } }) => getCar(id));
