import moment from 'moment';

export * from './cars';
export * from './departures';
export * from './lists';

export const base64Encode = value => value && Buffer.from(JSON.stringify(value)).toString('base64');
export const base64Decode = value =>
  value && JSON.parse(Buffer.from(JSON.stringify(value), 'base64').toString('utf-8'));

export const transformResponse = data => ({ items: data, lastKey: base64Encode(data.lastKey) });

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
