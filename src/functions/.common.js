import { Storage } from 'utils';

export const assignDriverToCar = (driverId, carId) =>
  Storage.batchGet([{ pk: driverId, sk: 'DRIVER' }, { pk: carId, sk: 'CAR' }]).then(
    ([driver, car]) =>
      Promise.all([
        // find all drivers assigned to a given car
        Storage.query('sk')
          .eq('ASSIGNED-DRIVER')
          .where('gsiSk')
          .eq(driverId)
          .exec(),
        // find all cars assigned to a given driver
        Storage.query('sk')
          .eq('ASSIGNED-CAR')
          .where('gsiSk')
          .eq(carId)
          .exec(),
      ])
        .then(([assignedDrivers, assignedCars]) =>
          Promise.all([
            // remove all assigned drivers from a given car
            Storage.batchDelete(assignedDrivers.map(({ pk }) => ({ pk, sk: 'ASSIGNED-DRIVER' }))),
            // remove all assigned cars from a given driver
            Storage.batchDelete(assignedCars.map(({ pk }) => ({ pk, sk: 'ASSIGNED-CAR' }))),
          ]),
        )
        .then(() =>
          // assing given car to a given driver and given driver
          Storage.batchPut([
            {
              pk: driver.pk,
              sk: `ASSIGNED-CAR`,
              gsiSk: car.pk,
              status: car.gsiSk,
              plate: car.plate,
              carModel: car.carModel,
            },
            {
              pk: car.pk,
              sk: 'ASSIGNED-DRIVER',
              gsiSk: driver.pk,
              status: driver.gsiSk,
              firstname: driver.firstname,
              lastname: driver.lastname,
            },
          ]),
        ),
  );
