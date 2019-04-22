import { wrapper, storage } from 'utils';

export default wrapper(({ pathParameters: { id } }) => {
  console.log(`/drivers/:id ${id}`);
  return (
    storage
      .query('pk')
      .eq(id)
      // .where('sk')
      // .beginsWith('...')
      .attributes(['name', 'status', 'car'])
      .exec()
  );
});
