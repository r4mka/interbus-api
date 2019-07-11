import moment from 'moment';

export * from './cars';
export * from './departures';
export * from './lists';

export const rangeQuery = (query, { date, from, to } = {}) => {
  if (date) {
    return query.where('date').eq(moment(+date).valueOf());
  }
  if (from && to) {
    return query.where('date').between(moment(+from).valueOf(), moment(+to).valueOf());
  }
  if (from) {
    return query.where('date').ge(moment(+from).valueOf());
  }
  if (to) {
    return query.where('date').le(moment(+to).valueOf());
  }

  return query;
};
