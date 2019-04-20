import { wrapper } from 'utils';
import { Hello } from 'models';

export default wrapper(({ body: { id, name } }) => Hello.create({ id, name }));
