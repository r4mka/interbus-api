import config from 'config';
import { Storage, verify } from 'utils';

const {
  sortKeyValues: { CAR, DRIVER, ASSIGNED_CAR, ASSIGNED_DRIVER },
} = config;

export const assignDriverToCar = ({ driverId, carId }) =>
  Promise.all([
    Storage.get({ pk: driverId, sk: DRIVER }).then(driver =>
      verify.presence(driver, 'Driver not found'),
    ),
    Storage.get({ pk: carId, sk: CAR }).then(car => verify.presence(car, 'Car not found')),
  ]).then(([driver, car]) =>
    Promise.all([
      // find all drivers assigned to a given car
      Storage.query('sk')
        .eq(ASSIGNED_DRIVER)
        .where('gsiSk')
        .eq(driverId)
        .exec(),
      // find all cars assigned to a given driver
      Storage.query('sk')
        .eq(ASSIGNED_CAR)
        .where('gsiSk')
        .eq(carId)
        .exec(),
    ])
      .then(([assignedDrivers, assignedCars]) =>
        Promise.all([
          // remove all assigned drivers from a given car
          Storage.batchDelete(assignedDrivers.map(({ pk }) => ({ pk, sk: ASSIGNED_DRIVER }))),
          // remove all assigned cars from a given driver
          Storage.batchDelete(assignedCars.map(({ pk }) => ({ pk, sk: ASSIGNED_CAR }))),
        ]),
      )
      .then(() =>
        Storage.batchPut([
          {
            pk: carId,
            sk: ASSIGNED_DRIVER,
            gsiSk: driver.pk,
            status: driver.gsiSk,
            firstname: driver.firstname,
            lastname: driver.lastname,
          },
          {
            pk: driverId,
            sk: ASSIGNED_CAR,
            gsiSk: car.pk,
            status: car.gsiSk,
            plate: car.plate,
            carModel: car.carModel,
          },
        ]),
      )
      .then(() => ({ driver, car })),
  );
