// import config from 'config';
// import moment from 'moment';
import shortid from 'shortid';

// const {
//   app: { dateFormat },
// } = config;

export const generateId = type => `${type}_${shortid.generate()}`;
