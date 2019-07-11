import config from 'config';
import { wrapper, Storage, verify } from 'utils';

const {
  sortKeyValues: { DEPARTURE, LIST, CAR, DRIVER, ORDER },
} = config;

export default wrapper(({ pathParameters: { id } }) =>
  Storage.get({ pk: id, sk: DEPARTURE })
    .then(departure => verify.presence(departure, 'Departure not found'))
    .then(({ date, ...departure }) =>
      Storage.query('sk')
        .using('DateGlobalIndex')
        .eq(LIST)
        .where('date')
        .eq(date)
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
        .then(lists => ({
          ...departure,
          date,
          lists: lists.map(([list, car, driver, orders]) => ({
            list,
            car,
            driver,
            orders,
          })),
        })),
    ),
);
