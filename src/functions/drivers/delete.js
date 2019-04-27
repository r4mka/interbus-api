import { wrapper } from 'utils';
import { deleteDriver } from 'functions/drivers';

export default wrapper(({ pathParameters: { id } }) => deleteDriver(id));
