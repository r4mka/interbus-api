import config from 'config';
import { pick } from 'lodash';
import { getType } from 'functions/.common';
import { wrapper, Storage, verify, errors } from 'utils';

const {
  sortKeyValues: { LIST, CAR, DRIVER, ORDER },
} = config;
const allowedTypes = [CAR, DRIVER, ORDER];

const getAttributesByType = type => {
  switch (type) {
    case CAR:
      return ['plate', 'carModel', 'seats'];
    case DRIVER:
      return ['firstname', 'lastname'];
    case ORDER:
      return [
        'firstname',
        'lastname',
        'primaryPhonePL',
        'secondaryPhonePL',
        'pr`imaryPhoneNL',
        'secondaryPhoneNL',
        'from',
        'to',
      ];
    default:
      throw errors.BadRequest(`You can not add ${type} item. Please add one of ${allowedTypes}`);
  }
};

export default wrapper(({ pathParameters: { id: listId }, body: { id } = {} }) => {
  if (!id) {
    throw errors.BadRequest('id field is required');
  }

  const type = getType(id);

  return Promise.all([
    // find if a list and an item (car/driver/order) exist for provided ids
    Storage.get({ pk: listId, sk: LIST }).then(list => verify.presence(list, 'List not found')),
    Storage.get({ pk: id, sk: type }).then(item => verify.presence(item, `${type} not found`)),
  ]).then(([{ date }, item]) => {
    // check if provided item is not already assigned to other list
    Storage.queryOne('sk')
      .using('DateGlobalIndex')
      .eq(`${LIST}-${id}`)
      .where('date')
      .eq(date)
      .exec()
      // if is assigned, remove it
      .then(listItem => listItem && Storage.delete({ pk: listItem.pk, sk: `${LIST}-${id}` }))
      .then(() =>
        // add item to list
        Storage.create({
          pk: listId,
          sk: `${LIST}-${id}`,
          date,
          ...pick(item, getAttributesByType(type)),
        }),
      );
  });
});
