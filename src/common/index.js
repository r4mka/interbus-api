export * from './cars';
export * from './departures';
export * from './lists';

export const rangeQuery = (query, { date, from, to } = {}) => {
  // todo: add params date validation

  if (date) {
    return query.where('date').eq(+date);
  }
  if (from && to) {
    return query.where('date').between(+from, +to);
  }
  if (from) {
    return query.where('date').ge(+from);
  }
  if (to) {
    return query.where('date').le(+to);
  }

  return query;
};
