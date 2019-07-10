import config from 'config';
import { wrapper, Storage, errors, verify } from 'utils';

const {
  sortKeyValues: { LIST, CAR, DRIVER, ORDER },
} = config;

export default wrapper(({ queryStringParameters: { date } }) => {
  if (!date) {
    throw errors.BadRequest('date param is required');
  }

  // todo: add date validation

  return Storage.query('sk')
    .using('DateGlobalIndex')
    .eq(LIST)
    .where('date')
    .eq(+date)
    .exec()
    .then(list => verify.presence(list, 'List not found'))
    .then(lists =>
      Promise.all(
        lists.map(({ pk, ...list }) =>
          Promise.all([
            { pk, ...list },
            Storage.queryOne('pk')
              .eq(pk)
              .where('sk')
              .beginsWith(`${LIST}-${CAR}`)
              .exec(),
            Storage.queryOne('pk')
              .eq(pk)
              .where('sk')
              .beginsWith(`${LIST}-${DRIVER}`)
              .exec(),
            Storage.query('pk')
              .eq(pk)
              .where('sk')
              .beginsWith(`${LIST}-${ORDER}`)
              .exec(),
          ]),
        ),
      ),
    )
    .then(lists =>
      lists.map(([list, car, driver, orders]) => ({
        list,
        car,
        driver,
        orders,
      })),
    );
});
