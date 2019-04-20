import { wrapper } from 'utils';
import { Hello } from 'models';

export default wrapper(() => Hello.scan().exec());
